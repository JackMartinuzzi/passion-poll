import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Bubbles from './Bubbles.jsx';

function App() {
  const [url, setUrl] = useState('');
  const [crawlInterval, setCrawlInterval] = useState(1);
  const [go, setGo] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:3000/scrape', { url, crawlInterval });
    setGo(!go);
  };

  const fetchData = async () => {
    const response = await axios.get('http://localhost:3000/scraped-data');
    setScrapedData(response.data);
  };

  useEffect(() => {
    if (url !== '') {
      const intervalId = setInterval(fetchData, crawlInterval * 1000);
      return () => clearInterval(intervalId);
    }
  }, [go]);

  return (
    <div className="main-div">
      <h1 className="main-title">Web Journey</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL"
        />
        <button type="submit">Begin</button>
      </form>
    </div>
  );
}

export default App;
