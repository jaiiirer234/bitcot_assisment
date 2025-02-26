import { Server } from "socket.io";

export default (io: Server) => {
  io.on("connections", (socket) => {
    console.log("User connected successfully:", socket.id);

    socket.on("join_room", (room: any) => {
      socket.join(room);
    });
    socket.on("send_message", ({ room, message }) => {
      io.to(room).emit("recive_message", message);
    });

    socket.on("disconnect", () => console.log("User disconnected:", socket.id));
  });
};
