import { useState, useEffect } from "react";
import { Bot, X, Send, Sparkles } from "lucide-react";
import "./ChatBot.css";

function ChatBot() {

  const [open, setOpen] = useState(false);

  // Open chatbot when AI Recommendation bar is clicked
  useEffect(() => {

    const handleOpenAI = () => {
      setOpen(true);
    };

    window.addEventListener(
      "openCareerNestAI",
      handleOpenAI
    );

    return () => {
      window.removeEventListener(
        "openCareerNestAI",
        handleOpenAI
      );
    };

  }, []);

  // Toggle chatbot from floating button
  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  // Close chatbot
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {/* =========================
          AI Floating Button
      ========================= */}

      <button
        className="chat-btn"
        onClick={handleToggle}
        title="CareerNest AI"
      >
        {open ? (
          <X size={20} />
        ) : (
          <Bot size={20} />
        )}
      </button>


      {/* =========================
          Chat Window
      ========================= */}

      <div
        className={`chat-container ${
          open ? "show" : ""
        }`}
      >

        {/* Header */}

        <div className="chat-header">

          <div>
            <h3>CareerNest AI</h3>

            <span>
              Always here to help 🚀
            </span>
          </div>

          <button
            onClick={handleClose}
            style={{
              background: "transparent",
              border: "none",
              color: "white",
              cursor: "pointer",
              display: "flex",
              alignItems: "center"
            }}
          >
            <X size={20} />
          </button>

        </div>


        {/* Body */}

        <div className="chat-body">

          <div className="bot-msg">

            👋 Hi!

            <br />
            <br />

            I'm your AI Career Assistant.

            <br />

            How can I help you today?


            {/* Quick Buttons */}

            <div className="quick-buttons">

              <button>
                💼 Find Jobs
              </button>

              <button>
                📄 Resume Review
              </button>

              <button>
                🎤 Interview Prep
              </button>

              <button>
                📌 Track Applications
              </button>

            </div>

          </div>

        </div>


        {/* Input */}

        <div className="chat-input">

          <input
            type="text"
            placeholder="Ask anything..."
          />

          <button>
            <Send size={18} />
          </button>

        </div>

      </div>
    </>
  );
}

export default ChatBot;