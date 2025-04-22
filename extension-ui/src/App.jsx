import useGeminiKey from './hooks/useGeminiKey';
import ApiKeyInput from './components/ApiKeyInput';
import Questions from './components/Questions';

export default function App() {
  const [apiKey, saveKey] = useGeminiKey();

  return (
    <div>
      {!apiKey ? (
        <ApiKeyInput onSubmit={saveKey} />
      ) : (
        <Questions apiKey={apiKey} />
      )}
    </div>
  );
}