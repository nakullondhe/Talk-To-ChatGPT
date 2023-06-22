require("dotenv").config();
const express = require("express");
const http = require("http");
const socket = require("socket.io");
const fs = require("fs");
const cors = require("cors");
const { getSpeech, getGPTResponse, getAudioUrl } = require("./helper");
const app = express();
const path = require("path");

const server = http.createServer(app);
const io = socket(server, {
  cors: {
    origin: "*",
  },
});
// Middlewares
app.use(cors("http://localhost:5000"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

io.on("connection", (socket) => {
  console.log("User connected", socket.id);

  // Recieve request transcript from client
  socket.on("send_transcript", async (transcript) => {
    socket.emit("processing", { status: "started" });
    console.log(`Prompt : ${transcript}`);

    console.time("GPT-3 text-davinci-003");

    // Get Response from GPT-3 davinci engine
    const gptResponse = await getGPTResponse(transcript);
    console.timeEnd("GPT-3 text-davinci-003");

    // Convert text to speech and save it as audio file
    console.time("Text to Speech");
    await getSpeech(gptResponse);
    console.timeEnd("Text to Speech");
    // Get audiourl in base64 format
    const audioUrl = await getAudioUrl();

    // Send response to client
    socket.emit("processing", { status: "completed" });
    socket.emit("response_audio", { audioUrl, gptResponse });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});

const port = process.env.PORT || 5000;

//server static assets if in production
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static(path.join(__dirname, "../client/build")));
  //load index.html for all page routes
}
server
  .listen(port, () => {
    console.log(`Listening on the port ${port}`);
  })
  .on("error", (e) => {
    console.error(e);
  });
