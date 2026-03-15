# Node Dev Container

Este projeto utiliza **Docker Compose** para subir um container Node.js para desenvolvimento.

## Requisitos

- Apt: `apt update`
- Docker: `apt install docker.io && apt install docker-compose`
- Docker Compose: `docker-compose up -d`
- Curl: `apt install curl`

## Running Vs-Code 
- code server password at /root/.config/code-server/config.yaml

```yaml
curl -fsSL https://code-server.dev/install.sh | sh

code-server --bind-addr 0.0.0.0:<docker-container-port> --auth password

