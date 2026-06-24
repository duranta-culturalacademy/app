import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Dynamic image proxy endpoint for TeraBox links
  app.get("/api/proxy-image", async (req, res) => {
    const url = req.query.url as string;
    if (!url) {
      return res.status(400).send("Missing url parameter");
    }

    try {
      const pageRes = await fetch(url);
      const text = await pageRes.text();

      const startKey = 'https://dm-data.';
      const startIdx = text.indexOf(startKey);
      if (startIdx !== -1) {
        let endIdx = text.indexOf('"', startIdx);
        const endIdxSingle = text.indexOf("'", startIdx);
        if (endIdxSingle !== -1 && (endIdx === -1 || endIdxSingle < endIdx)) {
          endIdx = endIdxSingle;
        }

        if (endIdx !== -1) {
          const rawUrl = text.substring(startIdx, endIdx);
          const imgUrl = rawUrl.replace(/&amp;/g, '&');

          const imgRes = await fetch(imgUrl, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
              'Referer': 'https://1024terabox.com/'
            }
          });

          if (imgRes.status === 200) {
            res.setHeader('Content-Type', 'image/jpeg');
            res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache for 24 hours
            const arrayBuffer = await imgRes.arrayBuffer();
            return res.send(Buffer.from(arrayBuffer));
          } else {
            return res.status(imgRes.status).send(`Failed to fetch thumbnail: ${imgRes.status}`);
          }
        }
      }
      return res.status(404).send("Thumbnail URL not found in page");
    } catch (error: any) {
      console.error("Proxy error:", error);
      return res.status(500).send(`Server error: ${error.message}`);
    }
  });

  // API health route
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Vite middleware for development or static file serving for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: false },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
