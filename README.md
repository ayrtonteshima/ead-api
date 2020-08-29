# Plataforma EAD - Programador a Bordo

**API RESTFul** da Plataforma de Ensino à Distância. Projeto em **Node/JS**, seguindo boas práticas e de fácil integração.

## Dependências
* Node 14.3 e NPM (apenas se desejar rodar fora do container)
* Docker
* Docker Compose

## Configurando e rodando localmente

### Faça uma cópia do arquivo `.env.example`, e a renomeie para `.env`

Gere uma *secret key* e atribua seu valor à variável `SECRET_KEY`, no arquivo `.env`.
Você pode pôr qualquer valor, ou gerar um de forma mais segura, com o comando:
```
node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"
```
### Suba os containers

Utilize o seguinte comando para rodar os containes do MongoDB, do Redis e da API:
```
docker-compose up -d
```

### Configure o MongoDB
É necessário criar o *usuário* do banco de dados `eadapi`, que utilizamos no projeto.

Para isso, acesse o container docker do MongoDB pelo terminal com:
```
docker exec -it eadapi-mongo /bin/bash
```

E execute o seguinte comando:

```
mongo -uroot -pexample <<EOF
  use eadapi
  db.createUser({
    user: "ead_api_user",
    pwd: "ead_api_user",
    roles: ["readWrite"]
  })
EOF
```

## Acessando logs
Saia do container do MongoDB, usando **ctrl+d**. Para visualizar os *logs* gerados pela aplicação, rode o comando:
```
docker logs -f eadapi-api
```

## Tecnologias utilizadas
* Node
* HapiJS Framework
* MongoDB
* Redis
* MySQL

## Quer aprender a desenvolver esta plataforma **do zero**?
Acesse a [playlist](https://www.youtube.com/watch?v=Tlu2hu6CEcI&list=PLbA-jMwv0cuVxsn9saWFWS2eOQEWKE-K7), onde mostramos desde o início todo o desenvolvimento da plataforma.

## Redes sociais
* [Grupo no Facebook](https://www.facebook.com/groups/326517464701634/)
* Telegram: @programadorabordo
