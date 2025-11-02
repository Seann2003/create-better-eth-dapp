import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

/**
 * Resolve __dirname and __filename safely for both ESM and CJS builds.
 * Works after tsup bundling (which strips import.meta).
 */
function getDirname(importMeta?: ImportMeta) {
  try {
    if (importMeta?.url) {
      const __filename = fileURLToPath(importMeta.url);
      const __dirname = path.dirname(__filename);
      return { __filename, __dirname };
    }
  } catch {
    // ignore
  }

  // Fallback for CJS builds (tsup, Bun, etc.)
  const __dirname = path.resolve(process.cwd(), 'dist');
  const __filename = path.join(__dirname, 'index.js');
  return { __filename, __dirname };
}

const { __filename, __dirname } = getDirname(
  typeof import.meta !== 'undefined' ? import.meta : undefined
);

let ROOT_DIR: string;

// Detect if running from src (dev) or dist (built)
if (fs.existsSync(path.join(__dirname, '../templates'))) {
  // running from src
  ROOT_DIR = path.resolve(__dirname, '..');
} else if (fs.existsSync(path.join(__dirname, '../../templates'))) {
  // running from dist
  ROOT_DIR = path.resolve(__dirname, '../..');
} else {
  // fallback to CLI root
  ROOT_DIR = process.cwd();
}
export const TEMPLATE_DIR = path.join(ROOT_DIR, 'templates');

// optional helpers
export const CLIENT_TEMPLATES = path.join(TEMPLATE_DIR, 'client');
export const AUTH_TEMPLATES = path.join(TEMPLATE_DIR, 'auth');
export const CONTRACT_TEMPLATES = path.join(TEMPLATE_DIR, 'contract');
export const FRONTEND_TEMPLATES = path.join(TEMPLATE_DIR, 'frontend');
export const UI_TEMPLATES = path.join(TEMPLATE_DIR, 'integration');
