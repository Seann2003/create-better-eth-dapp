import path from 'path';
import { fileURLToPath } from 'url';

// Always resolves correctly whether ESM or compiled
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CLI package root (works both locally & globally)
export const ROOT_DIR = path.resolve(__dirname, '../..');

// Templates folder packaged inside CLI
export const TEMPLATE_DIR = path.join(ROOT_DIR, 'templates');

export const CLIENT_TEMPLATES = path.join(TEMPLATE_DIR, 'client');
export const AUTH_TEMPLATES = path.join(TEMPLATE_DIR, 'auth');
export const CONTRACT_TEMPLATES = path.join(TEMPLATE_DIR, 'contract');
export const FRONTEND_TEMPLATES = path.join(TEMPLATE_DIR, 'frontend');
export const UI_TEMPLATES = path.join(TEMPLATE_DIR, 'integration');
