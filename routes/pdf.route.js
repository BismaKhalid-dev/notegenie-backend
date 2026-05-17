
import express from 'express';
import multer from 'multer';
import PDFParser from 'pdf2json';

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post('/parse-pdf', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: 'PDF file is required',
      });
    }

    if (req.file.mimetype !== 'application/pdf') {
      return res.status(400).json({
        message: 'Only PDF files are allowed',
      });
    }

    if (req.file.size > 5 * 1024 * 1024) {
      return res.status(400).json({
        message: 'File size must be less than 5MB',
      });
    }

    const pdfParser = new PDFParser();

    pdfParser.on('pdfParser_dataError', (errData) => {
      res.status(500).json({
        message: 'Failed to parse PDF',
        error: errData.parserError,
      });
    });

    pdfParser.on('pdfParser_dataReady', (pdfData) => {
      let text = '';

      pdfData.Pages.forEach((page) => {
        page.Texts.forEach((item) => {
          item.R.forEach((textItem) => {
            text += decodeURIComponent(textItem.T) + ' ';
          });
        });
      });

      res.json({
        text,
        pageCount: pdfData.Pages.length,
      });
    });

    pdfParser.parseBuffer(req.file.buffer);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: 'Failed to parse PDF',
    });
  }
});

export default router;