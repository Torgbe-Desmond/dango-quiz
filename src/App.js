import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import axios from "axios";
import Header from "./components/Header/Header";
import Home from "./Pages/Home/Home";
import Quiz from "./Pages/Quiz/Quiz";
import Results from "./Pages/Results/Results";

function App() {
  const [name, setName] = useState("");
  const [questions, setQuestions] = useState([]); 
  const [score, setScore] = useState(0);

  const fetchQuestions = async (Language = "", Mode = "") => {
    try {
      const { data } = await axios.get(
        `https://quizapi.io/api/v1/questions?apiKey=YOUR_API_KEY&limit=10${Language ? `&Language=${Language}` : ""}${Mode ? `&Mode=${Mode}` : ""}`
      );

      setQuestions(data.results); 
      console.log(data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  return (
    <Router> 
      <div className="app" style={{ backgroundImage: "url('/ques1.png')" }}>
        <Header />

        <Routes>
          <Route path="/" element={<Home name={name} setName={setName} fetchQuestions={fetchQuestions} />} />
          <Route path="/quiz" element={<Quiz name={name} questions={questions} score={score} setScore={setScore} setQuestions={setQuestions}/>} />
          <Route path="/results" element={<Results score={score} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
