import WebSocket from "ws";
import users from "./users.js";

const initWs = (httpServer) => {
    const wss = new WebSocket.Server({server: httpServer});
    wss.on("connection", (ws) => {
        console.log("Client connected")
        ws.on("message", (message) => {
            const msg = JSON.parse(message.toString())
            //TODO
        })
    })
}

export default initWs;