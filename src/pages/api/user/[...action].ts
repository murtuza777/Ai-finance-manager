import { NextApiRequest, NextApiResponse } from 'next';
import { CloudflareClient } from '@/lib/cloudflare';
import { storageService } from '@/lib/storage';
import formidable from 'formidable';
import { D1Database, KVNamespace } from '@cloudflare/workers-types';
import { readFile } from 'fs/promises';

export const config = {
  api: {
    bodyParser: false,
  },
};

// Define a custom Env type that extends the base Env
interface Env {
  D1_DB: D1Database;
  KV_STORE: KVNamespace;
}

// Extend the NextApiRequest with our custom env
interface CloudflareEnvRequest extends Omit<NextApiRequest, 'env'> {
  env?: Env;
}

export default async function handler(req: CloudflareEnvRequest, res: NextApiResponse) {
  // Check if Cloudflare is enabled
  if (!req.headers['x-cloudflare-enabled']) {
    // If running locally or without Cloudflare, mock the functionality
    console.log('Running without Cloudflare bindings - mocking functionality');
    return handleMockRequest(req, res); 
  }

  const { action } = req.query;
  
  if (!req.env) {
    return res.status(500).json({ error: 'Cloudflare environment not configured' });
  }

  const cloudflare = new CloudflareClient(req.env);

  try {
    switch (action) {
      case 'profile':
        if (req.method === 'GET') {
          const userData = await cloudflare.getUserData(req.query.userId as string);
          return res.status(200).json(userData);
        }
        if (req.method === 'POST') {
          const { userId, email } = req.body;
          await cloudflare.createUserProfile(userId, email);
          return res.status(200).json({ success: true });
        }
        break;

      case 'preferences':
        if (req.method === 'GET') {
          const prefs = await cloudflare.getUserPreferences(req.query.userId as string);
          return res.status(200).json(prefs);
        }
        if (req.method === 'POST') {
          await cloudflare.cacheUserPreferences(req.query.userId as string, req.body);
          return res.status(200).json({ success: true });
        }
        break;

      case 'upload':
        if (req.method === 'POST') {
          const form = formidable();
          const [fields, files] = await form.parse(req);
          const file = files.file?.[0];

          if (!file) {
            return res.status(400).json({ error: 'No file uploaded' });
          }

          const buffer = await readFile(file.filepath);
          const result = await storageService.uploadFile(
            req.query.userId as string,
            new File([buffer], file.originalFilename || 'unnamed', {
              type: file.mimetype || 'application/octet-stream',
            })
          );

          return res.status(200).json(result);
        }
        break;

      default:
        return res.status(404).json({ error: 'Action not found' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// Mock handler for local development
async function handleMockRequest(req: CloudflareEnvRequest, res: NextApiResponse) {
  const { action } = req.query;

  switch (action) {
    case 'profile':
      if (req.method === 'POST') {
        // Mock creating a user profile
        return res.status(200).json({ success: true });
      }
      if (req.method === 'GET') {
        // Mock user data
        return res.status(200).json({
          id: req.query.userId,
          email: 'mock@example.com',
          created_at: new Date().toISOString(),
        });
      }
      break;

    case 'upload':
      if (req.method === 'POST') {
        // Handle file upload directly to Firebase Storage
        const form = formidable();
        const [fields, files] = await form.parse(req);
        const file = files.file?.[0];

        if (!file) {
          return res.status(400).json({ error: 'No file uploaded' });
        }

        const buffer = await readFile(file.filepath);
        const result = await storageService.uploadFile(
          req.query.userId as string,
          new File([buffer], file.originalFilename || 'unnamed', {
            type: file.mimetype || 'application/octet-stream',
          })
        );

        return res.status(200).json(result);
      }
      break;

    default:
      return res.status(404).json({ error: 'Action not found' });
  }
} 