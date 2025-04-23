#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

echo "Creating a special static build for GitHub Pages..."
# Replace 'your-repo-name' with your actual repository name
REPO_NAME=$(basename -s .git `git config --get remote.origin.url` 2>/dev/null || echo "your-repo-name")
echo "Detected repository name: $REPO_NAME"
npx vite build --config gh-pages-vite.config.ts --base=/$REPO_NAME/

echo "Creating GitHub Pages specific files..."
touch gh-pages-build/.nojekyll
cp client/public/404.html gh-pages-build/404.html

echo "Deploying to GitHub Pages..."
npx gh-pages -d gh-pages-build

echo "Cleaning up..."
rm -rf gh-pages-build

echo "Deployment complete!"
echo "Your site should be available at https://[your-username].github.io/$REPO_NAME/"
echo "Note: It might take a few minutes for the changes to be visible."