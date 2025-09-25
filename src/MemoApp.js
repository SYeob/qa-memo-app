import React, { useState } from "react";
import "./MemoApp.css";
import { motion, AnimatePresence } from "framer-motion";

export default function MemoApp() {
  const [memos, setMemos] = useState([]);
  const [text, setText] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const addMemo = () => {
    if (!text.trim()) return;
    setMemos([...memos, { id: Date.now(), text }]);
    setText("");
  };

  const deleteMemo = (id) => {
    setMemos(memos.filter((m) => m.id !== id));
  };

  return (
    <div className={`container ${darkMode ? "dark" : ""}`}>
      <h1>메모 앱</h1>
      <button className="toggle-btn" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "☀️ 라이트 모드" : "🌙 다크 모드"}
      </button>

      <div className="input-row">
        <input
          placeholder="메모 입력"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={addMemo}>추가</button>
      </div>

      <ul>
        <AnimatePresence>
          {memos.map((memo) => (
            <motion.li
              key={memo.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
            >
              {memo.text}
              <button onClick={() => deleteMemo(memo.id)}>삭제</button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
