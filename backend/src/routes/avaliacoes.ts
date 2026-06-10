import { Router, Request, Response } from 'express';
import pool from '../database';
import { autenticar, apenasAdmin, AuthRequest } from '../middleware/auth';

const router = Router();

// Listar todas
router.get('/', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT a.*, u.nome as autor_nome, e.nome as eletroposto_nome
      FROM avaliacoes a
      JOIN usuarios u ON a.usuario_id = u.id
      JOIN eletropostos e ON a.eletroposto_id = e.id
      ORDER BY a.criado_em DESC
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar avaliações' });
  }
});

// Listar por eletroposto
router.get('/eletroposto/:id', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT a.*, u.nome as autor_nome
      FROM avaliacoes a
      JOIN usuarios u ON a.usuario_id = u.id
      WHERE a.eletroposto_id = $1
      ORDER BY a.criado_em DESC
    `, [req.params.id]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar avaliações' });
  }
});

// Criar avaliação (motorista)
router.post('/', autenticar, async (req: AuthRequest, res: Response) => {
  const { eletroposto_id, estrelas, comentario } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO avaliacoes (eletroposto_id, usuario_id, estrelas, comentario, aprovado)
       VALUES ($1, $2, $3, $4, false) RETURNING *`,
      [eletroposto_id, req.user?.id, estrelas, comentario]
    );

    // Atualiza score do eletroposto
    await pool.query(`
      UPDATE eletropostos SET score = (
        SELECT ROUND(AVG(estrelas) * 2, 1) FROM avaliacoes WHERE eletroposto_id = $1 AND aprovado = true
      ) WHERE id = $1
    `, [eletroposto_id]);

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao criar avaliação' });
  }
});

// Aprovar avaliação (admin)
router.patch('/:id/aprovar', autenticar, apenasAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const result = await pool.query(
      'UPDATE avaliacoes SET aprovado = true WHERE id = $1 RETURNING *',
      [req.params.id]
    );

    // Atualiza score do eletroposto
    await pool.query(`
      UPDATE eletropostos SET score = (
        SELECT ROUND(AVG(estrelas) * 2, 1) FROM avaliacoes WHERE eletroposto_id = $1 AND aprovado = true
      ) WHERE id = $1
    `, [result.rows[0].eletroposto_id]);

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao aprovar avaliação' });
  }
});

export default router;