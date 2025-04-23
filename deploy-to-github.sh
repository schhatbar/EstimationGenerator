#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

echo "Building for GitHub Pages..."
npx vite build --config gh-pages-vite.config.ts --base=/project-estimation/

# Create .nojekyll file to prevent Jekyll processing
touch dist/.nojekyll

echo "Deploying to GitHub Pages..."
npx gh-pages -d dist

echo "Deployment complete! Your site should be available at https://[your-username].github.io/project-estimation/"
echo "Note: It might take a few minutes for the changes to be visible."