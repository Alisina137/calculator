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

  <clipPath id="iconClip">
    <rect x="72" y="72" width="880" height="880" rx="150"/>
  </clipPath>
  <g clip-path="url(#iconClip)">
    <rect x="72" y="72" width="880" height="880" fill="url(#bg)"/>
    <rect x="72" y="72" width="440" height="440" fill="url(#tl)"/>
    <rect x="512" y="72" width="440" height="440" fill="url(#tr)"/>
    <rect x="72" y="512" width="440" height="440" fill="url(#bl)"/>
    <rect x="512" y="512" width="440" height="440" fill="url(#br)"/>
  </g>

  <rect x="501" y="122" width="22" height="780" rx="11" fill="#FFFFFF" opacity="0.08"/>
  <rect x="122" y="501" width="780" height="22" rx="11" fill="#FFFFFF" opacity="0.08"/>

  <g fill="#FFFFFF" filter="url(#shadow)">
    <rect x="315" y="368" width="170" height="30" rx="15"/>
    <rect x="385" y="298" width="30" height="170" rx="15"/>

    <rect x="539" y="368" width="170" height="30" rx="15"/>

    <g transform="translate(400 624) rotate(45)">
      <rect x="-15" y="-92" width="30" height="184" rx="15"/>
      <rect x="-92" y="-15" width="184" height="30" rx="15"/>
    </g>

    <rect x="539" y="609" width="170" height="30" rx="15"/>
    <circle cx="624" cy="555" r="19"/>
    <circle cx="624" cy="693" r="19"/>
  </g>

  <path d="M160 144 C300 96 452 110 560 156" stroke="#FFFFFF" stroke-width="18" stroke-linecap="round" opacity="0.14"/>
</svg>`;

const foregroundSvg = masterSvg;\n\nconst monochromeSvg = `
<svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
  <g fill="#000000">
    <rect x="320" y="380" width="160" height="28" rx="14"/>
    <rect x="386" y="314" width="28" height="160" rx="14"/>
    <rect x="544" y="380" width="160" height="28" rx="14"/>
    <g transform="translate(400 624) rotate(45)">
      <rect x="-14" y="-86" width="28" height="172" rx="14"/>
      <rect x="-86" y="-14" width="172" height="28" rx="14"/>
    </g>
    <rect x="544" y="612" width="160" height="28" rx="14"/>
    <circle cx="624" cy="558" r="18"/>
    <circle cx="624" cy="690" r="18"/>
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
    <rect x="72" y="72" width="880" height="880" rx="150" fill="#789C49"/>
    <g fill="#FFFFFF">
      <rect x="315" y="368" width="170" height="30" rx="15"/>
      <rect x="385" y="298" width="30" height="170" rx="15"/>
      <rect x="539" y="368" width="170" height="30" rx="15"/>
      <g transform="translate(400 624) rotate(45)">
        <rect x="-15" y="-92" width="30" height="184" rx="15"/>
        <rect x="-92" y="-15" width="184" height="30" rx="15"/>
      </g>
      <rect x="539" y="609" width="170" height="30" rx="15"/>
      <circle cx="624" cy="555" r="19"/>
      <circle cx="624" cy="693" r="19"/>
    </g>
  </g>
</svg>`;

await sharp(Buffer.from(featureGraphicSvg)).png().toFile(path.join(outDir, "play-feature-graphic.png"));

console.log("Generated green calculator release assets in assets/release/");
