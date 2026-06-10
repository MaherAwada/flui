import { Router, Request, Response } from 'express';
import pool from '../database';
import { autenticar, apenasAdmin, AuthRequest } from '../middleware/auth';

const router = Router();

// Perfil do usuário logado
router.get('/perfil', autenticar, async (req: AuthRequest, res: Response) => {
  try {
    const result = await pool.query(
      'SELECT id, nome, email, tipo, criado_em FROM usuarios WHERE id = $1',
      [req.user?.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar perfil' });
  }
});

// Listar todos (admin)
router.get('/', autenticar, apenasAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const result = await pool.query(
      'SELECT id, nome, email, tipo, criado_em FROM usuarios ORDER BY criado_em DESC'
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar usuários' });
  }
});

// Atualizar perfil
router.put('/perfil', autenticar, async (req: AuthRequest, res: Response) => {
  const { nome, email } = req.body;
  try {
    const result = await pool.query(
      'UPDATE usuarios SET nome=$1, email=$2 WHERE id=$3 RETURNING id, nome, email, tipo',
      [nome, email, req.user?.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar perfil' });
  }
});

export default router;