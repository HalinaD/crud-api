import http from 'http';
import { requestHandler } from './routes/routes';
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT || 4000;

const server = http.createServer(requestHandler);

server.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
});
