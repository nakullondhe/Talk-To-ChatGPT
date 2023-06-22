import React, { useEffect } from "react";
import { Bars } from "react-loader-spinner";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import mic from "./mic.png";

// const socketURL = "http://localhost:5000";
const socketURL = "https://talktogpt.onrender.com";

const socket = require("socket.io-client")(socketURL);

const VoiceGPT = () => {
  const [botState, setBotState] = React.useState("idle"); // idle, processing, speaking
  const [audio, setAudio] = React.useState(null); // audio file
  const [responseText, setResponseText] = React.useState(""); // text response from GPT-3
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const [audioState, setAudioState] = React.useState(""); // idle, playing, pause

  const stopListening = () => {
    socket.emit("send_transcript", transcript);
  };

  const changeAudioState = () => {
    const audioElement = document.getElementById("audio_playback");
    if (audioState === "pause") {
      setAudioState("playing");
      audioElement.play();
    }
    if (audioState === "playing") {
      setAudioState("pause");
      audioElement.pause();
    }
  };

  useEffect(() => {
    socket.on("processing", (data) => {
      if (data.status === "started") {
        setBotState("processing");
      } else {
        setBotState("idle");
      }
    });
    socket.on("response_audio", async (data) => {
      setAudio(data.audioUrl);
      setBotState("speaking");
      setResponseText(data.gptResponse);
    });

    return () => {
      socket.off("response_audio");
      socket.off("processing");
    };
  }, []);

  useEffect(() => {
    const audioElement = document.getElementById("audio_playback");
    if (audioElement) {
      audioElement.addEventListener("ended", () => {
        setBotState("idle");
        setAudio(null);
        console.log("ended");
      });

      if (audioElement) {
        setAudioState("playing");
        audioElement.play();
      }
    }
  }, [audio]);

  useEffect(() => {
    if (!listening && transcript) {
      stopListening();
    }
  }, [listening])

  return (
    <div className="wrapper">
      {audio && <audio src={audio} id="audio_playback"></audio>}

      <div className="container">
        <div className="mic_container">
          <img src={mic} alt="mic" />
          {listening ? (
            <Bars
              height="40"
              width="40"
              color="#4fa94d"
              ariaLabel="bars-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          ) : null}
          <div>
            {botState === "processing"
              ? "Processing your request..."
              : botState === "speaking"
              ? "Speaking..."
              : null}
          </div>
        </div>
        <div className="button_container">
          <button
            className="start_button button"
            disabled={botState === "speaking" || listening}
            onClick={() => {
              resetTranscript();
              setResponseText("");
              SpeechRecognition.startListening({ continuous: false });
            }}
          >
            Speak
          </button>
          {/* <button
            className="stop_button button"
            disabled={!listening}
            onClick={stopListening}
          >
            Stop
          </button> */}
          <button
            className="pause_button button"
            disabled={botState !== "speaking" || listening}
            onClick={changeAudioState}
          >
            {audioState === "playing" ? "Pause" : "Resume"}
          </button>
          <button
            className="reset_button button"
            disabled={botState !== "speaking"}
            onClick={() => {
              setBotState("idle");
              setAudio(null);
              setResponseText("");
            }}
          >
            Reset
          </button>
        </div>
        {responseText && (
          <>
            <h4 className="bot_says">Bot Says...</h4>
            <div>
              <p>{responseText}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VoiceGPT;
