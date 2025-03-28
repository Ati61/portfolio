#!/bin/bash

# Make sure we have the .env file
if [ ! -f .env ]; then
  echo "Error: .env file not found. Please create one based on .env.example"
  exit 1
fi

# Load environment variables
source .env

# Create credentials file directory if it doesn't exist
mkdir -p cloudflared

# Check if credentials file exists
if [ ! -f cloudflared/credentials.json ]; then
  echo "Please place your Cloudflare credentials.json file in the cloudflared directory"
  echo "You can download this from the Cloudflare dashboard when creating a tunnel"
  exit 1
fi

# Build and start containers
docker-compose up -d --build

echo "Deployment complete! Your portfolio should be available at https://atixd.me"
echo "Check logs with: docker-compose logs -f"
