-- Criação do banco de dados
CREATE DATABASE IF NOT EXISTS admin_system;

-- Selecionar o banco de dados criado
USE admin_system;

-- Tabela de usuários para armazenar login e permissões
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    role ENUM('admin', 'user') DEFAULT 'user',  -- 'admin' terá permissão para enviar arquivos
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de categorias de arquivos
CREATE TABLE IF NOT EXISTS file_categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(255)
);

-- Tabela de arquivos (uploads)
CREATE TABLE IF NOT EXISTS uploaded_files (
    id INT AUTO_INCREMENT PRIMARY KEY,
    file_name VARCHAR(255) NOT NULL,
    file_description TEXT,
    file_path VARCHAR(255) NOT NULL,  -- Caminho do arquivo no servidor
    file_size INT,  -- Tamanho do arquivo em KB
    uploaded_by INT,  -- ID do usuário que fez o upload
    category_id INT,  -- Relacionamento com a tabela de categorias
    upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (uploaded_by) REFERENCES users(id),
    FOREIGN KEY (category_id) REFERENCES file_categories(id) ON DELETE SET NULL
);

-- Tabela para registrar o login dos usuários
CREATE TABLE IF NOT EXISTS user_logins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    login_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(45),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Populando a tabela de categorias com exemplos
INSERT INTO file_categories (category_name, description) VALUES 
('Filmes', 'Arquivos de filmes e vídeos'),
('Séries', 'Episódios de séries'),
('Livros', 'Livros digitais e PDFs'),
('Música', 'Arquivos de música'),
('Software', 'Programas e softwares diversos');

-- Criação de um administrador padrão
INSERT INTO users (username, password_hash, email, role) VALUES 
('admin', SHA2('admin123', 256), 'admin@site.com', 'admin');
