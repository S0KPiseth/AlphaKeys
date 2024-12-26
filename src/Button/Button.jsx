import style from "./Button.module.css";
import RiseLoader from "react-spinners/RiseLoader";
function Button(props) {
  //keyboard label
  const keyboardLayout = [
    ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace"],
    ["Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\"],
    ["CapsLock", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", "Enter"],
    ["LShift", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", "Shift"],
    ["LCtrl", "LAlt", "Space", "Alt", "Ctrl"],
  ];

  // create keyboard component base on keyboard row and apply various width to keyboard buttons
  const firstKeyboardRow = keyboardLayout[0].map((element) =>
    element == "Backspace" ? (
      <button key={element} className={`${style.firstButton} ${style.mediumBtn}`} id={element}>
        {element}
      </button>
    ) : (
      <button key={element} className={style.firstButton} id={element.toLowerCase()}>
        {element}
      </button>
    )
  );

  const secondKeyboardRow = keyboardLayout[1].map((element) =>
    element == "Tab" ? (
      <button key={element} className={`${style.firstButton} ${style.mediumBtn}`} id={element}>
        {element}
      </button>
    ) : (
      <button key={element} className={style.firstButton} id={element.toLowerCase()}>
        {element}
      </button>
    )
  );

  const middleKeyboardRow = keyboardLayout[2].map((element) =>
    element == "Enter" || element == "CapsLock" ? (
      <button key={element} className={`${style.firstButton} ${style.enterBtn}`} id={element}>
        {element}
      </button>
    ) : (
      <button key={element} className={style.firstButton} id={element.toLowerCase()}>
        {element}
      </button>
    )
  );

  const fourthKeyboardRow = keyboardLayout[3].map((element) =>
    element == "LShift" || element == "Shift" ? (
      <button key={element} className={`${style.firstButton} ${style.shiftBtn}`} id={element}>
        {element}
      </button>
    ) : (
      <button key={element} className={style.firstButton} id={element.toLowerCase()}>
        {element}
      </button>
    )
  );

  const lastKeyboardRow = keyboardLayout[4].map((element) => {
    if (element === "Space") {
      return (
        <button key={element} className={`${style.firstButton} ${style.spaceBtn}`} id={element}>
          {element}
        </button>
      );
    } else if (element === "LCtrl" || element === "Ctrl") {
      return (
        <button key={element} className={`${style.firstButton} ${style.enterBtn}`} id={element}>
          {element}
        </button>
      );
    }
    return (
      <button key={element} className={style.firstButton} id={element}>
        {element}
      </button>
    );
  });
  //track the current user input
  let currentInput = "";

  let begin;

  // add animation to keyboard base on the key press, check and automatically remove the wrong char, and calculate wpm
  const handleKeyPress = (event) => {
    if (!begin) {
      //set start time
      begin = performance.now();
    }
    //get input value
    const targetValueInput = document.querySelector("#typeWords");
    const keyIdentify = event.key;

    //modifies key for css
    let sanitizedKey = keyIdentify.replace(/([.*+?^=!:${}()`|\[\]\/\\-])/g, "\\$1");
    sanitizedKey == " " ? (sanitizedKey = "Space") : sanitizedKey;
    sanitizedKey == "Control" ? (sanitizedKey = "Ctrl") : sanitizedKey;

    //add animation
    const LBtn = ["Ctrl", "Shift", "Alt"];
    if (LBtn.includes(sanitizedKey)) {
      const whitL = "L" + sanitizedKey;
      const target = document.querySelector(`#${sanitizedKey}`);
      const whitLTarget = document.querySelector(`#${whitL}`);
      setTimeout(() => {
        target.className += ` ${style.newButton}`;
        whitLTarget.className += ` ${style.newButton}`;
      }, 15);
      if (target.classList.contains(style.newButton)) {
        whitLTarget.classList.remove(style.newButton);
        target.classList.remove(style.newButton);
      }
    } else {
      const target = document.querySelector(`#${sanitizedKey}`);
      target.click();
      setTimeout(() => {
        target.className += ` ${style.newButton}`;
      }, 15);
      if (target.classList.contains(style.newButton)) {
        target.classList.remove(style.newButton);
      }
    }

    // typing logic
    if (keyIdentify == targetValueInput.value.charAt(0)) {
      let inputValue = targetValueInput.value;
      targetValueInput.value = inputValue.slice(1);
      currentInput += keyIdentify;
    } else if (keyIdentify == "Backspace") {
      //handle backspace
      targetValueInput.value = currentInput.charAt(currentInput.length - 1) + targetValueInput.value;
      currentInput = currentInput.slice(0, currentInput.length - 1);
    } else if (targetValueInput.value.length == 0) {
      const end = performance.now() - begin;
      const endMinute = end / (1000 * 60);

      props.wpm.current = (event.target.value.length / 5 / endMinute).toFixed(2);
      event.target.value = "";
      begin = 0;

      // get a new set of words after finish typing
      switch (props.words) {
        case "25":
          props.setWord("1");
          setTimeout(() => {
            props.setWord("25");
          }, 0);
          break;
        case "50":
          props.setWord("1");
          setTimeout(() => {
            props.setWord("50");
          }, 0);
          break;
        case "100":
          props.setWord("1");
          setTimeout(() => {
            props.setWord("100");
          }, 0);
          break;
        case "150":
          props.setWord("1");
          setTimeout(() => {
            props.setWord("150");
          }, 0);
          break;
        //for debug
        case "2":
          props.setWord("1");
          setTimeout(() => {
            props.setWord("2");
          }, 0);
      }
    } else {
      setTimeout(() => {
        document.querySelector("#typeInput").value = "";
        document.querySelector("#typeInput").value = currentInput;
      }, 0);
    }
  };

  return (
    <div className={style.keyboard}>
      {props.loading ? (
        <RiseLoader loading={props.loading} size={25} aria-label="Loading Spinner" data-testid="loader" className="typingSpace" />
      ) : (
        <div className="typingSpace">
          <input autoFocus type="text" id="typeInput" className={style.textToType} onKeyDown={(event) => handleKeyPress(event)} autoComplete="off" />
          <input disabled type="text" id="typeWords" className={`${style.textToType} ${style.textForType}`} value={props.word2Type} />
        </div>
      )}
      <br />
      <div className="visible-lg">{firstKeyboardRow}</div>
      <div className="visible-lg">{secondKeyboardRow}</div>
      <div className="visible-lg">{middleKeyboardRow}</div>
      <div className="visible-lg">{fourthKeyboardRow}</div>
      <div className="visible-lg">{lastKeyboardRow}</div>
    </div>
  );
}
export default Button;
