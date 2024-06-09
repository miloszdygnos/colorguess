import logo from './logo.svg';
import './App.css';
import { useState,useEffect } from 'react';


function App() {

  const [color, setColor] = useState("")
  const [answers, setAnswers] = useState([]);
  const [correct, setCorrect] = useState();
  const [score, setScore] = useState(0)
  const [attempts, setAttempts] = useState(-1);

  const generateColor = () => {
    const options = ['0','1', '2' , '3' ,'4', '5', '6', '7' ,'8','9', 'A','B', 'C','D','E', "F"];
    const generatedColor = new Array(6).fill("").map(() => options[Math.floor((Math.random() * options.length))]).join("");
    return `#${generatedColor}`;
  }
  const setNewGame = () => {
    if(attempts < 5) {
      setAttempts(attempts + 1)

      const actualColor = generateColor();
      setColor(actualColor);
      setAnswers([actualColor, generateColor(),generateColor()].sort(() => 0.5 - Math.random()))
    } else {
      alert(`Score: ${score} out of ${attempts} attempts`)
      return
    }
    
  }
  useEffect(() =>{  
       setNewGame();
  }, [])

  const handleAnswerCheck = (answer) => {
    if(answer === color) {
      setCorrect(true);
      setScore(score + 1)
      setNewGame();
    }
    else {
      setCorrect(false);
      setNewGame();

    }
  }
  return (
    <div className="App">
      <div className='description'>
        <p>Color guessing game.<br/>If you get the color right the game will start over again, if not you try again
          <br/>hooks used: useEffect, useState
        </p>
      </div>
      {score}/5
      <div className = "guessBox"
      style={{
        background: color
      }}>
      </div>
      <div className='buttonContainer'>
      {answers.map((answer) => {
        return(
          <button
            onClick={() => handleAnswerCheck(answer) }
            key={answer}>{answer}</button>
        )
      })}
      </div>
      <span style={correct? {color:"green"} : {color: "red"}}>{correct ? "you won" : "you lost try again"}</span>
    </div>
  );
}

export default App;
