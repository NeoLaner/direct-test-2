/**
 * oRPC Server-Side Setup
 * This file is imported on the server to set up globalThis.$client
 */

import "server-only";

import { isDefinedError, type ORPCError, onError } from "@orpc/client";
import { createRouterClient } from "@workspace/rpc-server";
import form from "next/form";
import { notFound } from "next/navigation";
import { router } from "./router";

// Create server-side router client
// Context will be called internally by oRPC when needed
// to create unique context per request
export const api = createRouterClient(router);
