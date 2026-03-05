import { useState, useRef, useCallback } from "react";

const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href = "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap";
document.head.appendChild(fontLink);

const ACCENT = "#E8935A";
const ACCENT2 = "#F2C07A";
const BG = "#0D0A08";
const SURFACE = "#141008";
const BORDER = "#2A2018";
const TEXT = "#F5EDD8";
const MUTED = "#6B5A45";

const styles = {
  app: {
    minHeight: "100vh",
    background: BG,
    color: TEXT,
    fontFamily: "'DM Sans', sans-serif",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    padding: "24px 32px",
    borderBottom: `1px solid ${BORDER}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  logoIcon: {
    width: 32,
    height: 32,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 22,
  },
  logoText: {
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: "0.02em",
    color: TEXT,
  },
  badge: {
    fontSize: 10,
    padding: "3px 8px",
    border: `1px solid ${BORDER}`,
    borderRadius: 20,
    color: MUTED,
    letterSpacing: "0.12em",
  },
  main: {
    flex: 1,
    display: "flex",
    maxWidth: 900,
    width: "100%",
    margin: "0 auto",
    padding: "40px 32px",
    flexDirection: "column",
    gap: 24,
  },
  dropzone: {
    border: `1px dashed ${BORDER}`,
    borderRadius: 8,
    padding: "48px 32px",
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.2s",
    background: SURFACE,
    position: "relative",
  },
  dropzoneActive: {
    borderColor: ACCENT,
    background: "#1A1008",
  },
  dropzoneLoaded: {
    borderStyle: "solid",
    borderColor: ACCENT,
    background: "#1A1008",
    padding: "20px 32px",
  },
  uploadIcon: {
    fontSize: 32,
    marginBottom: 12,
    opacity: 0.4,
  },
  dropLabel: {
    fontSize: 13,
    color: MUTED,
    lineHeight: 1.6,
  },
  dropLabelHighlight: {
    color: ACCENT,
    cursor: "pointer",
  },
  fileInfo: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  fileIcon: {
    width: 36,
    height: 36,
    background: ACCENT,
    borderRadius: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#1A0A00",
    fontSize: 11,
    fontWeight: "bold",
    flexShrink: 0,
  },
  fileName: {
    fontSize: 13,
    fontWeight: "600",
    color: TEXT,
  },
  fileMeta: {
    fontSize: 11,
    color: MUTED,
    marginTop: 2,
  },
  clearBtn: {
    marginLeft: "auto",
    background: "none",
    border: `1px solid ${BORDER}`,
    color: MUTED,
    cursor: "pointer",
    padding: "4px 10px",
    borderRadius: 4,
    fontSize: 11,
    fontFamily: "inherit",
    transition: "all 0.15s",
  },
  chatArea: {
    flex: 1,
    border: `1px solid ${BORDER}`,
    borderRadius: 8,
    background: SURFACE,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    minHeight: 420,
  },
  chatHeader: {
    padding: "14px 20px",
    borderBottom: `1px solid ${BORDER}`,
    fontSize: 11,
    color: MUTED,
    letterSpacing: "0.1em",
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: ACCENT,
    display: "inline-block",
  },
  messages: {
    flex: 1,
    padding: "20px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  emptyState: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    color: MUTED,
    fontSize: 12,
    textAlign: "center",
    padding: 40,
  },
  emptyIcon: {
    fontSize: 28,
    marginBottom: 4,
    opacity: 0.3,
  },
  message: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  messageRole: {
    fontSize: 10,
    letterSpacing: "0.12em",
    color: MUTED,
  },
  messageBubble: {
    padding: "12px 16px",
    borderRadius: 6,
    fontSize: 13,
    lineHeight: 1.7,
    maxWidth: "85%",
  },
  userBubble: {
    background: "#1A1A1A",
    border: `1px solid ${BORDER}`,
    alignSelf: "flex-end",
  },
  assistantBubble: {
    background: "#1A1008",
    border: `1px solid #2A1A08`,
    color: TEXT,
  },
  inputRow: {
    display: "flex",
    gap: 0,
    borderTop: `1px solid ${BORDER}`,
  },
  input: {
    flex: 1,
    background: "none",
    border: "none",
    outline: "none",
    color: TEXT,
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 13,
    padding: "16px 20px",
    resize: "none",
  },
  sendBtn: {
    background: ACCENT,
    border: "none",
    color: "#1A0A00",
    fontFamily: "inherit",
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: "0.04em",
    padding: "0 24px",
    cursor: "pointer",
    transition: "opacity 0.15s",
  },
  sendBtnDisabled: {
    opacity: 0.3,
    cursor: "not-allowed",
  },
  thinkingDots: {
    display: "flex",
    gap: 4,
    padding: "12px 16px",
    alignItems: "center",
  },
  suggestions: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
    padding: "0 20px 16px",
  },
  suggestion: {
    fontSize: 11,
    padding: "6px 12px",
    border: `1px solid ${BORDER}`,
    borderRadius: 20,
    background: "none",
    color: MUTED,
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "all 0.15s",
  },
};

const SUGGESTIONS = [
  "Summarize this document",
  "What are the key findings?",
  "List the main points",
  "What action items are mentioned?",
];

function ThinkingDots() {
  return (
    <div style={styles.thinkingDots}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: ACCENT2,
            animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
            opacity: 0.6,
          }}
        />
      ))}
      <style>{`@keyframes pulse { 0%,100%{opacity:0.2;transform:scale(0.8)} 50%{opacity:1;transform:scale(1)} }`}</style>
    </div>
  );
}

