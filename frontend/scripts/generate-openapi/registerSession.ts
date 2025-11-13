// frontend/scripts/generate-openapi/registerSession.ts

import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import {
  sessionInputSchema,
  sessionResponseSchema,
} from "../../../shared/schema/api/sessionApiSchema";

export const registerSessionApi = (registry: OpenAPIRegistry) => {
  // -----------------------------
  // components.schemas に登録
  // -----------------------------
  const SessionInputRef = registry.register("SessionInput", sessionInputSchema);

  const SessionResponseRef = registry.register(
    "SessionResponse",
    sessionResponseSchema
  );

  // ★ これが重要：SessionResponseRef を使って array を作る
  const SessionListRef = registry.register(
    "SessionList",
    z.array(SessionResponseRef) // ← これで $ref が生成される
  );

  // -----------------------------
  // POST /sessions
  // -----------------------------
  registry.registerPath({
    method: "post",
    path: "/sessions",
    request: {
      body: {
        content: {
          "application/json": { schema: SessionInputRef },
        },
      },
    },
    responses: {
      201: {
        description: "Created session",
        content: {
          "application/json": { schema: SessionResponseRef },
        },
      },
    },
  });

  // -----------------------------
  // GET /sessions
  // -----------------------------
  registry.registerPath({
    method: "get",
    path: "/sessions",
    responses: {
      200: {
        description: "List of sessions",
        content: {
          "application/json": { schema: SessionListRef },
        },
      },
    },
  });
};
