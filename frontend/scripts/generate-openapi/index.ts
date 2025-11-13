import {
  OpenAPIRegistry,
  OpenApiGeneratorV3,
  extendZodWithOpenApi,
} from "@asteasolutions/zod-to-openapi";
import fs from "fs";
import yaml from "js-yaml";
import path from "path";
import { fileURLToPath } from "url";
import { z } from "zod";

import { registerSessionApi } from "./registerSession";

extendZodWithOpenApi(z);

// ESModule環境でも __dirname を使えるようにする
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const registry = new OpenAPIRegistry();
registerSessionApi(registry);

const generator = new OpenApiGeneratorV3(registry.definitions);

const doc = generator.generateDocument({
  openapi: "3.0.3",
  info: {
    title: "Poker Insight API",
    version: "1.0.0",
    description: "Generated from Zod schemas",
  },
});

// openapi.yaml生成
const outPath = path.resolve(__dirname, "../../../backend/openapi.yaml");
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, yaml.dump(doc));
