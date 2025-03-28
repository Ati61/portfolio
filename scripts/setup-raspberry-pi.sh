#!/bin/bash

# Update and install dependencies
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo apt-get install -y docker-compose

# Add current user to docker group
sudo usermod -aG docker $USER

# Create project directory
mkdir -p ~/portfolio

echo "Setup complete! Please log out and log back in for group changes to take effect."
echo "Then, copy your project files to the ~/portfolio directory and run the deploy script."
