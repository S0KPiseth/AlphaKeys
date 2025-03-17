import { useEffect } from "react";
import style from "./Button.module.css";

//keyboard label
const keyboardLayout = [
  ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace"],
  ["Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\"],
  ["CapsLock", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", "Enter"],
  ["LShift", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", "Shift"],
  ["LCtrl", "LAlt", "Space", "Alt", "Ctrl"],
];
// Mapping special keys to their respective styles
const keyStyles = {
  Backspace: `${style.mediumBtn}`,
  Tab: `${style.mediumBtn}`,
  Enter: `${style.enterBtn}`,
  CapsLock: `${style.enterBtn}`,
  LShift: `${style.shiftBtn}`,
  Shift: `${style.shiftBtn}`,
  Space: `${style.spaceBtn}`,
  LCtrl: `${style.enterBtn}`,
  Ctrl: `${style.enterBtn}`,
};

function Button(props) {
  const handleKeyPress = (event) => {
    const keyIdentify = event.key;
    const LBtn = ["Ctrl", "Shift", "Alt"];

    let capitalizeKey = keyIdentify[0].toUpperCase() + keyIdentify.slice(1, keyIdentify.length);

    switch (capitalizeKey) {
      case " ": {
        capitalizeKey = "Space";
        break;
      }
      case "Control": {
        capitalizeKey = "Ctrl";
        break;
      }
    }

    if (LBtn.includes(capitalizeKey)) {
      const targetBtn = [document.getElementById(capitalizeKey), document.getElementById(`L${capitalizeKey}`)];
      targetBtn.forEach((e) => {
        e.classList.toggle(style.newButton);
      });
    } else {
      const targetBtn = document.getElementById(capitalizeKey);
      targetBtn.classList.toggle(style.newButton);
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <div className={style.keyboard}>
      <div className="visible-lg">
        {keyboardLayout.map((row, rowIndex) => (
          <div key={rowIndex} className={style.keyboardRow}>
            {row.map((key, keyIndex) => {
              const keyClass = `${style.firstButton} ${keyStyles[key] || ""}`;
              const animationStyle = props.isFetching ? { animation: `${style.size} 0.45s infinite ease-in-out ${-Math.abs(6 - keyIndex) / 2}s` } : null;

              return (
                <button key={key} className={keyClass} id={key} style={animationStyle}>
                  {key}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
export default Button;
