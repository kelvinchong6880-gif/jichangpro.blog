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

    console.log(`Found ${urlList.length} URLs. Submitting to IndexNow...`);

    const payload = {
      host: HOST,
      key: KEY,
      keyLocation: `https://${HOST}/${KEY}.txt`,
      urlList: urlList
    };

    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      console.log('✅ Successfully submitted to IndexNow!');
    } else {
      console.error('❌ Failed to submit:', response.status, response.statusText);
      const text = await response.text();
      console.error('Response:', text);
    }
  } catch (error) {
    console.error('Error submitting to IndexNow:', error);
    process.exit(1);
  }
}

submitIndexNow();
