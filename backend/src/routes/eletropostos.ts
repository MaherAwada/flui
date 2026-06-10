import { Router, Request, Response } from 'express';
import pool from '../database';
import { autenticar, apenasAdmin, AuthRequest } from '../middleware/auth';

const router = Router();

// Listar todos
router.get('/', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM eletropostos ORDER BY score DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar eletropostos' });
  }
});

// Buscar por ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM eletropostos WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ erro: 'Eletroposto não encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar eletroposto' });
  }
});

// Criar (admin)
router.post('/', autenticar, apenasAdmin, async (req: AuthRequest, res: Response) => {
  const { nome, cidade, estado, endereco, carregadores, conectores, potencia, horario, comodidades, lat, lng } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO eletropostos (nome, cidade, estado, endereco, carregadores, disponiveis, conectores, potencia, horario, comodidades, lat, lng, score)
       VALUES ($1, $2, $3, $4, $5, $5, $6, $7, $8, $9, $10, $11, 0) RETURNING *`,
      [nome, cidade, estado, endereco, carregadores, conectores, potencia, horario, comodidades, lat, lng]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao criar eletroposto' });
  }
});

// Editar (admin)
router.put('/:id', autenticar, apenasAdmin, async (req: AuthRequest, res: Response) => {
  const { nome, cidade, estado, endereco, carregadores, disponiveis, conectores, potencia, horario, comodidades } = req.body;
  try {
    const result = await pool.query(
      `UPDATE eletropostos SET nome=$1, cidade=$2, estado=$3, endereco=$4, carregadores=$5, disponiveis=$6,
       conectores=$7, potencia=$8, horario=$9, comodidades=$10 WHERE id=$11 RETURNING *`,
      [nome, cidade, estado, endereco, carregadores, disponiveis, conectores, potencia, horario, comodidades, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao editar eletroposto' });
  }
});

// Deletar (admin)
router.delete('/:id', autenticar, apenasAdmin, async (req: AuthRequest, res: Response) => {
  try {
    await pool.query('DELETE FROM eletropostos WHERE id = $1', [req.params.id]);
    res.json({ mensagem: 'Eletroposto removido com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao deletar eletroposto' });
  }
});

export default router;