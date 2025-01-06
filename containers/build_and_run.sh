#!/bin/bash

# Stop all running containers
docker-compose stop

# Build the frontend
docker-compose build frontend
if [[ $? -ne 0 ]]; then
    echo -e "\033[0;31mFrontend build failed!\033[0m"
    exit 1
else
    echo -e "\033[0;32mFrontend build success!\033[0m"
fi

# Build the backend
docker-compose build backend
if [[ $? -ne 0 ]]; then
    echo -e "\033[0;31mBackend build failed!\033[0m"
    exit 1
else
    echo -e "\033[0;32mBackend build success!\033[0m"
fi

# Start the services
docker-compose up --build
if [[ $? -ne 0 ]]; then
    echo -e "\033[0;31m[ERROR]: Docker Compose Failed to start services.\033[0m"
    exit 2
else
    echo -e "\033[0;32m[INFO]: Docker Compose started services successfully.\033[0m"
fi

