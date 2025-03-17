import Button from "./Button/Button.jsx";
import { useEffect, useState, useRef } from "react";
import TypingIndicator from "./TypingIndicator.jsx";
import Alert from "./Alert.jsx";

function App() {
  //initialize state value
  const [words, setWords] = useState("25");
  const [word2Type, setWord2Type] = useState("");
  const [wpm, setWpm] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [isFinish, setIsFinish] = useState(false);
  const [resetRef, setResetRef] = useState(false);

  //set number of word and apply background to radio label when click
  function handleRadio(e) {
    setWords(e.target.value);
    const radios = document.querySelectorAll(".labelRadio");
    radios.forEach((element) => (element.className = "labelRadio"));
    e.target.parentElement.className += " radio-bg";
  }
  //fetch random words from api
  useEffect(() => {
    let mounted = true;
    const fetchWords = async () => {
      setIsFetching(true);
      setWord2Type(["Loading....."]);
      try {
        const response = await fetch(`https://random-word-api.vercel.app/api?words=${words}&type=lowercase`);
        const data = await response.json();
        if (mounted) {
          // set value to type
          const CAPITALIZE = data[0].charAt(0).toUpperCase() + data[0].slice(1, data.length);
          data[0] = CAPITALIZE;
          setWord2Type(data);
          setIsFetching(false);
        }
      } catch (error) {
        console.error("Error fetching words:", error);
      }
    };

    fetchWords();

    return () => {
      mounted = false;
    };
  }, [words, resetRef]);

  return (
    <>
      {isFinish ? <Alert isFinish={isFinish} setIsFinish={setIsFinish} setResetRef={setResetRef} /> : null}
      <div className={!isFinish ? "content" : "content filter-blur"}>
        <h1>Have Fun Typing!</h1>
        <div className="Panel">
          <div className="wordContContainer">
            <label htmlFor="twentyFive" className="labelRadio radio-bg">
              <input type="radio" id="twentyFive" className="Radio" value="25" checked={words == "25"} onChange={handleRadio} />
              25
            </label>
            <label htmlFor="Fifty" className="labelRadio">
              <input type="radio" id="Fifty" className="Radio" value="50" checked={words == "50"} onChange={handleRadio} />
              50
            </label>
            <label htmlFor="oneHundred" className="labelRadio">
              <input type="radio" id="oneHundred" className="Radio" value="100" checked={words == "100"} onChange={handleRadio} />
              100
            </label>
            <label htmlFor="oneFifty" className="labelRadio">
              <input type="radio" id="oneFifty" className="Radio" value="150" checked={words == "150"} onChange={handleRadio} />
              150
            </label>
          </div>
          <p>WPM: {Math.round(wpm)}</p>
        </div>
        <br />
        <br />
        <div className="typingSpace">
          <TypingIndicator word2Type={word2Type} numberOfWord={words} setWpm={setWpm} isFinish={isFinish} setIsFinish={setIsFinish} resetRef={resetRef} />
        </div>
        <br />
        <div className="keybaordDiv">
          <Button words={words} wpm={wpm} setWord={setWords} isFetching={isFetching} word2Type={word2Type} />
        </div>
      </div>
    </>
  );
}

export default App;
