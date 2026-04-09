import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { createHash, randomBytes } from 'node:crypto';

const browserDistFolder = join(import.meta.dirname, '../browser');
const dataDir = import.meta.dirname;

const app = express();
const angularApp = new AngularNodeAppEngine();

const messagesFile = join(dataDir, 'messages.json');
const usersFile = join(dataDir, 'users.json');
const sessionsFile = join(dataDir, 'sessions.json');
const contentFile = join(dataDir, 'content.json');

mkdirSync(dataDir, { recursive: true });

app.use(express.json());

// --- Auth helpers ---

interface User { username: string; passwordHash: string; }
interface Session { token: string; username: string; createdAt: string; }

function readJson<T>(file: string, fallback: T): T {
  return existsSync(file) ? JSON.parse(readFileSync(file, 'utf-8')) : fallback;
}

function writeJson(file: string, data: unknown): void {
  writeFileSync(file, JSON.stringify(data, null, 2));
}

function hashPassword(password: string): string {
  return createHash('sha256').update(password).digest('hex');
}

function requireAuth(req: express.Request, res: express.Response, next: express.NextFunction): void {
  const token = req.headers['authorization']?.replace('Bearer ', '');
  if (!token) { res.status(401).json({ error: 'Unauthorized' }); return; }
  const sessions = readJson<Session[]>(sessionsFile, []);
  if (!sessions.find(s => s.token === token)) { res.status(401).json({ error: 'Invalid session' }); return; }
  next();
}

// --- Auth endpoints ---

app.post('/api/auth/register', (req, res) => {
  const { username, password } = req.body ?? {};
  if (!username || !password) { res.status(400).json({ error: 'username and password are required' }); return; }

  const users = readJson<User[]>(usersFile, []);
  if (users.find(u => u.username === username)) { res.status(409).json({ error: 'Username already exists' }); return; }

  users.push({ username, passwordHash: hashPassword(password) });
  writeJson(usersFile, users);
  res.status(201).json({ success: true });
});

app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body ?? {};
  if (!username || !password) { res.status(400).json({ error: 'username and password are required' }); return; }

  const users = readJson<User[]>(usersFile, []);
  const user = users.find(u => u.username === username && u.passwordHash === hashPassword(password));
  if (!user) { res.status(401).json({ error: 'Invalid credentials' }); return; }

  const token = randomBytes(32).toString('hex');
  const sessions = readJson<Session[]>(sessionsFile, []);
  sessions.push({ token, username, createdAt: new Date().toISOString() });
  writeJson(sessionsFile, sessions);
  res.json({ token, username });
});

app.post('/api/auth/logout', requireAuth, (req, res) => {
  const token = req.headers['authorization']?.replace('Bearer ', '');
  const sessions = readJson<Session[]>(sessionsFile, []);
  writeJson(sessionsFile, sessions.filter(s => s.token !== token));
  res.json({ success: true });
});

app.get('/api/auth/me', requireAuth, (req, res) => {
  const token = req.headers['authorization']?.replace('Bearer ', '');
  const sessions = readJson<Session[]>(sessionsFile, []);
  const session = sessions.find(s => s.token === token);
  res.json({ username: session?.username });
});

// --- Contact endpoint ---

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body ?? {};

  if (!name || !email || !message) {
    res.status(400).json({ error: 'name, email and message are required' });
    return;
  }

  const messages: unknown[] = existsSync(messagesFile)
    ? JSON.parse(readFileSync(messagesFile, 'utf-8'))
    : [];

  messages.push({ name, email, message, receivedAt: new Date().toISOString() });
  writeFileSync(messagesFile, JSON.stringify(messages, null, 2));

  res.status(201).json({ success: true });
});

app.get('/api/messages', requireAuth, (_req, res) => {
  const messages = readJson<unknown[]>(messagesFile, []);
  res.json(messages.reverse());
});

// --- Content endpoints ---

app.get('/api/content', (_req, res) => {
  res.json(readJson<unknown>(contentFile, null));
});

app.put('/api/content', requireAuth, (req, res) => {
  if (!req.body || typeof req.body !== 'object') {
    res.status(400).json({ error: 'Invalid body' });
    return;
  }
  writeJson(contentFile, req.body);
  res.json({ success: true });
});

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
