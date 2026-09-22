const sharp = require('sharp');
const path = require('path');

async function processLogo() {
  const inputPath = 'C:/Users/Mike Cedrick/.gemini/antigravity-ide/brain/b8fee34e-2f71-4766-93fd-ef386168ca03/.user_uploaded/media_1790050893994.jpg';
  const outputPath = 'd:/GITHUB APPLICATIONS/PAKDEEPAN WEBSITE/apps/web/public/images/pakdeepan-logo.png';
  
  // Create output dir if it doesn't exist
  const fs = require('fs');
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)){
      fs.mkdirSync(dir, { recursive: true });
  }

  try {
    // Trim any pure white background first
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    // The image is 1012x1024, slightly non-square. Let's force it to a square with white padding first.
    const size = Math.max(metadata.width, metadata.height);
    
    // Create a circular SVG mask
    const circleSvg = Buffer.from(
      `<svg width="${size}" height="${size}">
        <circle cx="${size/2}" cy="${size/2}" r="${size/2 - 2}" fill="white" />
      </svg>`
    );

    await image
      .resize(size, size, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      })
      .composite([{
        input: circleSvg,
        blend: 'dest-in'
      }])
      .png()
      .toFile(outputPath);
      
    console.log('Logo processed successfully:', outputPath);
  } catch (error) {
    console.error('Error processing logo:', error);
  }
}

processLogo();
