import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    allowedDevOrigins: [
        'localhost',
        '192.168.0.81',
    ],
};

export default nextConfig;
