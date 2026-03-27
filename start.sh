#!/bin/sh

# Check if the directory is empty
if [ ! -d "node_modules" ] && [ -d "src" ]; then
  # Create a new Angular project if the directory is empty
  ng new ivan-portfolio --package-manager pnpm --directory . --routing --style scss --strict --standalone --ssr true --interactive false
fi

# Start the Angular development server
pnpm start --host 0.0.0.0 --port 4200 --disable-host-check