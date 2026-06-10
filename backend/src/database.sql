-- Usuários
CREATE TABLE IF NOT EXISTS usuarios (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  senha VARCHAR(255) NOT NULL,
  tipo VARCHAR(20) DEFAULT 'motorista',
  criado_em TIMESTAMP DEFAULT NOW()
);

-- Eletropostos
CREATE TABLE IF NOT EXISTS eletropostos (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  cidade VARCHAR(100) NOT NULL,
  estado VARCHAR(2) NOT NULL,
  endereco VARCHAR(200),
  carregadores INTEGER DEFAULT 1,
  disponiveis INTEGER DEFAULT 1,
  conectores TEXT[],
  potencia VARCHAR(20),
  horario VARCHAR(50),
  comodidades TEXT[],
  lat DECIMAL(10, 8),
  lng DECIMAL(11, 8),
  score DECIMAL(3,1) DEFAULT 0,
  criado_em TIMESTAMP DEFAULT NOW()
);

-- Avaliações
CREATE TABLE IF NOT EXISTS avaliacoes (
  id SERIAL PRIMARY KEY,
  eletroposto_id INTEGER REFERENCES eletropostos(id) ON DELETE CASCADE,
  usuario_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
  estrelas INTEGER CHECK (estrelas >= 1 AND estrelas <= 5),
  comentario TEXT,
  aprovado BOOLEAN DEFAULT false,
  criado_em TIMESTAMP DEFAULT NOW()
);

-- Histórico de recargas
CREATE TABLE IF NOT EXISTS historico_recargas (
  id SERIAL PRIMARY KEY,
  usuario_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
  eletroposto_id INTEGER REFERENCES eletropostos(id) ON DELETE CASCADE,
  duracao_minutos INTEGER,
  kwh_carregados DECIMAL(6,2),
  custo DECIMAL(8,2),
  criado_em TIMESTAMP DEFAULT NOW()
);

-- Dados simulados
INSERT INTO usuarios (nome, email, senha, tipo) VALUES
('Admin FLUI', 'admin@flui.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin'),
('Carlos Motorista', 'carlos@email.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'motorista')
ON CONFLICT DO NOTHING;

INSERT INTO eletropostos (nome, cidade, estado, endereco, carregadores, disponiveis, conectores, potencia, horario, comodidades, lat, lng, score) VALUES
('Shopping Iguatemi', 'São Paulo', 'SP', 'Av. Brigadeiro Faria Lima, 2232', 4, 3, ARRAY['CCS2','CHAdeMO','Tipo 2'], '150 kW', '08:00 - 22:00', ARRAY['Estacionamento','Shopping','Alimentação'], -23.5752, -46.6890, 9.4),
('Hotel Fasano', 'São Paulo', 'SP', 'Rua Vittorio Fasano, 88', 3, 2, ARRAY['CCS2','Tipo 2'], '100 kW', '24 horas', ARRAY['Manobrista','Hotel','Restaurante'], -23.5614, -46.6597, 9.1),
('Posto Shell Paulista', 'São Paulo', 'SP', 'Av. Paulista, 1000', 2, 1, ARRAY['CCS2','CHAdeMO'], '50 kW', '24 horas', ARRAY['Posto de Combustível','Conveniência'], -23.5630, -46.6543, 8.8),
('Parque Villa-Lobos', 'São Paulo', 'SP', 'Av. Professor Fonseca Rodrigues, 2001', 6, 4, ARRAY['Tipo 2','CCS2'], '22 kW', '06:00 - 20:00', ARRAY['Estacionamento','Parque','Ciclovia'], -23.5407, -46.7172, 8.5),
('Shopping JK Iguatemi', 'São Paulo', 'SP', 'Av. Presidente Juscelino Kubitschek, 2041', 8, 5, ARRAY['CCS2','CHAdeMO','Tipo 2','Tesla'], '250 kW', '10:00 - 22:00', ARRAY['Estacionamento','Shopping','Alimentação','Wi-Fi'], -23.5965, -46.6857, 9.2)
ON CONFLICT DO NOTHING;