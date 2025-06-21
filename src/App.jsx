import { useState, useEffect } from 'react'
import { FaTwitch, FaYoutube } from 'react-icons/fa'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  
  const [channel, setChannel] = useState("");
  const [submittedChannel, setSubmittedChannel] = useState("");
  /* const [submittedChannel2, setSubmittedChannel2] = useState("");
  const [channel2, setChannel2] = useState(""); */

  const [showChat, setShowChat] = useState(false);
  const [closeStream, setCloseStream] = useState(false);
  const [platform, setPlatform] = useState("twitch");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedChannel(channel);
    /* setSubmittedChannel2(channel2); */
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

  const parentDomain = window.location.hostname;

  return (
    <div className="App">
      <h1 id="twitchy">Twitchy</h1>
      
      <form onSubmit={handleSubmit} className="searchbar">

        <button type='button' className="switchPlatform" onClick={() => {
          setPlatform((prev) => (prev === "twitch" ? "youtube" : "twitch")); setCloseStream(true); setShowChat(false) }
        }>
          {platform === "twitch" ? <FaTwitch size={24} color='purple'/> : <FaYoutube size={24} color='red'/>}
        </button>
        
        <input id="searchInput"
          type='text'
          placeholder='Enter channel name'
          value={channel}
          onChange={(e) => setChannel(e.target.value)}
        />

        {/* <input
          type="text"
          placeholder="Twitch Channel 2 (optional)"
          value={channel2}
          onChange={(e) => setChannel2(e.target.value)}
        /> */}

        <button type='submit' id="searchButton">Search</button>
      </form>


      {submittedChannel && !closeStream && platform === "twitch" && (
        <div className="stream">
          {submittedChannel && ( 
            <iframe id="twitch-stream-embed"
              src={`https://player.twitch.tv/?channel=${submittedChannel}&parent=${parentDomain}`}
              height="550"
              width="916"
              allowfullscreen
              title="Twitch Stream">
            </iframe>
          )}

          {/* {submittedChannel2 && ( 
            <iframe id="twitch-stream-embed"
              src={`https://player.twitch.tv/?channel=${submittedChannel2}&parent=${parentDomain}`}
              height="550"
              width="916"
              allowfullscreen
              title="Twitch Stream">
            </iframe>
          )} */}

          {showChat && !closeStream && (
            <iframe id="twitch-chat-embed"
              src={`https://www.twitch.tv/embed/${submittedChannel}/chat?parent=${parentDomain}`}
              height="550"
              width="350"
              title="Twitch Chat">
            </iframe>
          )}
        </div>
      )}

      {submittedChannel && !closeStream && platform === "youtube" && (
        <div className="stream">
          {/* <blockquote class="tiktok-embed" cite={`https://www.tiktok.com/@${submittedChannel}`} data-unique-id={submittedChannel} data-embed-type="creator" style="max-width: 780px; min-width: 288px;" > <section> <a target="_blank" href={`https://www.tiktok.com/@${submittedChannel}?refer=creator_embed`}>{`@${submittedChannel}`}</a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script> */}

          {/* {showChat && !closeStream && (
            <iframe id="twitch-chat-embed"
              src={`https://www.twitch.tv/embed/${submittedChannel}/chat?parent=${parentDomain}`}
              height="550"
              width="350"
              title="Twitch Chat">
            </iframe>
          )} */}
        </div>
      )}


      {submittedChannel && !closeStream && (
        <div className="buttonRow">
          <button onClick={() => setShowChat(!showChat)}  className="toggleChatButton">
            {showChat ? "Hide Chat" : "Show Chat" }
          </button>

          <button onClick={() => { setCloseStream(true); setShowChat(false) }}  className="closeStreamButton">
            Close
          </button>

        </div>

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