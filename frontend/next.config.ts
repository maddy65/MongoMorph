import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export', // Ensures Next.js generates static files
  distDir: 'out',
};



export const metadata = {
  title: "Milaniya",
  description: "A sample Next.js app with Redux",
 
};

export default nextConfig;
