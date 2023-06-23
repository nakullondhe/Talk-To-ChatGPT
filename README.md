# Talk-To-GPT

Deployed On Render.com - https://talktogpt.onrender.com/

### Description
Talk-To-GPT takes audio input from user as a query and uses chatGPT to fetch responses and converts the response to audio.

#### Implementation
 - Take Voice Input from user
 - When user stops speaking, get transcription and send it to ChatGPT for response.
 - Convert the text response to audio using Google cloud Text-To-Speech API.
 - Play audio on the client as a response from GPT.

### Benchmark
![enter image description here](https://raw.githubusercontent.com/nakullondhe/Talk-To-ChatGPT/main/benchmark.png?raw=true)

***Note** - According to the time taken by each process, the total time to produce a result entirely depends on ChatGPT API using the fasted Davinci Model. The google Text-to-speech API and very less effect on speed comparatively.*

#### Quick Start

 1. **Install** 
```
yarn
```
 2. **Dev** - No need for 3rd and 4th Step for dev
 ```
 yarn dev
 ```
 3. **Build**
 ```
 yarn build-prod
 ```
 4. **Start**
 ```
 yarn server
 ```

*Replace SocketURL in VoiceGPT.js before starting the server*

#### Technology used 
 - React
 - Nodejs
 - Google Text-to-speech
 - OpenAI ChatGPT API
 - Socket IO

Check Video - [Video Link](https://youtu.be/7uDj3V9FM_0)
