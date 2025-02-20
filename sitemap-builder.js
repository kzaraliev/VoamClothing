import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';

const generateSitemap = async () => {
  const sitemap = new SitemapStream({ hostname: 'https://voamclothing.com' });

  const urls = [
    { url: '/', changefreq: 'monthly', priority: 1.0 },           // Home page
    { url: '/items', changefreq: 'weekly', priority: 0.8 },       // Items page
    { url: '/items/:id', changefreq: 'weekly', priority: 0.6 }, // Product details page
    { url: '/about', changefreq: 'yearly', priority: 0.3 },       // About page
    { url: '/contacts', changefreq: 'yearly', priority: 0.3 },    // Contact page
    { url: '/shopping-cart', changefreq: 'never', priority: 0.5 },// Shopping cart
    { url: '/checkout', changefreq: 'never', priority: 0.5 },     // Checkout page
  ];
  

  // Add all URLs to the sitemap
  urls.forEach((url) => sitemap.write(url));

  sitemap.end();

  // Write sitemap to the public directory
  streamToPromise(sitemap).then((data) =>
    createWriteStream('./public/sitemap.xml').write(data)
  );
};

generateSitemap();
