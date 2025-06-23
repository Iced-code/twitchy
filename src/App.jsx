import { useState, useEffect, useRef } from 'react'
import { FaTwitch, FaYoutube } from 'react-icons/fa'
import './App.css'

function App() {
  const [input, setInput] = useState("");
  const [channels, setChannels] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const [visibleChannels, setVisibleChannels] = useState([]);

  const [platform, setPlatform] = useState("twitch");

  const [num, setNum] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    if(input.trim() !== ""){
      if(channels.length === 0){
        setChannels([input]);
        setVisibleChannels([true]);
      }
      else if(channels.length > 0 && input !== channels[0]){
        if(channels.length > 1 && input !== channels[1]){
          num === 0 ? setChannels([input, channels[1]]) : setChannels([channels[0], input]);
          setNum(Math.abs(num + -1));
        }
        else {
          setChannels([channels[0], input]);
        }
        setVisibleChannels([true, true]);
      }
    } 

    setShowChat(false);
    setInput("");
  }

  useEffect(() => {
    if(channels.length > 0){
      document.title = `🔴 Watching ${channels.join(" + ")} | Twitchy`;
    }
    else {
      document.title = `Twitchy | Stream Multiviewing`;
    }
  })

  const parentDomain = window.location.hostname;

  return (
    <div className="App">
      <h1 id="twitchy">twitch<span className='purple-y'>y</span></h1>
      <p>( Multiviewing made easy )</p>
      
      <form onSubmit={handleSubmit} className="searchbar">

        <button type='button' className={`switchPlatform ${platform}`}>
          {platform === "twitch" ? <FaTwitch size={24}/> : <FaYoutube size={24}/>}
        </button>
        
        <input id="searchInput"
          type='text'
          placeholder='Enter channel name'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button type='submit' id="searchButton">Search</button>
      </form>


      {channels.length > 0 && (
        <>
        <div className="stream">
          {channels.map((channel, index) => 
            visibleChannels[index] ? (
            <iframe className='twitch-stream-embed'
              key={index}
              src={`https://player.twitch.tv/?channel=${channel}&parent=${parentDomain}`}
              height={channels.length === 1 ? "530" : "400"}
              width={channels.length === 1 ? "900" : "625"}
              allowFullScreen
              title={`Twitch Stream ${channel}`}
            ></iframe>
          ) : null
        )}
      
        {showChat && visibleChannels.filter(Boolean).length === 1 && (() => {
          const chatIndex = visibleChannels.findIndex(Boolean);
          if (chatIndex === -1) return null;
          return (
            <iframe
              id="twitch-chat-embed"
              src={`https://www.twitch.tv/embed/${channels[chatIndex]}/chat?parent=${parentDomain}`}
              height="530"
              width="350"
              title={`Twitch Chat ${channels[chatIndex]}`}
            ></iframe>
          );
        })()}
      </div>
      </>
    )}


      {visibleChannels.some(Boolean) && (
        <div className="buttonRow">
          {visibleChannels.filter(Boolean).length === 1 && (
            <button onClick={() => setShowChat(!showChat)}  className="toggleChatButton">
              {showChat ? "Hide Chat" : "Show Chat" }
            </button>
          )}

          {channels.map((channel, index) =>
          visibleChannels[index] ? (
            <button
              className="closeStreamButton"
              key={`close-${index}`}
              onClick={() => {
                const updatedChannels = [...channels];
                const updatedVisible = [...visibleChannels];
                
                updatedChannels.splice(index, 1);
                updatedVisible.splice(index, 1);

                setChannels(updatedChannels);
                setVisibleChannels(updatedVisible);
                setShowChat(false);
                setNum(0);
              }}
            >
              Close
            </button>
          ) : null
        )}

        </div>
      )}

      <div className="credits">
        <a href="https://github.com/Iced-code/twitchy" target='_blank'>
          Developed by Ayaan Modak (Github: Iced-Code)</a>
      </div>

    </div>
  );
}

export default App