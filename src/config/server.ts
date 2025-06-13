const environment = process.env.NODE_ENV || 'development';

export const backendURL: string = environment === 'production' ? 'https://mysenggerapi.bieda.it/api' : 'http://localhost:8081/api';
export const backendWsURL: string = environment === 'production' ? 'ws://mysenggerapi.bieda.it' : 'ws://localhost:8081';
