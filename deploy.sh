#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

echo "Creating a special static build for GitHub Pages..."
# Auto-detect repository name from git remote
REPO_NAME=$(basename -s .git `git config --get remote.origin.url` 2>/dev/null || echo "project-estimation")
# Clean the repo name to be URL-safe (remove spaces, special chars)
CLEAN_REPO_NAME=$(echo "$REPO_NAME" | sed 's/ /-/g' | sed 's/[^a-zA-Z0-9-]//g')
echo "Detected repository name: $REPO_NAME"
echo "Using URL-safe name for base path: $CLEAN_REPO_NAME"

# Build with the clean repo name as base path
npx vite build --config gh-pages-vite.config.ts --base=/$CLEAN_REPO_NAME/

echo "Creating GitHub Pages specific files..."
touch gh-pages-build/.nojekyll
cp client/public/404.html gh-pages-build/404.html

echo "Deploying to GitHub Pages..."
npx gh-pages -d gh-pages-build

echo "Cleaning up..."
rm -rf gh-pages-build

echo "Deployment complete!"
echo "Your site should be available at https://[your-username].github.io/$CLEAN_REPO_NAME/"
echo "Note: It might take a few minutes for the changes to be visible."