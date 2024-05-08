# API


## Setup
- Copiar env.sample para um arquivo chamado .env
- Alterar a url do banco de dados apontanto para um mysql server valido
- Rodar `npm install`
- Se é a primeira vez, rodar o comando `npm run db:init`
- Do contrário, executar o comando `npm run db:generate` rodar as migrations


## How to Start
- Para executar a API rodar o comando `npm run start`
- Para executar o cron que envia os emails adicionar ao cron do SO para executar o seguindo comando:
`npm run start-sender-job`

### Cron Sample:
Executar:
`crontab -e``o

Adicionar cron:
`0 * * * * cd /path/to/your/project && npm run start-email-sender-job`

O exemplo acima cria um cron para rodar a cada hora.


