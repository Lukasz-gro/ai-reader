import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    allowedDevOrigins: [
        'localhost',
    ],
    experimental: {
        serverActions: {
            bodySizeLimit: '20mb',
        }
    }
};

export default nextConfig;
