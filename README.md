# Node Dev Container

Este projeto utiliza **Docker Compose** para subir um container Node.js para desenvolvimento.

## Requisitos

- Docker: `apt install docker.io`
- Docker Compose: `docker-compose up -d`

## docker-compose.yml

```yaml
version: "3.9"

services:
  dev:
    image: node:20-slim
    container_name: node_dev
    ports:
      - "3333:3333"
    stdin_open: true
    tty: true