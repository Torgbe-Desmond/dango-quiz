import React, { useState } from 'react';
import "./Home.css";
import { MenuItem, TextField, Button } from '@material-ui/core';
import Languages from "../../Data/Languages";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

const Home = ({ fetchQuestions }) => {
  const [Name, setName] = useState("");
  const [Language, setLanguage] = useState("");
  const [Mode, setMode] = useState("");
  const [Error, setError] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = () => {
    if ( !Language || !Mode || !Name) {
      setError(true);
    return;
  }
  else {
    setError(false);
    fetchQuestions(Language, Mode);
    navigate("/quiz");
  }
  };
  
  return (
    <div  className='content'>
    <div className='settings'>
    <span style={{ fontSize: 30}} >Welcome To Quiz </span>
    <div className="settings_select">
      {Error && <ErrorMessage>Please Fill All The Fields</ErrorMessage>}
   <TextField 
   style={{ marginBottom: 25}}  
   label="Enter Your Name" 
   variant="outlined" 
   fullWidth 
   onChange={(e) => setName(e.target.value)}
   value={Name} 
   /> 
   
   <TextField
    select
    label="Select Language" 
    variant="outlined"
    style={{ marginBottom: 30}}
    onChange={(e) => setLanguage(e.target.value)}
    value={Language}>
    
    
   { Languages.map((cat) =>(
    <MenuItem key={cat.value} value={cat.value}>
     {cat.Language}
     </MenuItem>
))}
   </TextField>
   <TextField
     select
     label="Select Mode"
     variant="outlined"
     style={{ marginBottom: 30 }}
     onChange={(e) => setMode(e.target.value)}
     value={Mode}>

     <MenuItem key="Easy" value='easy'>
      Easy
     </MenuItem>
     <MenuItem key="Medium" value="Medium">
      Medium
     </MenuItem>
     <MenuItem key="Hard" value="Hard">
      Hard
     </MenuItem>
     </TextField>
     <Button variant="contained" color="primary" size="large" onClick={handleSubmit}>
       Start Quiz
     </Button>
    </div>
    </div>
    <img src='/quiz.svg' className="banner" alt="quiz img"/>
    </div>
  );
};

export default Home;