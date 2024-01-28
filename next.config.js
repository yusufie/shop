/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  images: {
    domains: [
      "s3grandbazaar.s3.eu-north-1.amazonaws.com",
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
