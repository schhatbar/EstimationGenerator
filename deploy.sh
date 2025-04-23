#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

echo "Creating a special static build for GitHub Pages..."
npx vite build --config gh-pages-vite.config.ts --base=/project-estimation/

echo "Creating .nojekyll file to prevent Jekyll processing..."
touch gh-pages-build/.nojekyll

echo "Deploying to GitHub Pages..."
npx gh-pages -d gh-pages-build

echo "Cleaning up..."
rm -rf gh-pages-build

echo "Deployment complete!"
echo "Your site should be available at https://[your-username].github.io/project-estimation/"
echo "Note: It might take a few minutes for the changes to be visible."