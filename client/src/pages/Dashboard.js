import { useEffect } from "react";
import socket from "../services/socket";

export default function Dashboard() {
  useEffect(() => {
    // connect socket when dashboard loads
    socket.connect();

    // when connected
    socket.on("connect", () => {
      console.log("Connected to server");
      console.log("Socket ID:", socket.id);
    });

    // when disconnected
    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    // connection error handling
    socket.on("connect_error", (err) => {
      console.log("Connection error:", err.message);
    });

    // cleanup on unmount (VERY IMPORTANT for PR marks)
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("connect_error");

      socket.disconnect();
    };
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>
      <p>Socket.io is running in background...</p>
    </div>
  );
}