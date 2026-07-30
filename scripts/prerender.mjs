import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const distClient = path.join(root, "dist/client");
const fontsSource = path.join(root, ".vinext/fonts");
const fontsDest = path.join(distClient, "assets/fonts");

async function waitForServer() {
  for (let i = 0; i < 40; i++) {
    try {
      const res = await fetch("http://127.0.0.1:3000/");
      if (res.ok) return res;
    } catch {
      // not ready yet
    }
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error("Server did not start on http://127.0.0.1:3000/");
}

async function copyFontsRecursive(src, dest) {
  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });
  await Promise.all(
    entries.map(async (entry) => {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);
      if (entry.isDirectory()) {
        await copyFontsRecursive(srcPath, destPath);
      } else if (entry.isFile()) {
        await fs.copyFile(srcPath, destPath);
      }
    }),
  );
}

async function prerender() {
  const server = spawn("npm", ["start"], {
    cwd: root,
    shell: true,
    stdio: ["ignore", "pipe", "pipe"],
    env: {
      ...process.env,
      WRANGLER_LOG_PATH: ".wrangler/wrangler.log",
    },
  });

  let serverOutput = "";
  server.stdout.on("data", (d) => {
    serverOutput += d.toString();
    process.stdout.write(d);
  });
  server.stderr.on("data", (d) => {
    process.stderr.write(d);
  });

  try {
    const res = await waitForServer();
    let html = await res.text();

    await copyFontsRecursive(fontsSource, fontsDest);

    // Rewrite absolute/local font paths to relative web paths.
    html = html.replace(
      /src:\s*url\([^)]*\.vinext\/fonts\/([^)]+)\)\s*format\('woff2'\)/g,
      "src: url(/assets/fonts/$1) format('woff2')",
    );

    await fs.writeFile(path.join(distClient, "index.html"), html);
    console.log("\n✓ Prerendered dist/client/index.html");
  } finally {
    server.kill();
  }
}

prerender().catch((err) => {
  console.error(err);
  process.exit(1);
});
