#!/bin/bash

# Start Cloudflare Tunnel for local development server
# This creates a public URL that others can access

echo "🚀 Starting Cloudflare Tunnel..."
echo "📡 Connecting to http://localhost:5173"
echo ""
echo "⏳ Please wait for the tunnel URL..."
echo ""

cloudflared tunnel --url http://localhost:5173

