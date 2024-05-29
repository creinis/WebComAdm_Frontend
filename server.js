import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import helmet from 'helmet';
import connectDB from './src/db-connection.js';
import dotenv from 'dotenv';

import adminRoutes from './src/routes/adminRoutes.js';
import authRoutes from './src/routes/authRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Helmet configuração
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://apis.google.com"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      imgSrc: ["'self'", "data:", "https://sentry.io"],
      connectSrc: ["'self'", "https://sentry.io", "https://o4507142041436160.ingest.de.sentry.io", "http://localhost:5174", "http://localhost:5000"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  },
  dnsPrefetchControl: { allow: true },
  frameguard: { action: 'deny' },
  hidePoweredBy: true,
  hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
  ieNoOpen: true,
  noSniff: true,
  permittedCrossDomainPolicies: { permittedPolicies: 'none' },
  referrerPolicy: { policy: 'no-referrer' },
  xssFilter: true,
} ));

connectDB();

// Middleware
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

const staticPath = path.join(__dirname, 'src', 'webComAdmin', 'dist');
app.use(express.static(staticPath));

// Verificar se a aplicação está inicializando corretamente
console.log('Inicializando servidor');

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/admins', adminRoutes);

// Verificar rotas de admin
console.log('Rotas de admin carregadas');

app.get('/*', (req, res) => {
  console.log(`Request para: ${req.url}`);
  res.sendFile(path.join(staticPath, 'index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`ADM Server is running on port ${PORT}`);
});


