import socketIOClient from 'socket.io-client';
// other
import { HOST_SERVER } from '../constands/Other';

export const socket = socketIOClient(HOST_SERVER);

export const something = '';