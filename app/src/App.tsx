// API is available at import.meta.env.VITE_API_URL

import { useState } from "react";

function App() {

  const [inputShortLink, setShortLink] = useState('');
  const [validInputShortLink, setValidInputShortLink] = useState(false)
  const [shortenLink, setShortenLink] = useState('')

  const shorteringLink = async () => {
    const res = await fetch(`http://localhost:3000/shorten/url`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url: inputShortLink })
    })

    const body = await res.json()

    setShortenLink(body.slug_shorten_url)
  }

  const handleInputChange = (event: any) => {
    const value = event.target.value
    setShortLink(value);

    const regex = /https:\/\/.+\..+$/;

    // Check if the input value matches the regex pattern
    const isValidInput = regex.test(value);
    setValidInputShortLink(isValidInput);
  };

  return (
    <main>
      <h1>URL shortener</h1>
      <input
        type="text"
        value={inputShortLink}
        onChange={handleInputChange}
        placeholder="Type something..."
      />
      <button onClick={shorteringLink} disabled={!validInputShortLink}>Shorten</button>
      {shortenLink ? (<a href="localhost:3000/" + shortenLink>{shortenLink}</a>) : (<></>)}
    </main>
  );
}

export default App;
