#!/bin/bash

# Add KV environment variables to Vercel
echo "Setting up Vercel KV environment variables..."

vercel env add KV_URL production <<< "rediss://default:ARWjAAImcDE3OWZlYzYzNjE5ODA0ZmFhOGY0OTBmZTNmNWU4MzlhOXAxNTUzOQ@relative-mustang-5539.upstash.io:6379"
vercel env add KV_REST_API_URL production <<< "https://relative-mustang-5539.upstash.io"
vercel env add KV_REST_API_TOKEN production <<< "ARWjAAImcDE3OWZlYzYzNjE5ODA0ZmFhOGY0OTBmZTNmNWU4MzlhOXAxNTUzOQ"
vercel env add KV_REST_API_READ_ONLY_TOKEN production <<< "AhWjAAIgcDFNVPCVU4_iJoRSlHRmESJ4MJ2yZ3cizYKdNg5iMcWRFw"

echo "Environment variables added! Redeploying..."
vercel --prod