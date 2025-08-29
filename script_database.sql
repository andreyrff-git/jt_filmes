-- USUARIOS
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT,
	nome VARCHAR(40),
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP,
     constraint pk_usuario primary key(id) 
);

-- FILMES	
CREATE TABLE IF NOT EXISTS filmes (
    id INT AUTO_INCREMENT,
    titulo VARCHAR(100) NOT NULL,
    genero VARCHAR(100),
	sinopse VARCHAR(500),
    url_poster VARCHAR(150),
    ano_lancamento INT,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP,
    constraint pk_filmes primary key(id) 
);


INSERT INTO usuarios(email,password) values ('teste@email.com', '$2y$10$aw0w8/yd8i72VMDD7N2opuXTjGY17rBykJdJ.p6lHCp27fKruWIQu');