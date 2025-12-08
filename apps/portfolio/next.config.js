/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // EXTRACTION NOTE: When moving AI engine to separate repo, update this
  // to point to the external API URL via environment variable
};

module.exports = nextConfig;

