const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://flui-backend-iv12.onrender.com';

export async function fetchEletropostos() {
  const res = await fetch(`${API_URL}/api/eletropostos`);
  if (!res.ok) throw new Error('Erro ao buscar eletropostos');
  return res.json();
}

export async function fetchAvaliacoes() {
  const res = await fetch(`${API_URL}/api/avaliacoes`);
  if (!res.ok) throw new Error('Erro ao buscar avaliações');
  return res.json();
}

export async function aprovarAvaliacao(id: number, token: string) {
  const res = await fetch(`${API_URL}/api/avaliacoes/${id}/aprovar`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) throw new Error('Erro ao aprovar avaliação');
  return res.json();
}

export async function login(email: string, senha: string) {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha }),
  });
  if (!res.ok) throw new Error('Email ou senha incorretos');
  return res.json();
}

export async function criarEletroposto(dados: any, token: string) {
  const res = await fetch(`${API_URL}/api/eletropostos`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dados),
  });
  if (!res.ok) throw new Error('Erro ao criar eletroposto');
  return res.json();
}

export async function editarEletroposto(id: number, dados: any, token: string) {
  const res = await fetch(`${API_URL}/api/eletropostos/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dados),
  });
  if (!res.ok) throw new Error('Erro ao editar eletroposto');
  return res.json();
}

export async function deletarEletroposto(id: number, token: string) {
  const res = await fetch(`${API_URL}/api/eletropostos/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Erro ao deletar eletroposto');
  return res.json();
}