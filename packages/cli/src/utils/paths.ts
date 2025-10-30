import path from 'path';
import { fileURLToPath } from 'url';

// Resolve current file location
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const ROOT_DIR = path.resolve(__dirname, '../../');

export const TEMPLATE_DIR = path.join(ROOT_DIR, 'templates');

// optional helpers for clarity
export const CLIENT_TEMPLATES = path.join(TEMPLATE_DIR, 'client');
export const AUTH_TEMPLATES = path.join(TEMPLATE_DIR, 'auth');
export const CONTRACT_TEMPLATES = path.join(TEMPLATE_DIR, 'contract');
export const FRONTEND_TEMPLATES = path.join(TEMPLATE_DIR, 'frontend');
export const UI_TEMPLATES = path.join(TEMPLATE_DIR, 'integration');
