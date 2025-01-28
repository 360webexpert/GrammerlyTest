import React, { useState } from 'react';
import axios from 'axios';
import openai from 'openai-node';
const GrammarCheck = () => {
    const [text, setText] = useState("");
    const Openai = new openai({
        apiKey: "sk-d18144e948fb430aaf1a7e77f46ce0dd", // Relace with your OpenAI API key
    });
    const [correctedText, setCorrectedText] = useState("");

    const handleCheckGrammar = async () => {
        try {
            // const response = await axios.post("http://localhost:5000/api/grammar/check", {
            //     text,
            // });
            // const { text } = req.body;
            console.log('text', text)
            try {
                const response = await Openai.chat.completions.create({
                    model: "gpt-3.5-turbo",
                    messages: [
                        {
                            role: "user",
                            contact: `Correct the grammer and spelling in the following text: "${text}". Highlight incorrect 
                        words with **.`,
                        },
                    ],
                });
                debugger
                const correctedText = response.data.choices[0].message.content;
                // res.json({ correctedText });
            } catch (error) {
                // res.status(500).json({ error: "Error checking grammer" });
            }
            // setCorrectedText(response.data.correctedText);
        } catch (err) {
            console.error("Error checking grammar:", err);
        }
    };


    return (
        <div className="container">
            <h1>Grammer Check</h1>
            <div className="preview">{correctedText}</div>
            <textarea
                placeholder="Enter text here"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button onClick={handleCheckGrammar}>Check Grammer</button>
        </div>
    );
};
export default GrammarCheck;