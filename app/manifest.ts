import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "TheFreeWallet",
    short_name: "TheFreeWallet",
    description: "A simple and free budgeting tool",
    start_url: "/",
    display: "standalone",
    background_color: "#25313f",
    theme_color: "#25313f",
    icons: [
      {
        src: "../public/192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "../public/512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}

// {
//   "id": "any_id",
//   "name": "TheFreeWallet",
//   "short_name": "TheFreeWallet",
//   "description": "A simple and free budgeting tool",
//   "icons": [
//     {
//       "src": "192.png",
//       "sizes": "192x192",
//       "type": "image/png"
//     },
//     {
//       "src": "512.png",
//       "sizes": "512x512",
//       "type": "image/png"
//     }
//   ],
//   "theme_color": "#FFFFFF",
//   "background_color": "#FFFFFF",
//   "start_url": "/",
//   "scope": ".",
//   "display": "standalone",
//   "orientation": "portrait"
// }
