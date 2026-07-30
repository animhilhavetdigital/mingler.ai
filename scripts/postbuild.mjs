import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const distClient = path.join(root, "dist/client");
const distAssets = path.join(distClient, "assets");

async function copyFontsRecursive(src, dest) {
  try {
    await fs.mkdir(dest, { recursive: true });
    const entries = await fs.readdir(src, { withFileTypes: true });
    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);
      if (entry.isDirectory()) {
        await copyFontsRecursive(srcPath, destPath);
      } else if (entry.isFile()) {
        await fs.copyFile(srcPath, destPath);
      }
    }
  } catch (e) {
    console.warn("Font copy note:", e.message);
  }
}

async function main() {
  await fs.mkdir(distClient, { recursive: true });

  // Copy .vinext/fonts into dist/client/assets/fonts AND dist/client/assets/_vinext_fonts
  const fontsSource = path.join(root, ".vinext/fonts");
  await copyFontsRecursive(fontsSource, path.join(distAssets, "fonts"));
  await copyFontsRecursive(fontsSource, path.join(distAssets, "_vinext_fonts"));

  const prerenderPath = path.join(root, "prerender.html");
  let html = "";
  try {
    html = await fs.readFile(prerenderPath, "utf-8");
  } catch (err) {
    console.error("prerender.html not found:", err);
    process.exit(1);
  }

  // Read generated files in dist/client/assets to resolve dynamic hashes if needed
  let assetFiles = [];
  try {
    assetFiles = await fs.readdir(distAssets);
  } catch (e) {}

  const findAsset = (prefix, ext) => assetFiles.find(f => f.startsWith(prefix) && f.endsWith(ext));

  const actualCss = findAsset("index-", ".css");
  if (actualCss) {
    html = html.replace(/\/assets\/index-[A-Za-z0-9_-]+\.css/g, `/assets/${actualCss}`);
  }

  const actualJs = findAsset("index-", ".js");
  if (actualJs) {
    html = html.replace(/\/assets\/index-[A-Za-z0-9_-]+\.js/g, `/assets/${actualJs}`);
  }

  const actualFramework = findAsset("framework-", ".js");
  if (actualFramework) {
    html = html.replace(/\/assets\/framework-[A-Za-z0-9_-]+\.js/g, `/assets/${actualFramework}`);
  }

  const actualPage = findAsset("page-", ".js");
  if (actualPage) {
    html = html.replace(/\/assets\/page-[A-Za-z0-9_-]+\.js/g, `/assets/${actualPage}`);
  }

  const actualLayout = findAsset("layout-segment-context-", ".js");
  if (actualLayout) {
    html = html.replace(/\/assets\/layout-segment-context-[A-Za-z0-9_-]+\.js/g, `/assets/${actualLayout}`);
  }

  const actualRolldown = findAsset("rolldown-runtime-", ".js");
  if (actualRolldown) {
    html = html.replace(/\/assets\/rolldown-runtime-[A-Za-z0-9_-]+\.js/g, `/assets/${actualRolldown}`);
  }

  // Rewrite font url paths (absolute Windows/macOS or relative) to relative web paths
  html = html.replace(
    /src:\s*url\([^)]*?[\\/]([a-zA-Z0-9_-]+\.woff2)\)\s*format\('woff2'\)/g,
    "src: url(/assets/fonts/$1) format('woff2')"
  );

  // Fix any remaining local dev origins
  html = html.replace(/http:\/\/localhost:3000/g, "");

  // Write index.html into dist/client
  const indexPath = path.join(distClient, "index.html");
  await fs.writeFile(indexPath, html, "utf-8");

  console.log("✓ Successfully generated dist/client/index.html");
}

main().catch((err) => {
  console.error("Postbuild error:", err);
  process.exit(1);
});
