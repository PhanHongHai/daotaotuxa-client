import io, { Socket } from 'socket.io-client';
// other
import { HOST_SERVER } from '../constands/Other';

const token = localStorage.getItem('token');

let socket = null;

const onConnected = () => {
	console.log('socket: connected');
};

const onDisconnect = () => {
	console.log('socket: disconnect');
};

export const configSocket = () => {
	if (socket && socket.disconnected) {
		socket.connect();
	}
	if (socket) return;
	socket = io.connect(HOST_SERVER, {
		query: `token=${token}`,
	});
	socket.on('connect', onConnected);
	socket.on('disconnect', onDisconnect);

	socket.on('join-room-test', data =>{
		socket.join(data);
	});


	return socket;
};

export const socketDisconnect = () => {
	socket.disconnect();
};

export const getSocket = () => {
	return socket;
};
