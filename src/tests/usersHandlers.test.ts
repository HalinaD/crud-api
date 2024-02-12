
import { IncomingMessage, ServerResponse } from 'http';
import {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} from '../handlers/usersHandlers';

describe('GET /api/users', () => {
  it('should return an empty array when there are no users', async () => {
    const req = {} as IncomingMessage;
    const res = {} as ServerResponse;
    res.writeHead = jest.fn().mockReturnValueOnce(undefined);
    res.end = jest.fn().mockReturnValueOnce(undefined);
    await getAllUsers(req, res);
    expect(res.writeHead).toHaveBeenCalledWith(200, {
      'Content-Type': 'application/json',
    });
    expect(res.end).toHaveBeenCalledWith(JSON.stringify([]));
  });
});

describe('POST /api/users', () => {
  it('should create a new user and return the created record', async () => {
    const req = {
      on: jest.fn().mockImplementation((event, callback) => {
        if (event === 'data') {
          callback(
            JSON.stringify({
              username: 'Alice',
              age: 30,
              hobbies: ['reading', 'running'],
            }),
          );
        }
        if (event === 'end') {
          callback();
        }
      }),
    } as unknown as IncomingMessage;
    const res = {} as ServerResponse;
    res.writeHead = jest.fn().mockReturnValueOnce(undefined);
    res.end = jest.fn().mockImplementationOnce((data) => {
      const newUser = JSON.parse(data);
      expect(res.writeHead).toHaveBeenCalledWith(201, {
        'Content-Type': 'application/json',
      });
      expect(newUser).toHaveProperty('id');
      expect(newUser).toHaveProperty('username', 'Alice');
      expect(newUser).toHaveProperty('age', 30);
      expect(newUser).toHaveProperty('hobbies', ['reading', 'running']);
    });
    await createUser(req, res);
  });
});

describe('GET /api/user/{userId}', () => {
  it('should return the created record by its ID', async () => {
    const createUserReq = {
      on: jest.fn().mockImplementation((event, callback) => {
        if (event === 'data') {
          callback(
            JSON.stringify({
              username: 'Alice',
              age: 30,
              hobbies: ['reading', 'running'],
            }),
          );
        }
        if (event === 'end') {
          callback();
        }
      }),
    } as unknown as IncomingMessage;
    const createUserRes = {} as ServerResponse;
    createUserRes.writeHead = jest.fn().mockReturnValueOnce(undefined);
    createUserRes.end = jest.fn().mockImplementationOnce((data) => {
      const newUser = JSON.parse(data);
      expect(createUserRes.writeHead).toHaveBeenCalledWith(201, {
        'Content-Type': 'application/json',
      });
      expect(newUser).toHaveProperty('id');
      expect(newUser).toHaveProperty('username', 'Alice');
      expect(newUser).toHaveProperty('age', 30);
      expect(newUser).toHaveProperty('hobbies', ['reading', 'running']);
      const getUserReq = {} as IncomingMessage;
      const getUserRes = {} as ServerResponse;
      getUserRes.writeHead = jest.fn().mockReturnValueOnce(undefined);
      getUserRes.end = jest.fn().mockImplementationOnce((data) => {
        const retrievedUser = JSON.parse(data);
        expect(getUserRes.writeHead).toHaveBeenCalledWith(200, {
          'Content-Type': 'application/json',
        });
        expect(retrievedUser).toEqual(newUser);
      });
      getUserById(getUserReq, getUserRes, newUser.id);
    });
    await createUser(createUserReq, createUserRes);
  });
});

