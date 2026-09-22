import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const outDir = path.resolve("assets/release");
fs.mkdirSync(outDir, { recursive: true });

const masterSvg = `
<svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#2C9AE8"/>
      <stop offset="100%" stop-color="#0759A8"/>
    </linearGradient>
    <linearGradient id="eq" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#9BCB65"/>
      <stop offset="100%" stop-color="#6A9A3D"/>
    </linearGradient>
  </defs>
  <rect width="1024" height="1024" rx="210" fill="url(#bg)"/>
  <rect x="220" y="150" width="584" height="724" rx="116" fill="#F8FBFD"/>
  <rect x="300" y="230" width="424" height="150" rx="45" fill="#0B639F"/>
  <rect x="300" y="448" width="170" height="150" rx="46" fill="#EAF2F7"/>
  <rect x="554" y="448" width="170" height="150" rx="46" fill="#EAF2F7"/>
  <rect x="300" y="650" width="170" height="150" rx="46" fill="#EAF2F7"/>
  <rect x="554" y="650" width="170" height="150" rx="46" fill="url(#eq)"/>
  <rect x="346" y="503" width="78" height="14" rx="7" fill="#155E9B"/>
  <rect x="378" y="471" width="14" height="78" rx="7" fill="#155E9B"/>
  <rect x="600" y="503" width="78" height="14" rx="7" fill="#155E9B"/>
  <path d="M345 694 L425 774 M425 694 L345 774" stroke="#155E9B" stroke-width="15" stroke-linecap="round"/>
  <rect x="600" y="704" width="78" height="14" rx="7" fill="#FFFFFF"/>
  <rect x="600" y="739" width="78" height="14" rx="7" fill="#FFFFFF"/>
  <circle cx="372" cy="305" r="15" fill="#FFFFFF"/>
  <circle cx="438" cy="305" r="15" fill="#FFFFFF"/>
  <circle cx="504" cy="305" r="15" fill="#FFFFFF"/>
  <rect x="570" y="293" width="88" height="24" rx="12" fill="#FFFFFF"/>
</svg>`;

const foregroundSvg = `
<svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="eq" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#9BCB65"/>
      <stop offset="100%" stop-color="#6A9A3D"/>
    </linearGradient>
  </defs>
  <rect x="245" y="135" width="534" height="754" rx="118" fill="#F8FBFD"/>
  <rect x="315" y="230" width="394" height="145" rx="42" fill="#0B639F"/>
  <rect x="315" y="455" width="158" height="145" rx="44" fill="#EAF2F7"/>
  <rect x="551" y="455" width="158" height="145" rx="44" fill="#EAF2F7"/>
  <rect x="315" y="660" width="158" height="145" rx="44" fill="#EAF2F7"/>
  <rect x="551" y="660" width="158" height="145" rx="44" fill="url(#eq)"/>
  <rect x="356" y="508" width="76" height="14" rx="7" fill="#155E9B"/>
  <rect x="387" y="477" width="14" height="76" rx="7" fill="#155E9B"/>
  <rect x="592" y="508" width="76" height="14" rx="7" fill="#155E9B"/>
  <path d="M356 702 L432 778 M432 702 L356 778" stroke="#155E9B" stroke-width="15" stroke-linecap="round"/>
  <rect x="592" y="714" width="76" height="14" rx="7" fill="#FFFFFF"/>
  <rect x="592" y="748" width="76" height="14" rx="7" fill="#FFFFFF"/>
  <circle cx="386" cy="302" r="14" fill="#FFFFFF"/>
  <circle cx="448" cy="302" r="14" fill="#FFFFFF"/>
  <circle cx="510" cy="302" r="14" fill="#FFFFFF"/>
  <rect x="570" y="291" width="75" height="22" rx="11" fill="#FFFFFF"/>
</svg>`;

const monochromeSvg = `
<svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
  <rect x="245" y="135" width="534" height="754" rx="118" fill="#000000"/>
  <rect x="315" y="230" width="394" height="145" rx="42" fill="#FFFFFF"/>
  <rect x="315" y="455" width="158" height="145" rx="44" fill="#FFFFFF"/>
  <rect x="551" y="455" width="158" height="145" rx="44" fill="#FFFFFF"/>
  <rect x="315" y="660" width="158" height="145" rx="44" fill="#FFFFFF"/>
  <rect x="551" y="660" width="158" height="145" rx="44" fill="#FFFFFF"/>
  <rect x="356" y="508" width="76" height="14" rx="7" fill="#000000"/>
  <rect x="387" y="477" width="14" height="76" rx="7" fill="#000000"/>
  <rect x="592" y="508" width="76" height="14" rx="7" fill="#000000"/>
  <path d="M356 702 L432 778 M432 702 L356 778" stroke="#000000" stroke-width="15" stroke-linecap="round"/>
  <rect x="592" y="714" width="76" height="14" rx="7" fill="#000000"/>
  <rect x="592" y="748" width="76" height="14" rx="7" fill="#000000"/>
</svg>`;

await sharp(Buffer.from(masterSvg)).png().toFile(path.join(outDir, "icon.png"));
await sharp(Buffer.from(foregroundSvg)).png().toFile(path.join(outDir, "adaptive-foreground.png"));
await sharp(Buffer.from(monochromeSvg)).png().toFile(path.join(outDir, "adaptive-monochrome.png"));
await sharp(Buffer.from(foregroundSvg)).png().toFile(path.join(outDir, "splash-icon.png"));

console.log("Generated Google Play release assets in assets/release/");
