export const validatePDF = (file) => {
  if (!file) {
    return 'PDF file is required';
  }

  if (file.mimetype !== 'application/pdf') {
    return 'Only PDF files are allowed';
  }

  if (file.size > 5 * 1024 * 1024) {
    return 'File size must be less than 5MB';
  }

  return null;
};