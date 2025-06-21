import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  
  const [channel, setChannel] = useState("");
  const [submittedChannel, setSubmittedChannel] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [closeStream, setCloseStream] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedChannel(channel);
    setShowChat(false);
    setCloseStream(false);
    setChannel("");
  }

  useEffect(() => {
    if(submittedChannel && !closeStream){
      document.title = `🔴 Watching ${submittedChannel} | Twitchy`;
    }
    else {
      document.title = `Twitchy | Stream Multiviewing`;
    }
  })


  return (
    <div className="App">
      <h1 id="twitchy">Twitchy</h1>
      
      <form onSubmit={handleSubmit} className="searchbar">
        <input id="searchInput"
          type='text'
          placeholder='Enter channel name'
          value={channel}
          onChange={(e) => setChannel(e.target.value)}
        />
        <button type='submit' id="searchButton">Search</button>
      </form>

      {submittedChannel && !closeStream && (
        <div className="stream">
          <iframe id="twitch-stream-embed"
            src={`https://player.twitch.tv/?channel=${submittedChannel}&parent=localhost`}
            height="550"
            width="916"
            allowfullscreen
            title="Twitch Stream">
          </iframe>

          {showChat && !closeStream && (
            <iframe id="twitch-chat-embed"
              src={`https://www.twitch.tv/embed/${submittedChannel}/chat?parent=localhost`}
              height="550"
              width="350"
              title="Twitch Chat">
            </iframe>
          )}
        </div>
      )}

      {submittedChannel && !closeStream && (
        <button onClick={() => setShowChat(!showChat)}  className="toggleChatButton">
          {showChat ? "Hide Chat" : "Show Chat" }
        </button>
      )}

      {submittedChannel && !closeStream && (
        <button onClick={() => setCloseStream(true)}  className="closeStreamButton">
          Close
        </button>
      )}

    </div>
  );
}

export default App

{/* <iframe 
        src="https://www.youtube.com/embed/PmEMEvstqJY?si=-l4IdXw5pg3yjl_x" 
        height="480"
        width="800"  
        title="YouTube video player" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        referrerpolicy="strict-origin-when-cross-origin" 
        allowfullscreen>

    </iframe> */}