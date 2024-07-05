'use client';

import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [code, setCode] = useState("");
  const [analysis, setAnalysis] = useState("");
 

  async function generateWisdom() {
    try {
      const response = await axios.post('/api/generate-comments', { code });
      setAnalysis(response.data.comments);
      console.log(response.data.comments);  // Log the comments for debugging
      await generateImage(response.data.comments);
    } catch (error) {
      console.log("Error generating comments: ", error);
    }
  }

  // async function generateImage(analysis) {
  //   try {
  //     const response = await axios.post('/api/generate-image', { prompt: wisdom });
  //     setImage(response.data.imageUrl);
  //   } catch (error) {
  //     console.log("Error generating image: ", error);
  //   }
  // }

  return (
    <div className="flex justify-around bg-psychoffice bg-cover bg-center h-screen w-screenb py-8 px-8">
        <div> 
        <h1 className="font-mono text-5xl font-light shadow-md py-4 text-slate-200">psychoanalyze.dev</h1>
        <p></p>
        <textarea
          style={{ background: "rgba(0, 0, 0, 0.5)", border: "grey", borderRadius: "4px", color: "white", width: "50vw", height: "10vh" }}
          value={code}
          onChange={(event) => setCode(event.target.value)}
          placeholder="For some strange reason, you think showing your analyst a code snippet might be enlightening..."
        />
        <button onClick={generateWisdom}>Enter</button>
        <div>
          {analysis}
        </div>
        </div>
        <div> 
          <img 
            src="/analyst.webp" 
            alt="Analyst" 
            style={{ 
              width: '30vw', 
              borderRadius: '30px', 
              position: 'fixed', 
              top: '10px',  
              right: '10px' 
            }} 
          />
        </div> 
      {/* <p>Visualize your journey</p>
      {image && <img src={image} alt="Generated by DALL-E" />} */}
    </div>
  );
}

