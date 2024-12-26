import Button from "./Button/Button.jsx";
import { useEffect, useState, useRef } from "react";

function App() {
  //initialize state value
  console.log("component Re-render");
  const [words, setWords] = useState("25");
  const [word2Type, setWord2Type] = useState("");
  const wpm = useRef(0);
  const [loading, setLoading] = useState(false);

  //set number of word and apply background to radio label when click
  function handleRadio(e) {
    setWords(e.target.value);
    document.querySelector("#typeInput").focus();
    const radios = document.querySelectorAll(".labelRadio");
    radios.forEach((element) => (element.className = "labelRadio"));
    e.target.parentElement.className += " radio-bg";
  }
  //fetch random words from api
  useEffect(() => {
    let mounted = true;
    setLoading(true);

    const fetchWords = async () => {
      try {
        const response = await fetch(`https://random-word-api.herokuapp.com/word?number=${words}`);
        const data = await response.json();
        if (mounted) {
          // set value to type
          setWord2Type(data.join(" "));
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching words:", error);
      }
    };

    fetchWords();

    return () => {
      mounted = false;
    };
  }, [words]);

  return (
    <>
      <h1>Have Fun Typing!</h1>
      <div className="container hight-30">
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
          <p>WPM: {wpm.current}</p>
        </div>
      </div>

      <div className="container">
        <Button words={words} wpm={wpm} setWord={setWords} loading={loading} word2Type={word2Type} />
      </div>
    </>
  );
}

export default App;
