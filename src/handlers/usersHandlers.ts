import { IncomingMessage, ServerResponse } from 'http';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
import { User } from '../user/user';

let users: User[] = [];

export const getAllUsers = (req: IncomingMessage, res: ServerResponse) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    try {
        res.end(JSON.stringify(users));
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Internal server error' }));
    }
};

export const getUserById = (req: IncomingMessage, res: ServerResponse, userId: string) => {
    try {
        if (!uuidValidate(userId)) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Invalid userId' }));
            return;
        }
        const user = users.find((user) => user.id === userId);
        if (!user) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'User not found' }));
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(user));
        }
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Internal server error' }));
    }
};

export const createUser = (req: IncomingMessage, res: ServerResponse) => {
    let body = '';
    req.on('data', (chunk) => {
        body += chunk.toString();
    });
    req.on('end', () => {
        try {
            const { username, age, hobbies }: User = JSON.parse(body);
            if (!username || !age || !hobbies) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Username, age, and hobbies are required fields' }));
            } else {
                const newUser: User = {
                    id: uuidv4(),
                    username,
                    age,
                    hobbies,
                };
                users.push(newUser);
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(newUser));
            }
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Internal server error' }));
        }
    });
};

export const updateUser = (req: IncomingMessage, res: ServerResponse) => {
    const userId = req.url!.split('/')[3];
    let body = '';
    req.on('data', (chunk) => {
        body += chunk.toString();
    });
    req.on('end', () => {
        try {
            const { username, age, hobbies }: User = JSON.parse(body);
            const userIndex = users.findIndex((user) => user.id === userId);
            if (!uuidValidate(userId)) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Invalid userId' }));
            } else if (userIndex === -1) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'User not found' }));
            } else if (!username || !age || !hobbies) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Username, age, and hobbies are required fields' }));
            } else {
                const updatedUser: User = {
                    id: userId,
                    username,
                    age,
                    hobbies,
                };
                users[userIndex] = updatedUser;
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(updatedUser));
            }
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Internal server error' }));
        }
    });
};

export const deleteUser = (req: IncomingMessage, res: ServerResponse) => {
    const userId = req.url!.split('/')[3];
    const userIndex = users.findIndex((user) => user.id === userId);
    try {
        if (!uuidValidate(userId)) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Invalid userId' }));
        } else if (userIndex === -1) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'User not found' }));
        } else {
            users.splice(userIndex, 1);
            res.writeHead(204);
            res.end();
        }
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Internal server error' }));
    }
};