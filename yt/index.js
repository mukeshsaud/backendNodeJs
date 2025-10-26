const ytdl =require ('@distube/ytdl-core');
const fs =require ('fs');

const url = 'https://youtu.be/YFkeOBqfQBw?si=ODO9RoHPHvV6aYn_';
const output = 'de.mp4';

ytdl(url, { quality: 'highestvideo' })
  .pipe(fs.createWriteStream(output))
  .on('finish', () => console.log('✅ Download complete:', output))
  .on('error', err => console.error('❌ Error:', err));
