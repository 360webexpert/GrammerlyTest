import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import GrammarCheck from "./components/GrammarCheck";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/grammar-check" element={<GrammarCheck />} />
            </Routes>
        </Router>
    );
};

export default App;