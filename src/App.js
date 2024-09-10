import axios from "axios";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./Pages/Home/Home";
import Quiz from "./Pages/Quiz/Quiz";
import Result from "./Pages/Result/Result";

function App() {
  const [questions, setQuestions] = useState();
  const [name, setName] = useState();
  const [score, setScore] = useState(0);


    const fetchQuestions = async ({ amount = 10,category, difficulty, type = "multiple" }) => {
      // Construct the base URL
  
      // Append category if provided
      let url = `http://localhost:3001/api/v1/getAll?amount=${amount}`;

      // Append category if provided
      if (category) {
          url += `&category=${category}`;
      }
      
      // Append difficulty if provided
      if (difficulty) {
          url += `&difficulty=${difficulty}`;
      }
      
      // Append type (default is 'multiple')
      if (type) {
          url += `&type=${type}`;
      }
      
      console.log('url',url)
  
      // Make the GET request using Axios
      const { data } = await axios.get(url);
  
      // Update the state with the fetched data
      if(data.allData.length > 0 ){
        setQuestions(data.allData);
      }
  };
  
  

  return (
    <BrowserRouter>
      <div className="app" style={{ backgroundImage: 'url("/ques1.png")' }}>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                name={name}
                setName={setName}
                fetchQuestions={fetchQuestions}
              />
            }
          />
          <Route
            path="/quiz"
            element={
              <Quiz
                name={name}
                questions={questions}
                score={score}
                setScore={setScore}
                setQuestions={setQuestions}
              />
            }
          />
          <Route
            path="/result"
            element={<Result name={name} score={score} />}
          />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
