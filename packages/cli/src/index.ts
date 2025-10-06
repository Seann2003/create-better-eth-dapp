import { initTRPC } from "@trpc/server";
import { createCli } from "trpc-cli";
import { z } from "zod";
import {
  ProjectNameSchema,
  AuthSchema,
  ClientSchema,
  ContractSchema,
  IndexerSchema,
} from "./types";

const t = initTRPC.create();

const router = t.router({
  init: t.procedure
    .input(
      z.tuple([
        ProjectNameSchema.optional().default("."),
        z.object({
          auth: AuthSchema.optional(),
          client: ClientSchema.optional(),
          contract: ContractSchema.optional(),
          indexer: IndexerSchema.optional(),
        }),
      ])
    )
    .query(async ({ input }) => {
      const [projectName, options] = input;
      const combinedInput = {
        projectName,
        ...options,
      };
      console.log("Initializing project with options:", combinedInput);
    }),
});

createCli({ router }).run();
