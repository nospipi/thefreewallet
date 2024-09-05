/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "**",
      },
    ],
  },
  //BELOW -- https://mongoosejs.com/docs/nextjs.html
  // experimental: {
  //   esmExternals: "loose",
  //   serverComponentsExternalPackages: ["mongoose"],
  // },
  serverExternalPackages: ["mongoose"],

  // webpack: (config) => {
  //   config.experiments = {
  //     topLevelAwait: true,
  //   };
  //   return config;
  // },
};

export default nextConfig;


