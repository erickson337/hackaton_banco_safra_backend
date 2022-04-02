# Banco Safra Hackaton
Backend
### Necessário
  - Node version > 10
  - NPM
### Instalação
  - Em caso de utilização do banco de dados, utilizar os comandos abaixo:
    - Crie um arquivo .env a partir do .env.example para configuração do banco de dados
    - Em seguida execute os procedimentos abaixo:

      ```sh
          npm i
          npx sequelize-cli init
      ```

    - Após realizar os comandos acima, execute as migrations com o comando abaixo:
        ```sh
            npx sequelize-cli db:migrate
        ```
    - link da documentação do [sequelize](https://sequelize.org/v7/manual/migrations.html)

    - Finalizando a instalação, execute o comando abaixo:
      ```sh
          npm run dev
      ```
    - O servidor estará executando na porta definida no .env ou na padrão 8080

### Docker
  - Build: ``` docker build . -t hackaton/backend-node ```
  - Rodando docker:
    ``` docker run -it -p 8001:8001 hackaton/backend-node ```
  - Acessando o link: ``` http://localhost:8000/api/users/1 ```