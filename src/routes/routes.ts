import { IncomingMessage, ServerResponse } from 'http';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../handlers/usersHandlers';

export const requestHandler = (req: IncomingMessage, res: ServerResponse) => {
  const { method, url } = req;

  console.log(`${method} ${url}`);

  if (url && url.startsWith('/api/users')) {
    if (method === 'GET') {
      if (url === '/api/users') {
        getAllUsers(req, res);
      } else {
        const parts = url.split('/');
        const userId = parts.length > 3 ? parts[3] : undefined;
        if (userId) {
          getUserById(req, res, userId);
        } else {
          notFound(req, res);
        }
      }
    } else if (method === 'POST') {
      createUser(req, res);
    } else if (method === 'PUT') {
      updateUser(req, res);
    } else if (method === 'DELETE') {
      deleteUser(req, res);
    } else {
      notFound(req, res);
    }
  } else {
    notFound(req, res);
  }
};

const notFound = (req: IncomingMessage, res: ServerResponse) => {
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Route not found' }));
};
