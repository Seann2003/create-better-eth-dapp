import { z } from 'zod';

export const ProjectNameSchema = z
  .string()
  .min(1, { message: 'Project name must be at least 1 character long' })
  .max(100, { message: 'Project name must be at most 255 characters long' })
  .regex(/^[a-zA-Z0-9-_]+$/, {
    message:
      'Project name can only contain letters, numbers, hyphens, and underscores',
  })
  .refine(
    (name) => name === '.' || !name.startsWith('.'),
    "Project name cannot start with a dot (except for '.')"
  )
  .refine(
    (name) => name === '-' || !name.startsWith('-'),
    'Project name cannot start with a dash'
  )
  .refine(
    (name) => name === '_' || !name.startsWith('_'),
    'Project name cannot start with an underscore'
  )
  .refine(
    (name) => ['node_modules', 'favicon.ico', 'README.md'].indexOf(name) === -1,
    'Project name cannot be node_modules, favicon.ico, or README.md'
  );

export type ProjectName = z.infer<typeof ProjectNameSchema>;
