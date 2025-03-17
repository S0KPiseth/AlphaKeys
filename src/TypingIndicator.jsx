import { useEffect, useRef, useState } from "react";

function TypingIndicator({ word2Type, numberOfWord, setWpm, isFinish, setIsFinish, resetRef }) {
  let wordComponents = [];

  const typingRef = useRef(null);
  const spreadWords = (word) => {
    let temList = [];
    for (let i = 0; i < word.length; i++) {
      temList.push(word.charAt(i));
    }
    return temList;
  };
  const word2TypeCopy = [...word2Type];
  const spreadWord2type = word2TypeCopy.map((e) => {
    return spreadWords(e);
  });

  for (let i of spreadWord2type) {
    let letters = [];
    for (let j of i) {
      letters.push(<span>{j}</span>);
    }
    letters.push(<span className="space"></span>);
    wordComponents.push(<div className="fullWord">{letters}</div>);
  }
  useEffect(() => {
    let wordCursor = 0;
    let typingCursor = 0;
    let timeElapse = 0;
    let keyCount = 0;
    let localIsFinish = false;

    const SPACIAL_KEYS = ["Control", "Alt", "Shift", "Backspace", "CapsLock", "Tab", "Enter"];
    const typingSpaceChildren = typingRef.current.children;
    const arr = [...typingSpaceChildren];

    const resetFunct = () => {
      arr.forEach((element) => {
        const divChild = element.children;
        const newArr = [...divChild];
        newArr.forEach((e) => {
          e.style.color = "rgb(150, 150, 150)";
        });
      });
    };
    resetFunct();

    const assignWpm = () => {
      setWpm(keyCount / 5 / (timeElapse / 600));
    };

    const handleKey = (e) => {
      let letter2Type = typingSpaceChildren[wordCursor].children;
      if (!SPACIAL_KEYS.includes(e.key)) {
        keyCount += 1;

        if (e.key === letter2Type[typingCursor].textContent) {
          letter2Type[typingCursor].style.color = "green";
          typingCursor += 1;

          if (typingCursor == letter2Type.length) {
            wordCursor += 1;
            typingCursor = 0;
          }
        } else if (e.key != letter2Type[typingCursor].textContent) {
          letter2Type[typingCursor].style.color = "red";
          typingCursor += 1;

          if (typingCursor >= letter2Type.length) {
            wordCursor += 1;
            typingCursor = 0;
          }
        }
      } else if (e.key === "Backspace") {
        if (wordCursor == 0 && typingCursor == 0) return;
        if (typingCursor <= 0) {
          wordCursor -= 1;
          letter2Type = typingSpaceChildren[wordCursor].children;
          typingCursor = letter2Type.length;
        }

        typingCursor -= 1;
        letter2Type[typingCursor].style.color = "rgb(150, 150, 150)";
      }
      //handle the end events
      if (wordCursor == typingSpaceChildren.length - 1 && typingCursor == letter2Type.length - 1) {
        setIsFinish(true);
        localIsFinish = true;
      }
    };
    const timeIntervalId = setInterval(() => {
      if (!localIsFinish) {
        timeElapse += 1;
        assignWpm();
      }
    }, 100);

    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
      clearInterval(timeIntervalId);
    };
  }, [numberOfWord, resetRef]);

  return (
    <div className="typingSpace" ref={typingRef}>
      {wordComponents}
    </div>
  );
}
export default TypingIndicator;
