#!/bin/bash

# Check if the container is running
if docker ps | grep -q tic_tac_pg; then
    echo "Container tic_tac_pg is already running."
# Check if the container exists but is not running
elif docker ps -a | grep -q tic_tac_pg; then
    echo "Container tic_tac_pg exists but is not running. Starting container..."
    docker start tic_tac_pg
# If the container does not exist
else
    echo "Container tic_tac_pg does not exist. Creating and starting container..."
    docker run -d \
        --name tic_tac_pg \
        -p 5432:5432 \
        -e POSTGRES_DB=tic_tac_pg \
        -e POSTGRES_PASSWORD=tic_tac_pg \
        -e PGDATA=/var/lib/postgresql/data/tic_tac_pg \
        -v /custom/mount:/var/lib/postgresql/data \
        postgres
fi
