import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const outDir = path.resolve("assets/release");
fs.mkdirSync(outDir, { recursive: true });

const masterSvg = `
<svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#9ABB69"/>
      <stop offset="48%" stop-color="#789C49"/>
      <stop offset="100%" stop-color="#5F7F38"/>
    </linearGradient>
    <linearGradient id="tl" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#A9C97C"/>
      <stop offset="100%" stop-color="#86AA57"/>
    </linearGradient>
    <linearGradient id="tr" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#91B660"/>
      <stop offset="100%" stop-color="#6F9344"/>
    </linearGradient>
    <linearGradient id="bl" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#86AA57"/>
      <stop offset="100%" stop-color="#6B8D42"/>
    </linearGradient>
    <linearGradient id="br" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#789C49"/>
      <stop offset="100%" stop-color="#5C7B36"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="12" stdDeviation="14" flood-color="#2F4C1F" flood-opacity="0.28"/>
    </filter>
  </defs>

  <rect x="64" y="64" width="896" height="896" rx="214" fill="url(#bg)"/>
  <path d="M64 278 Q64 64 278 64 H512 V512 H64 Z" fill="url(#tl)"/>
  <path d="M512 64 H746 Q960 64 960 278 V512 H512 Z" fill="url(#tr)"/>
  <path d="M64 512 H512 V960 H278 Q64 960 64 746 Z" fill="url(#bl)"/>
  <path d="M512 512 H960 V746 Q960 960 746 960 H512 Z" fill="url(#br)"/>

  <rect x="501" y="122" width="22" height="780" rx="11" fill="#FFFFFF" opacity="0.08"/>
  <rect x="122" y="501" width="780" height="22" rx="11" fill="#FFFFFF" opacity="0.08"/>

  <g fill="#FFFFFF" filter="url(#shadow)">
    <rect x="238" y="281" width="202" height="34" rx="17"/>
    <rect x="322" y="197" width="34" height="202" rx="17"/>

    <rect x="586" y="281" width="202" height="34" rx="17"/>

    <g transform="translate(339 685) rotate(45)">
      <rect x="-17" y="-112" width="34" height="224" rx="17"/>
      <rect x="-112" y="-17" width="224" height="34" rx="17"/>
    </g>

    <rect x="586" y="668" width="202" height="34" rx="17"/>
    <circle cx="687" cy="594" r="22"/>
    <circle cx="687" cy="776" r="22"/>
  </g>

  <path d="M160 144 C300 96 452 110 560 156" stroke="#FFFFFF" stroke-width="18" stroke-linecap="round" opacity="0.14"/>
</svg>`;

const foregroundSvg = `
<svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
  <g fill="#FFFFFF">
    <rect x="250" y="298" width="180" height="30" rx="15"/>
    <rect x="325" y="223" width="30" height="180" rx="15"/>

    <rect x="594" y="298" width="180" height="30" rx="15"/>

    <g transform="translate(340 688) rotate(45)">
      <rect x="-15" y="-100" width="30" height="200" rx="15"/>
      <rect x="-100" y="-15" width="200" height="30" rx="15"/>
    </g>

    <rect x="594" y="674" width="180" height="30" rx="15"/>
    <circle cx="684" cy="610" r="20"/>
    <circle cx="684" cy="768" r="20"/>
  </g>
</svg>`;

const monochromeSvg = `
<svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
  <g fill="#000000">
    <rect x="250" y="298" width="180" height="30" rx="15"/>
    <rect x="325" y="223" width="30" height="180" rx="15"/>
    <rect x="594" y="298" width="180" height="30" rx="15"/>
    <g transform="translate(340 688) rotate(45)">
      <rect x="-15" y="-100" width="30" height="200" rx="15"/>
      <rect x="-100" y="-15" width="200" height="30" rx="15"/>
    </g>
    <rect x="594" y="674" width="180" height="30" rx="15"/>
    <circle cx="684" cy="610" r="20"/>
    <circle cx="684" cy="768" r="20"/>
  </g>
</svg>`;

await sharp(Buffer.from(masterSvg)).png().toFile(path.join(outDir, "icon.png"));
await sharp(Buffer.from(masterSvg)).resize(512, 512).png().toFile(path.join(outDir, "play-store-icon.png"));
await sharp(Buffer.from(foregroundSvg)).png().toFile(path.join(outDir, "adaptive-foreground.png"));
await sharp(Buffer.from(monochromeSvg)).png().toFile(path.join(outDir, "adaptive-monochrome.png"));
await sharp(Buffer.from(masterSvg)).resize(512, 512).png().toFile(path.join(outDir, "splash-icon.png"));

const featureGraphicSvg = `
<svg width="1024" height="500" viewBox="0 0 1024 500" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="featureBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#9ABB69"/>
      <stop offset="50%" stop-color="#789C49"/>
      <stop offset="100%" stop-color="#506C31"/>
    </linearGradient>
  </defs>
  <rect width="1024" height="500" fill="url(#featureBg)"/>
  <circle cx="860" cy="70" r="210" fill="#FFFFFF" opacity="0.06"/>
  <circle cx="140" cy="470" r="220" fill="#FFFFFF" opacity="0.05"/>

  <g transform="translate(362 100) scale(0.293)">
    <rect x="64" y="64" width="896" height="896" rx="214" fill="#789C49"/>
    <g fill="#FFFFFF">
      <rect x="238" y="281" width="202" height="34" rx="17"/>
      <rect x="322" y="197" width="34" height="202" rx="17"/>
      <rect x="586" y="281" width="202" height="34" rx="17"/>
      <g transform="translate(339 685) rotate(45)">
        <rect x="-17" y="-112" width="34" height="224" rx="17"/>
        <rect x="-112" y="-17" width="224" height="34" rx="17"/>
      </g>
      <rect x="586" y="668" width="202" height="34" rx="17"/>
      <circle cx="687" cy="594" r="22"/>
      <circle cx="687" cy="776" r="22"/>
    </g>
  </g>
</svg>`;

await sharp(Buffer.from(featureGraphicSvg)).png().toFile(path.join(outDir, "play-feature-graphic.png"));

console.log("Generated green calculator release assets in assets/release/");
