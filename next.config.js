/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "pickbazarlaravel.s3.ap-southeast-1.amazonaws.com",
      "picsum.photos",
      "loremflickr.com",
      "res.cloudinary.com",
    ],
  },
};

module.exports = nextConfig;
