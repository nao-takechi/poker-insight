import {
  OpenAPIRegistry,
  OpenApiGeneratorV3,
  extendZodWithOpenApi,
} from "@asteasolutions/zod-to-openapi";
import fs from "fs";
import yaml from "js-yaml";
import path from "path";
import { z } from "zod";

// Zod 拡張実行
extendZodWithOpenApi(z);

import {
  sessionInputSchema,
  sessionResponseSchema,
} from "../../shared/schema/api/sessionApiSchema";

const registerSchema = (
  registry: OpenAPIRegistry,
  name: string,
  schema: z.ZodTypeAny
) => registry.register(name, schema);

const registry = new OpenAPIRegistry();

// components.schemas
const SessionInputRef = registerSchema(
  registry,
  "SessionInput",
  sessionInputSchema
);
const SessionResponseRef = registerSchema(
  registry,
  "SessionResponse",
  sessionResponseSchema
);
const SessionListRef = registerSchema(
  registry,
  "SessionList",
  z.array(sessionResponseSchema)
);

// Path definitions
registry.registerPath({
  method: "post",
  path: "/sessions",
  request: {
    body: {
      content: {
        "application/json": {
          schema: SessionInputRef,
        },
      },
    },
  },
  responses: {
    201: {
      description: "Created",
      content: {
        "application/json": {
          schema: SessionResponseRef,
        },
      },
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/sessions",
  responses: {
    200: {
      description: "List of sessions",
      content: {
        "application/json": {
          schema: SessionListRef,
        },
      },
    },
  },
});

// YAML 生成ヘルパー
const generateOpenApiYaml = () => {
  const generator = new OpenApiGeneratorV3(registry.definitions);
  const doc = generator.generateDocument({
    openapi: "3.0.3",
    info: {
      title: "Poker Insight API",
      version: "1.0.0",
      description: "Poker Insight API documentation",
    },
  });

  const yamlDoc = yaml.dump(doc);
  const outPath = path.resolve(__dirname, "../../backend/openapi.yaml");
  fs.writeFileSync(outPath, yamlDoc);

  console.log("OpenAPI generated:", outPath);
};

generateOpenApiYaml();
