#!/bin/bash

echo "Building application..."
npm run build

echo "Deploying to Firebase..."
firebase deploy

echo "Deployment complete!"
