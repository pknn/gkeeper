import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';

dotenv.config();

const { HOST = 'localhost', PORT = 8080, NODE_ENV } = process.env;
const app = express();

app
  .use(morgan(NODE_ENV === 'development' ? 'dev' : 'short'))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, HOST);
