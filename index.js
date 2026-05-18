// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';

// import summarizeRoute from './routes/summarize.route.js';
// import flashcardRoute from './routes/flashcard.route.js';
// import quizRoute from './routes/quiz.route.js';
// import chatRoute from './routes/chat.route.js';
// import pdfRoute from './routes/pdf.route.js';

// dotenv.config();

// const app = express();

// app.use(
//   cors({
//     origin: [process.env.FRONTEND_URL, 'https://note-genie-iota.vercel.app/'],
    
//     credentials: true,
//   })
// );

// app.use(express.json({ limit: '20mb' }));

// app.get('/', (req, res) => {
//   res.json({ message: 'NoteGenie Backend Running' });
// });

// app.use('/api', summarizeRoute);
// app.use('/api', flashcardRoute);
// app.use('/api', quizRoute);
// app.use('/api', chatRoute);
// app.use('/api', pdfRoute);

// app.use((err, req, res, next) => {
//   console.log(err);

//   return res.status(500).json({
//     message: 'Something went wrong',
//   });
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import summarizeRoute from './routes/summarize.route.js';
import flashcardRoute from './routes/flashcard.route.js';
import quizRoute from './routes/quiz.route.js';
import chatRoute from './routes/chat.route.js';
import pdfRoute from './routes/pdf.route.js';

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://note-genie-iota.vercel.app'
    ],
    methods: ['GET', 'POST'],
    credentials: true,
  })
);

app.use(express.json({ limit: '20mb' }));

app.get('/', (req, res) => {
  res.json({ message: 'NoteGenie Backend Running' });
});

app.use('/api', summarizeRoute);
app.use('/api', flashcardRoute);
app.use('/api', quizRoute);
app.use('/api', chatRoute);
app.use('/api', pdfRoute);

app.use((err, req, res, next) => {
  console.log(err);

  return res.status(500).json({
    message: 'Something went wrong',
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});