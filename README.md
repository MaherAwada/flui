# FLUI — O Sistema Operacional da Mobilidade Elétrica

Plataforma completa para o ecossistema de veículos elétricos, composta por app mobile para motoristas e painel web administrativo para a equipe FLUI.

---

##  Arquitetura
flui/
├── web/        # Next.js 14 + Tailwind CSS (Painel Administrativo)
├── mobile/     # React Native + Expo (App Motoristas)
└── backend/    # Node.js + Express + PostgreSQL (API REST)

---

##  Deploy

| Plataforma | URL |
|------------|-----|
| Web (Vercel) | https://flui-beryl.vercel.app |
| Backend (Render) | https://flui-backend-iv12.onrender.com |
| Banco de Dados | Supabase (PostgreSQL) |

---

##  API REST — Endpoints

### Autenticação
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/auth/registro` | Registrar novo usuário |
| POST | `/api/auth/login` | Login (retorna JWT) |

### Eletropostos
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/eletropostos` | Listar todos |
| GET | `/api/eletropostos/:id` | Buscar por ID |
| POST | `/api/eletropostos` | Criar (admin) |
| PUT | `/api/eletropostos/:id` | Editar (admin) |
| DELETE | `/api/eletropostos/:id` | Deletar (admin) |

### Avaliações
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/avaliacoes` | Listar todas |
| GET | `/api/avaliacoes/eletroposto/:id` | Por eletroposto |
| POST | `/api/avaliacoes` | Criar (motorista) |
| PATCH | `/api/avaliacoes/:id/aprovar` | Aprovar (admin) |

### Usuários
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/usuarios/perfil` | Perfil do usuário logado |
| PUT | `/api/usuarios/perfil` | Atualizar perfil |
| GET | `/api/usuarios` | Listar todos (admin) |

---

##  Banco de Dados

### Tabelas
- **usuarios** — motoristas e administradores
- **eletropostos** — pontos de recarga com localização
- **avaliacoes** — avaliações dos motoristas por ponto
- **historico_recargas** — histórico de sessões de recarga

---

##  Autenticação

JWT (JSON Web Token) com dois perfis:
- **motorista** — acesso ao app mobile
- **admin** — acesso ao painel administrativo web

Credenciais de teste:
- Email: `admin@flui.com` / Senha: `password`

---

##  Como rodar localmente

### Web
```bash
cd web
npm install
npm run dev
# Acesse http://localhost:3000
```

### Backend
```bash
cd backend
npm install
npx tsx src/index.ts
# Acesse http://localhost:3001
```

### Mobile
```bash
cd mobile
npm install
npm run web
# Acesse http://localhost:8081
```

---

##  Integrantes

| Nome | RM |
|------|----|
| Emanuel Barbosa da Silva  | 559908 |
| João Pedro Dantas de Carli | 559492 |
| Maher Ahmad Awada | 559466 |
| Traicy Bruna de Godoy | 561095 |

---

##  Stack Tecnológica

- **Frontend Web:** Next.js 14, Tailwind CSS, TypeScript
- **Mobile:** React Native, Expo
- **Backend:** Node.js, Express, TypeScript
- **Banco de Dados:** PostgreSQL (Supabase)
- **Deploy Web:** Vercel
- **Deploy Backend:** Render
- **Autenticação:** JWT + bcryptjs