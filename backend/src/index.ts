import express, { urlencoded, Request, Response } from 'express';
import mongoose from 'mongoose';

import { appRouter as appRoutes } from './routes';
import secrets from '../secrets';

const app = express();

app.use(express.json());
app.use(urlencoded({ extended: false }));

app.use(appRoutes);
app.use('/', (req: Request, res: Response) => {
    res.json({ message: 'Hello from my Application' });
});

try {
    mongoose.connect(secrets.dbConfig.DATABASE_URL);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.once('open', () => {
        console.log('MongoDB connection established.');
        app.listen(secrets.port, () => {
            console.log(`Server started at PORT ${secrets.port}`);
        });
    });
} catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
}
