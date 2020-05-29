# Lemmow

## Before running

### Configure PostgreSQL

1. Run postgres client: `psql -u postgres`  
2. Create role: `CREATE ROLE <your login> WITH PASSWORD '<your password>' CREATEDB LOGIN`  
3. Create DB: `CREATE DATABASE <you db>`  
4. Grant role with privileges on db: `GRANT ALL PRIVILEGES ON DATABASE <your db> TO <your login>`  
5. Set database configuration in `.env.dev` / `.env.prod`(depending on run mode)  

### Configure app

1. Set actual environment: `cp .env.dev .env` or `cp .env.prod .env`  