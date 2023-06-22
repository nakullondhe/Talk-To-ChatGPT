# Talk-To-GPT

Deployed On Render.com - https://talktogpt.onrender.com/

### Task
In this project, you will build a bot using Node.js which joins Zoom meetings, interprets verbal input from participants, and responds verbally using GPT. The bot will convert the voice input from Zoom into text, process the text using GPT, convert the text response back into spoken word, and feed the response back through Zoom. The end goal is to be able to speak to GPT over Zoom.

### Solution
Due to unavailability of API resources or features by zoom to get access to raw audio (Only available in Windows SDK) . I have implemented a Talk To GPT separately.

#### Implementation
 - Take Voice Input from user
 - When user stops speaking, get transcription and send it to ChatGPT for response.
 - Convert the text response to audio using Google cloud Text-To-Speech API.
 - Play audio on the client as a response from GPT.

### Benchmark
![enter image description here](https://github.com/nakullondhe/talkTo-ChatGPT/blob/main/Benchmark.png?raw=true)

***Note** - According to the time taken by each process, the total time to produce a result entirely depends on ChatGPT API using the fasted Davinci Model. The google Text-to-speech API and very less effect on speed comparatively.*

#### Technology used 
 - React
 - Nodejs
 - Google Text-to-speech
 - OpenAI ChatGPT API
 - Socket IO

Check Video - [Video Link](https://youtu.be/7uDj3V9FM_0)
