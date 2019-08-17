# Plataforma EAD - Programador a Bordo

API RESTFul da plataforma de ensino a distância. Projeto em Node/JS seguindo boas práticas e de fácil integração.

## Dependências
* Node 10.5.3
* NPM
* Docker
* Docker Compose

## Rodando local
```
docker-compose up -d
```

### Mongo
Para rodar o projeto local, é necessário criar o usuário do banco de dados `eadapi` que utilizamos no sistema.
Acesse o container docker do mongo pelo terminal:
```
docker exec -it eadapi-mongo /bin/bash
```

Axecute o seguinte comando dentro do container:

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
Para visualizar os logs, é necessário rodar o comando do docker para visualizar os logs do container.
```
docker logs -f eadapi-api
```

## Tecnologias
* Node
* MongoDB
* Redis
* MySQL

## Quer aprender a desenvolver esta plataforma do zero?
[Acesse a playlist](https://www.youtube.com/watch?v=Tlu2hu6CEcI&list=PLbA-jMwv0cuVxsn9saWFWS2eOQEWKE-K7) onde mostramos desde o início todo o desenvolvimento da plataforma

## Redes sociais
* [Grupo no Facebook](https://www.facebook.com/groups/326517464701634/)
* Telegram: @programadorabordo
