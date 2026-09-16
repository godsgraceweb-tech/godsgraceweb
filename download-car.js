const fs = require('fs');
const https = require('https');
const path = require('path');

const candidates = [
  'https://images.unsplash.com/photo-1463320626388-b4b0ff120129?q=80&w=800&auto=format&fit=crop', // classic car wedding
  'https://images.unsplash.com/photo-1510520628203-b9db809f6d62?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1515569067071-ec3b51335dd0?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1542194600-47b1c3fa3ddc?q=80&w=800&auto=format&fit=crop'
];

const dest = path.join(__dirname, 'public', 'images', 'service-5.jpg');

function download(url, filename) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return download(res.headers.location, filename).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error('Status ' + res.statusCode));
      }
      
      const file = fs.createWriteStream(filename);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        const stat = fs.statSync(filename);
        if (stat.size < 1000) {
          reject(new Error('File too small'));
        } else {
          resolve();
        }
      });
    }).on('error', (err) => {
      fs.unlink(filename, () => {});
      reject(err);
    });
  });
}

async function main() {
  for (const url of candidates) {
    console.log(`Trying ${url}...`);
    try {
      await download(url, dest);
      console.log('Success!');
      return;
    } catch (e) {
      console.error('Failed:', e.message);
    }
  }
  console.log('All failed.');
}

main();
