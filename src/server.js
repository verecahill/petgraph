require('dotenv').config()
import { GraphQLServer } from 'graphql-yoga';
import logger from 'morgan';
import schema from './schema';
import { sendSecretMail } from "./utils";
import passport from "passport";
import "./passport";
import { authenticateJwt } from './passport';
import {prisma} from '../generated/prisma-client';

const PORT = process.env.PORT || 3000;

const server = new GraphQLServer({ schema, context: ({request}) => ({request}) })

server.express.use(logger("dev"));
server.express.use(authenticateJwt);

server.start({port: PORT}, () => console.log(`Server running on ${PORT}`))