const http = require("http");
const express = require("express");
const app = express();
const socketio = require("socket.io");
const cors = require("cors");
const dotenv = require("dotenv");
const PORT = process.env.PORT || 4000;
dotenv.config();
const Route = require("./routes/api");
const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} = require("./controllers/UsersController");
const {
  getKategori,
  getDestinations,
  getInfoDestiny,
} = require("./controllers/DataController");

app.use(cors());
app.use(Route);

const server = http.createServer(app);

const io = socketio(server);
let posisi;
let currentMessage;

io.on("connect", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    socket.join(user.room);

    socket.emit("message", {
      user: "admin",
      text: `Hello ${user.name}! selamat datang pada chatbot wisata jember<br/>Silahkan ketik <strong>start</strong> untuk memulai`,
    });

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  socket.on("sendMessage", async (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit("message", { user: user.name, text: message });

    if (message.toLowerCase() === "start") {
      let kategori = await getKategori();

      let html = "Pilih Jenis Wisata:<br>";

      for (let i = 0; i < kategori.length; i++) {
        html += `<li>${kategori[i].category}</li>`;
      }

      posisi = "kategori";

      socket.emit("message", {
        user: "admin",
        text: html,
        position: posisi,
      });
    } else if (posisi === "kategori") {
      if (isNaN(message)) {
        socket.emit("message", {
          user: "admin",
          text: "Inputan salah! Coba lagi...",
          position: posisi,
        });
      } else {
        let kategori = await getKategori();
        if (kategori.length < message) {
          return socket.emit("message", {
            user: "admin",
            text: "Inputan salah! Coba lagi...",
            position: posisi,
          });
        }
        let id = message - 1;
        currentMessage = id;
        const destinations = await getDestinations(id);
        let html = "Pilih Destinasi Wisata:<br>";

        for (let i = 0; i < destinations.length; i++) {
          html += `<li>${destinations[i].name}</li>`;
        }

        posisi = "destinasi";

        socket.emit("message", {
          user: "admin",
          text: html,
          position: posisi,
        });
      }
    } else if (posisi === "destinasi") {
      if (isNaN(message)) {
        socket.emit("message", {
          user: "admin",
          text: "Inputan salah!, Coba lagi...",
          position: posisi,
        });
      } else {
        let destinations = await getDestinations(currentMessage);
        if (destinations.length < message) {
          socket.emit("message", {
            user: "admin",
            text: "Inputan salah! Coba lagi...",
            position: posisi,
          });
        }
        let id = message - 1;
        const destiny = await getInfoDestiny({ id, currentMessage });

        posisi = "info";
        let html = `<h4 style="margin:0;">${destiny.name}</h4><p>${destiny.description}</p>`;

        socket.emit("message", {
          user: "admin",
          text: html,
          position: posisi,
        });
      }
    }

    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", {
        user: "Admin",
        text: `${user.name} hast left`,
      });
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});

server.listen(PORT, () => console.log(`server running on ${PORT}`));
