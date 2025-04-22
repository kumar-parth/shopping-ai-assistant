import { useState } from 'react';

export default function ApiKeyInput({ onSubmit }) {
  const [input, setInput] = useState('');

  return (
    <div style={{ padding: '16px' }}>
      <h4>Enter Gemini API Key</h4>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste your Gemini API key"
        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
      />
      <button onClick={() => onSubmit(input)}>Continue</button>
    </div>
  );
}