describe('PUT /api/users/{userId}', () => {
  it('should update the created record and return the updated object with the same ID', async () => {
    const createUserReq = {
      on: jest.fn().mockImplementation((event, callback) => {
        if (event === 'data') {
          callback(
            JSON.stringify({
              username: 'Alice',
              age: 30,
              hobbies: ['reading', 'running'],
            }),
          );
        }
        if (event === 'end') {
          callback();
        }
      }),
    } as unknown as IncomingMessage;
    const createUserRes = {} as ServerResponse;
    createUserRes.writeHead = jest.fn().mockReturnValueOnce(undefined);
    createUserRes.end = jest.fn().mockImplementationOnce((data) => {
      const newUser = JSON.parse(data);
      expect(createUserRes.writeHead).toHaveBeenCalledWith(201, {
        'Content-Type': 'application/json',
      });
      expect(newUser).toHaveProperty('id');
      expect(newUser).toHaveProperty('username', 'Alice');
      expect(newUser).toHaveProperty('age', 30);
      expect(newUser).toHaveProperty('hobbies', ['reading', 'running']);
      const updateUserReq = {
        on: jest.fn().mockImplementation((event, callback) => {
          if (event === 'data') {
            callback(
              JSON.stringify({
                username: 'Updated Alice',
                age: 30,
                hobbies: ['reading', 'running', 'swimming'],
              }),
            );
          }
          if (event === 'end') {
            callback();
          }
        }),
      } as unknown as IncomingMessage;
      const updateUserRes = {} as ServerResponse;
      updateUserRes.writeHead = jest.fn().mockReturnValueOnce(undefined);
      updateUserRes.end = jest.fn().mockImplementationOnce((data) => {
        const updatedUser = JSON.parse(data);
        expect(updateUserRes.writeHead).toHaveBeenCalledWith(200, {
          'Content-Type': 'application/json',
        });
        expect(updatedUser).toHaveProperty('id', newUser.id);
        expect(updatedUser).toHaveProperty('username', 'Updated Alice');
        expect(updatedUser).toHaveProperty('age', 30);
        expect(updatedUser).toHaveProperty('hobbies', [
          'reading',
          'running',
          'swimming',
        ]);
      });
      updateUser(updateUserReq, updateUserRes);
    });
    await createUser(createUserReq, createUserRes);
  });
});

describe('DELETE /api/users/{userId}', () => {
  it('should delete the created object by its ID and return a confirmation of successful deletion', async () => {
    const createUserReq = {
      on: jest.fn().mockImplementation((event, callback) => {
        if (event === 'data') {
          callback(
            JSON.stringify({
              username: 'Alice',
              age: 30,
              hobbies: ['reading', 'running'],
            }),
          );
        }
        if (event === 'end') {
          callback();
        }
      }),
    } as unknown as IncomingMessage;
    const createUserRes = {} as ServerResponse;
    createUserRes.writeHead = jest.fn().mockReturnValueOnce(undefined);
    createUserRes.end = jest.fn().mockImplementationOnce((data) => {
      const newUser = JSON.parse(data);
      expect(createUserRes.writeHead).toHaveBeenCalledWith(201, {
        'Content-Type': 'application/json',
      });
      expect(newUser).toHaveProperty('id');
      expect(newUser).toHaveProperty('username', 'Alice');
      expect(newUser).toHaveProperty('age', 30);
      expect(newUser).toHaveProperty('hobbies', ['reading', 'running']);
      const deleteUserReq = {} as IncomingMessage;
      const deleteUserRes = {} as ServerResponse;
      deleteUserRes.writeHead = jest.fn().mockReturnValueOnce(undefined);
      deleteUserRes.end = jest.fn().mockImplementationOnce((data) => {
        expect(deleteUserRes.writeHead).toHaveBeenCalledWith(204);
        expect(data).toEqual(undefined);
      });
      deleteUser(deleteUserReq, deleteUserRes);
    });
    await createUser(createUserReq, createUserRes);
  });
});

describe('GET /api/users/{userId}', () => {
  it('should return a response indicating that the object does not exist', async () => {
    const getUserReq = {} as IncomingMessage;
    const getUserRes = {} as ServerResponse;
    getUserRes.writeHead = jest.fn().mockReturnValueOnce(undefined);
    getUserRes.end = jest.fn().mockImplementationOnce((data) => {
      expect(getUserRes.writeHead).toHaveBeenCalledWith(404, {
        'Content-Type': 'application/json',
      });
      expect(data).toEqual('User not found');
    });
    getUserById(getUserReq, getUserRes, 'deletedUserId');
  });
});
