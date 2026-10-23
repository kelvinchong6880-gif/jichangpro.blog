import fs from 'fs';
import path from 'path';

const KEY = 'f9b8c7d6e5a43210f9b8c7d6e5a43210';
const HOST = 'jichangpro.blog';

async function submitIndexNow() {
  try {
    const sitemapPath = path.join(process.cwd(), 'dist', 'sitemap-0.xml');
    if (!fs.existsSync(sitemapPath)) {
      console.error('Sitemap not found at', sitemapPath);
      process.exit(1);
    }

    const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');
    
    // Extract all <loc> URLs from the sitemap
    const urlRegex = /<loc>(.*?)<\/loc>/g;
    const urlList = [];
    let match;
    while ((match = urlRegex.exec(sitemapContent)) !== null) {
      urlList.push(match[1]);
    }

    if (urlList.length === 0) {
      console.log('No URLs found to submit.');
      return;
    }

    console.log(`Found ${urlList.length} URLs. Submitting to IndexNow (IndexNow API & Bing)...`);

    const payload = {
      host: HOST,
      key: KEY,
      keyLocation: `https://${HOST}/${KEY}.txt`,
      urlList: urlList
    };

    const endpoints = [
      'https://api.indexnow.org/indexnow',
      'https://www.bing.com/indexnow'
    ];

    for (const endpoint of endpoints) {
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload)
        });

        if (response.ok || response.status === 200 || response.status === 202) {
          console.log(`✅ [${new URL(endpoint).hostname}] Successfully submitted to IndexNow (${response.status})!`);
        } else {
          console.error(`❌ [${new URL(endpoint).hostname}] Failed to submit:`, response.status, response.statusText);
          const text = await response.text();
          console.error('Response:', text);
        }
      } catch (err) {
        console.error(`❌ [${new URL(endpoint).hostname}] Network error:`, err);
      }
    }
  } catch (error) {
    console.error('Error submitting to IndexNow:', error);
    process.exit(1);
  }
}

submitIndexNow();
