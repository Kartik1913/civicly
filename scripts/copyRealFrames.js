import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = path.join(__dirname, '..', 'civicly-city');
const destDir = path.join(__dirname, '..', 'public', 'civicly-city');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

let count = 0;
for (let i = 1; i <= 80; i++) {
  const padIndex = String(i).padStart(3, '0');
  const filename = `frame_${padIndex}.webp`;
  const srcFile = path.join(srcDir, filename);
  const destFile = path.join(destDir, filename);

  if (fs.existsSync(srcFile)) {
    fs.copyFileSync(srcFile, destFile);
    count++;
  } else {
    console.error(`Missing source file: ${srcFile}`);
  }
}

console.log(`Successfully copied ${count} REAL WebP frames to public/civicly-city!`);