export default function App() {
  const [pdfData, setPdfData] = useState(null);
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const fileInputRef = useRef();
  const messagesEndRef = useRef();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const loadFile = useCallback((file) => {
    if (!file || file.type !== "application/pdf") return;
    setFileName(file.name);
    setFileSize((file.size / 1024).toFixed(0) + " KB");
    setMessages([]);
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target.result.split(",")[1];
      setPdfData(base64);
    };
    reader.readAsDataURL(file);
  }, []);

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    loadFile(file);
  }, [loadFile]);

  const sendMessage = async (text) => {
    const q = text || input.trim();
    if (!q || !pdfData || loading) return;
    setInput("");
    const userMsg = { role: "user", content: q };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setLoading(true);
    setTimeout(scrollToBottom, 50);

    try {
      // Build Gemini contents array — PDF inline on first user message, text-only after
      const contents = newMessages.map((m, idx) => {
        if (m.role === "user" && idx === 0) {
          return {
            role: "user",
            parts: [
              { inline_data: { mime_type: "application/pdf", data: pdfData } },
              { text: m.content },
            ],
          };
        }
        return {
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content }],
        };
      });

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            system_instruction: {
              parts: [{ text: "You are a document analyst. Answer questions based only on the provided PDF document. Be precise and cite relevant sections when possible. If something isn't in the document, say so." }],
            },
            contents,
          }),
        }
      );

      const data = await res.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || data.error?.message || "No response.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: "assistant", content: "Error reaching the API. Please try again." }]);
    }

    setLoading(false);
    setTimeout(scrollToBottom, 50);
  };

  const hasDoc = !!pdfData;
  const hasMessages = messages.length > 0;

  return (
    <div style={styles.app}>
      <header style={styles.header}>
        <div style={styles.logo}>
          <div style={styles.logoIcon}>🔥</div>
          <span style={styles.logoText}>Ember</span>
        </div>
        <span style={styles.badge}>AI DOCUMENT ANALYZER</span>
      </header>

      <main style={styles.main}>
        {/* API Key input */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 8 }}>
          <span style={{ fontSize: 12, color: MUTED, whiteSpace: "nowrap" }}>GEMINI API KEY</span>
          <input
            type="password"
            placeholder="Paste your free API key from aistudio.google.com"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            style={{ flex: 1, background: "none", border: "none", outline: "none", color: TEXT, fontFamily: "inherit", fontSize: 13 }}
          />
          {apiKey && <span style={{ fontSize: 11, color: ACCENT }}>✓ SET</span>}
        </div>

        {/* Upload zone */}
        <div
          style={{
            ...styles.dropzone,
            ...(dragging ? styles.dropzoneActive : {}),
            ...(hasDoc ? styles.dropzoneLoaded : {}),
          }}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          onClick={() => !hasDoc && fileInputRef.current.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            style={{ display: "none" }}
            onChange={(e) => loadFile(e.target.files[0])}
          />
          {hasDoc ? (
            <div style={styles.fileInfo}>
              <div style={styles.fileIcon}>PDF</div>
              <div>
                <div style={styles.fileName}>{fileName}</div>
                <div style={styles.fileMeta}>{fileSize} · Ready to query</div>
              </div>
              <button
                style={styles.clearBtn}
                onClick={(e) => { e.stopPropagation(); setPdfData(null); setMessages([]); setFileName(""); }}
              >
                CLEAR
              </button>
            </div>
          ) : (
            <>
              <div style={styles.uploadIcon}>⬆</div>
              <div style={styles.dropLabel}>
                Drop a PDF here or{" "}
                <span style={styles.dropLabelHighlight}>browse files</span>
                <br />
                <span style={{ fontSize: 11, opacity: 0.5 }}>Your document stays private — processed in memory only</span>
              </div>
            </>
          )}
        </div>

        {/* Chat */}
        <div style={styles.chatArea}>
          <div style={styles.chatHeader}>
            <span style={styles.dot} />
            {hasDoc ? `ANALYZING: ${fileName.toUpperCase()}` : "AWAITING DOCUMENT"}
          </div>

          <div style={styles.messages}>
            {!hasMessages && (
              <div style={styles.emptyState}>
                <div style={styles.emptyIcon}>◎</div>
                {hasDoc
                  ? "Document loaded. Ask anything about it."
                  : "Upload a PDF to start querying it."}
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} style={{ ...styles.message, alignItems: m.role === "user" ? "flex-end" : "flex-start" }}>
                <div style={styles.messageRole}>{m.role === "user" ? "YOU" : "EMBER"}</div>
                <div style={{ ...styles.messageBubble, ...(m.role === "user" ? styles.userBubble : styles.assistantBubble) }}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ alignSelf: "flex-start" }}>
                <div style={styles.messageRole}>EMBER</div>
                <ThinkingDots />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {hasDoc && !hasMessages && (
            <div style={styles.suggestions}>
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  style={styles.suggestion}
                  onClick={() => sendMessage(s)}
                  onMouseEnter={(e) => { e.target.style.borderColor = ACCENT; e.target.style.color = ACCENT; }}
                  onMouseLeave={(e) => { e.target.style.borderColor = BORDER; e.target.style.color = MUTED; }}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <div style={styles.inputRow}>
            <textarea
              style={styles.input}
              placeholder={!apiKey ? "Enter API key above first..." : hasDoc ? "Ask anything about this document..." : "Upload a PDF first..."}
              value={input}
              disabled={!hasDoc || loading}
              rows={1}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
            />
            <button
              style={{ ...styles.sendBtn, ...((!hasDoc || loading || !input.trim() || !apiKey) ? styles.sendBtnDisabled : {}) }}
              onClick={() => sendMessage()}
              disabled={!hasDoc || loading || !input.trim() || !apiKey}
            >
              SEND →
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
