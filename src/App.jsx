import { useState, useEffect, useRef } from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'
import { IoMdRemoveCircle } from "react-icons/io";

import './App.css'
import logo from './assets/twitchy_large_icon.png'

function App() {
  const [input, setInput] = useState("");
  const [channels, setChannels] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const [visibleChannels, setVisibleChannels] = useState([]);
  const [theme, setTheme] = useState("dark");
  const [num, setNum] = useState(0);


  const handleSubmit = (e) => {
    e.preventDefault();

    if(input.trim() !== ""){
      if(channels.length === 0){
        setChannels([input]);
        setVisibleChannels([true]);
      }
      else if(channels.length > 0 && !channels.includes(input) && channels.length < 4){
        const updatedChannels = [...channels, input];
        const updatedVisible = [...visibleChannels, true];
        setChannels(updatedChannels);
        setVisibleChannels(updatedVisible);
      }
    } 

    setShowChat(false);
    setInput("");
  }

  useEffect(() => {
    if(channels.length === 0){
      document.title = `twitchy | Stream Multiviewing`;
    }
    else if(channels.length <= 2){
      document.title = `🔴 Watching ${channels.join(" + ")} | twitchy`;
    }
    else {
      document.title = `🔴 Watching ${channels[0]} & ${channels.length-1} others | twitchy`;
    }

    document.body.className = '';
    document.body.classList.add(theme);
  }, [channels, theme])

  const parentDomain = window.location.hostname;

  return (
    <div className={`App ${theme}`}>

      <div className='title'>
        <h1 id="twitchy">twitch<span className='purple-y'>y</span></h1>
        <img src={logo}></img>
      </div>
      <p>( Multiviewing made easy )</p>
      
      
      <form onSubmit={handleSubmit} className="searchbar">

        <button type="button" className={`themeButton ${theme}`} 
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          {theme === "dark" ? <FaSun size={24}/> : <FaMoon size={24}/>}
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
              height={
                channels.length === 1 ? "528" :
                channels.length <= 4 ? "418" :
                "385"
              }
              width={
                channels.length === 1 ? "935" :
                channels.length <= 4 ? "688" :
                "495"
              }

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
              height="528"
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
              }}
            >
              <IoMdRemoveCircle size={12}/> {`${channels.length === 1 ? "Close" : channels[index]}`}
            </button>
          ) : null
        )}

        </div>
      )}

      <div className="credits">
        <a href="https://github.com/Iced-code/twitchy" target='_blank'>
          Developed by Ayaan Modak (<span style={{ textDecoration: "underline"}}>Github: Iced-Code</span>)</a>
      </div>

    </div>
  );
}

export default App