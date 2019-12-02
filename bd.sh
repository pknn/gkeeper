#! /bin/sh
cd client
docker build -t pknndev/gkeeper_client:latest .
docker push pknndev/gkeeper_client:latest

cd ..
cd server 
docker build -t pknndev/gkeeper_api:latest .
docker push pknndev/gkeeper_api:latest

cd ..
docker-compose pull
docker-compose up --force-recreate