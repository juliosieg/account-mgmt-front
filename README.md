# Página de gerenciamento de contas bancárias

Esse projeto visa demonstrar algumas funcionalidades de gerenciamento de uma conta bancária.

O projeto foi desenvolvido usando **Vue.js 3.x** e não possui intuito comercial.

O projeto de back relacionado, está disponível no seguinte [link](https://github.com/juliosieg/account-mgmt-back).


### Requisitos

Esse projeto depende da instalação do Node.js e do gerenciador de pacotes NPM.

### Instalação de Pacotes

Para executar o projeto pela primeira vez, é necessário rodar o seguinte comando:

`npm install`

O comando acima, fará a instalação de todos os pacotes necessários para funcionamento correto do servidor Nodejs. Sendo que os pacotes e suas versões estão definidos no arquivo `package.json`


### Execução

Após seguir os passos acima, o projeto já pode ser executado e testado. Para tanto, deve-se rodar o seguinte comando:

`npm run serve`

Esse comando deverá rodar o projeto na porta **8080**, configurada por padrão.

Como o projeto depende da API de Backend rodando, o caminho da mesma está disponível no arquivo `vue.config.js`. No caso de necessidade de alteração de porta ou alguma outra configuração, esse arquivo deverá ser considerado.

Com o projeto rodando, utilize um browser apontando para o seguinte link:

`localhost:8080`(Se a porta foi alterada, deve ser alterada também nesse link)