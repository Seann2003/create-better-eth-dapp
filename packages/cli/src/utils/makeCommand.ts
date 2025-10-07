import z from 'zod';

export function makeCommand<T extends z.ZodTypeAny>(
  input: T,
  resolve: (ctx: { input: z.infer<T> }) => Promise<void>
) {
  return { input, resolve };
}
