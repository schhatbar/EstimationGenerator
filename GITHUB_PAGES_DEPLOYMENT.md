# GitHub Pages Deployment Guide

This guide provides step-by-step instructions for deploying your Project Estimation Generator to GitHub Pages.

## Prerequisites

1. Create a GitHub repository for your project.
2. Make sure you have Git installed on your computer.
3. Ensure you have Node.js and npm installed.

## Setup Instructions

### 1. Connect your local project to your GitHub repository

If you haven't already set up a Git repository:

```bash
# Initialize a new Git repository
git init

# Add all files to the repository
git add .

# Commit your changes
git commit -m "Initial commit"

# Add your GitHub repository as a remote
git remote add origin https://github.com/yourusername/your-repository-name.git

# Push your code to GitHub
git push -u origin main  # or 'master' depending on your default branch name
```

### 2. Install the GitHub Pages dependency

```bash
npm install --save-dev gh-pages
```

### 3. Deploy to GitHub Pages

Run the deployment script from the project root:

```bash
./deploy.sh
```

The script will:
1. Automatically detect your repository name
2. Build the application with the correct base path
3. Create necessary GitHub Pages configuration files
4. Deploy the application to the `gh-pages` branch

### 4. Configure GitHub Pages in your repository settings

1. Go to your GitHub repository settings
2. Scroll down to the "GitHub Pages" section
3. Ensure the source is set to the `gh-pages` branch
4. Wait a few minutes for your site to be published

Your site will be available at: `https://yourusername.github.io/your-repository-name/`

## Troubleshooting

### 404 errors when accessing pages directly

This application includes a 404.html file that handles client-side routing on GitHub Pages. If you're still experiencing issues:

1. Make sure the deployment completed successfully
2. Verify your repository name was correctly detected in the deploy.sh output
3. Try clearing your browser cache

### Repository Name Handling

For repositories with spaces or special characters in their names:

1. The deployment script automatically converts spaces to hyphens and removes special characters
2. Example: A repository named "Project Estimation/Tool" will be deployed to "/Project-EstimationTool/"
3. This ensures URLs are properly formatted and reduces 404 errors on GitHub Pages

You can see the clean repository name that was used in the deploy script output:

### Unable to deploy

1. Check your GitHub access permissions
2. Ensure you have the correct remote URL
3. Verify you have proper write access to the repository

## Updating Your Deployment

To update your GitHub Pages deployment after making changes:

1. Commit your changes to your repository
2. Run the deployment script again: `./deploy.sh`

Your updated site should be available within a few minutes.