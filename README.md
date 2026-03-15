version: "3.9"

services:
  dev:
    image: node:20-slim
    container_name: node_dev
    ports:
      - "3333:3333"
    stdin_open: true
    tty: true


docker-compose up -d