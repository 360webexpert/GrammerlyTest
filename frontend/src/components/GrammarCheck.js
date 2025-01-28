import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const GrammarCheck = () => {
    const [text, setText] = useState("");
    const [correctedText, setCorrectedText] = useState("");
    const [suggestions, setSuggestions] = useState("");
    console.log('suggestions', suggestions)
    const [error, setError] = useState(null);
    console.log('incorrectedText', correctedText)
    const navigate = useNavigate();
    useEffect(() => {
        const checkGrammer = async () => {
            if (text.trim() === "") {
                setCorrectedText("")
                setSuggestions("")
                setError(null)
                return
            }
            try {
                const response = await axios.post("http://localhost:5000/api/grammer/check", {
                    text,
                });
                debugger
                setCorrectedText(response.data.correctedWords);
                setSuggestions(response.data.suggestions);
                setError(null)
            } catch (err) {
                setError("An error occurred while checking grammar. Please try again.");
                setCorrectedText("");
                setSuggestions("")
                console.log('Error checking Grammer', err)
            }
        }

        const debounceTimer = setTimeout(() => {
            checkGrammer()
        }, 500)
        return () => clearTimeout(debounceTimer)
    }, [text])

    const renderText = () => {
        return text.split(" ").map((words, index) => {
            const isIncorrect = suggestions?.includes(`incorrect: ${words}`)
            return (
                <span key={index} style={{ textDecoration: isIncorrect ? 'underline red' : 'none', color: isIncorrect ? 'red' : 'black' }} >{words}</span>
            )
        })
    }

    const handleLogout = () => {
        localStorage.clear()
        navigate('/')
    }
    return (
        <><div>
            <button onClick={handleLogout}>Logout</button>
        </div><div className="container">
                <h1>Grammar Check</h1>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <div className="text-preview">{renderText()}</div>
                <textarea
                    placeholder="Enter your text here..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    style={{ width: '100%', height: '150px', marginTop: '20px' }} />
                <div className="corrected-text" style={{ marginTop: '20px' }}>
                    <h2>Corrected Text:</h2>
                    <p>{correctedText}</p>
                </div>
                <div className="suggestions" style={{ marginTop: '20px' }}>
                    <h2>Suggestions:</h2>
                    <pre>{suggestions}</pre>
                </div>
            </div></>
    );
};

export default GrammarCheck;