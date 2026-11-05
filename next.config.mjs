const isGitHubActions = process.env.GITHUB_ACTIONS === "true";
const basePath = isGitHubActions || process.env.NEXT_PUBLIC_BASE_PATH ? "/happy-birthday-akriti" : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: basePath || undefined,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  reactStrictMode: true,
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
