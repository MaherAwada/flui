import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import eletropostosRoutes from './routes/eletropostos';
import avaliacoesRoutes from './routes/avaliacoes';
import usuariosRoutes from './routes/usuarios';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/eletropostos', eletropostosRoutes);
app.use('/api/avaliacoes', avaliacoesRoutes);
app.use('/api/usuarios', usuariosRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'FLUI API funcionando!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});

export default app;