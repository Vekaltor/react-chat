import { io } from "socket.io-client";

import { backendURL } from "./config/server";

const URL = process.env.NODE_ENV === "production" ? "" : backendURL;

export const client = io(URL, { autoConnect: false, withCredentials: true });
