import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { rolldown } from "rolldown";

const root = fileURLToPath(new URL("..", import.meta.url));
const bundle = await rolldown({
  input: path.join(root, "gallery.js"),
  platform: "browser",
  moduleTypes: { ".css": "text" },
});

try {
  await bundle.write({
    format: "esm",
    file: path.join(root, "gallery.bundle.js"),
    minify: true,
  });
} finally {
  await bundle.close();
}
