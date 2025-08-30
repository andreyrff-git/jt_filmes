# PROJETO Ordens de Serviço

## Versões utilizadas para o desenvolvimento
- Apache 2.4.62
- PHP 8.3.14
- MySQL  8.3.14
- Laravel 8.6.12
- Teste Unitário
	1.Jest
	2.babel-jest

# Instalação

## Clonar o PROJETO do seguinte repositótio: https://github.com/andreyrff-git/jt_filmes.git
- git clone https://github.com/andreyrff-git/jt_filmes

## Etapas preparatórias
- Instale o composer no servidor apache
- Caso a instalação seja no windows, nas variáveis de ambiente do windos, na variável "PATH", inclua um novo caminho indicando a pasta onde se encontra o bat do composer, arquivo composer.bat
- Abra o prompt e acesse a pasta base do seu projeto e execute os comandos 
	1. "composer global require laravel/installer" para instalação do instalador global do Laravel;
	2.  "laravel new gerenciador-filmes" para baixar e instalar a versão mais recente do Laravel e suas dependências;
	3. "composer require tymon/jwt-auth" para instalação da biblioteca JWT;
	4. "php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider" para publicação e configuração;
	5. "php artisan jwt:secret" para gerar a chave secreta que será usada para assinar os tokens JWT;
	6. "npm install bootstrap" para instalar o bootstrap;
	
	
## Criar o banco de dados com o NOMEDOBANCO, USUARIO com todos os privilégios e informar a SENHA

CREATE USER 'admin'@'localhost' IDENTIFIED BY 'admin@123';

CREATE DATABASE IF NOT EXISTS gerenciador_filmes CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE gerenciador_filmes;

GRANT ALL PRIVILEGES ON gerenciador_filmes.* TO 'admin'@'localhost';

FLUSH PRIVILEGES;

## Criar a estrutura do banco de dados e importar 
O arquivo para criação das tabelas e importação do usuário para login, encontra-se no diretorio principal dp PROJETO.
- Arquivo para criação da estrutura: script_database.sql 

## Para executar o projeto Ordens de Serviço
- Acesse o diretório onde o Ordens de Serviço foi clonado
- No arquivo ../gerenciador_filmes\filmes_ui\src\api\axiosConfig.js, altere a propriedade "baseURL", com a URL base que executará as chamadas para a API. EX: http://localhost:8000/api/v1;;
- No arquivo ../gerenciador_filmes\filmes_ui\config\cors.php, altere a propriedade "allowed_origins", com a os IPs que poderão ser utilizados para carregar a aplicação;
- Na pasta raiz, altere o arquivo .env, para colocar as configurações de banco de dados. EX:
	DB_CONNECTION=mysql
	DB_HOST=127.0.0.1
	DB_PORT=3306
	DB_DATABASE=gerenciador_filmes
	DB_USERNAME=admin
	DB_PASSWORD=admin@123

- Abra o prompt e execute os comandos na pasta do seu projeto frontend:
	1. "php -S localhost:8000";
	2. Se estiver no windows, abra dois terminais. NO primeiro terminal vá até a pasta ..\gerenciador_filmes\filmes_api e execute o comando abaixo;
	3. "php artisan serve --host=localhost --port=8000"
	4. No segundo terminal vá até a pasta ..\gerenciador_filmes\filmes_ui e execute o comando abaixo;
	5. "npm run dev";

- Acesse então a url http://localhost:5173/login
- O LOGIN e a SENHA são respectivamente: teste@email.com e 123456 
- Se caso você possuir o servidor web Apache, copie todos os arquivos do projeto para o diretório root e acesse com o endereço de acordo com sua configuração, geralmente http://localhost

## Testes
- Para execução de testes na API, vá até a pasta ..\gerenciador_filmes\filmes_api e execute no terminal o comando:
	1. "php artisan test";
- Para execução de testes da interface, vá até a pasta ..\gerenciador_filmes\filmes_aui e execute no terminal o comando:
	1. "npm test";

