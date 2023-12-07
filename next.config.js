/** @type {import('next').NextConfig} */
const nextConfig = {
  generateStaticParams: async function () {
    return {
      '/': { page: '/' },
    };
  },
  output: 'export',
  images: {
    domains: [
      "pickbazarlaravel.s3.ap-southeast-1.amazonaws.com",
      "picsum.photos",
      "loremflickr.com",
      "res.cloudinary.com",
      "www.nordicengros.com",
      // allow for all domains
      "*",
    ],
  },
};

module.exports = nextConfig;
