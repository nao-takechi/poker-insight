import {
  OpenAPIRegistry,
  OpenApiGeneratorV3,
  extendZodWithOpenApi,
} from "@asteasolutions/zod-to-openapi";
import fs from "fs";
import yaml from "js-yaml";
import path from "path";
import { z } from "zod";

extendZodWithOpenApi(z);

import { sessionSchema } from "../../shared/schema/sessionSchema";

// レジストリ作成
const registry = new OpenAPIRegistry();

registry.registerPath({
  method: "post",
  path: "/sessions",
  request: {
    body: {
      content: {
        "application/json": {
          schema: sessionSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "OK",
    },
  },
});

const generator = new OpenApiGeneratorV3(registry.definitions);
const doc = generator.generateDocument({
  openapi: "3.0.3",
  info: {
    title: "Poker Insight API",
    version: "1.0.0",
    description: "Poker Insight API documentation",
  },
});

// 👉 ここが重要：YAML に変換
const yamlDoc = yaml.dump(doc);

const outPath = path.resolve(__dirname, "../../backend/openapi.yaml");
fs.writeFileSync(outPath, yamlDoc);

console.log("OpenAPI generated:", outPath);
