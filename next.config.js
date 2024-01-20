/** @type {import('next').NextConfig} */
const nextConfig = {
     webpack: (config) => {
          config.resolve.alias.canvas = false;
        
           return config;
         },
         images: {
          domains: ['localhost' ,"ebook-nepal-1.s3.ap-south-1.amazonaws.com"],
        },
}

module.exports = nextConfig
