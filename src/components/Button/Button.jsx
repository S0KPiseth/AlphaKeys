import { calculateWPM, handleWordReset } from "../WPM/Wpm";
import PropTypes from 'prop-types';
import RiseLoader from "react-spinners/RiseLoader";
import style from "./Button.module.css";
import KeyboardLayout from '../Keyboard/KeyboardLayout';

const SPECIAL_KEYS = {
  SPACE: ' ',
  CONTROL: 'Control',
  BACKSPACE: 'Backspace'
};

function Button({ word, wpm, setword, loading }) {
  let typedText = "";
  let startTime;

  const handleKeyPress = (event) => {
    if (!startTime) {
      startTime = performance.now();
    }

    const targetValueInput = document.querySelector("#typeWords");
    if (!targetValueInput) return; // Early return if target input doesn't exist

    const keyIdentify = event.key;
    const sanitizedKey = getSanitizedKey(keyIdentify);
    
    updateKeyboardVisuals(sanitizedKey);
    handleTyping(keyIdentify, targetValueInput, event);
  };

  const getSanitizedKey = (key) => {
    let sanitized = key.replace(/([.*+?^=${}()`|[\]/\\-])/g, '\\$1');
    if (key === SPECIAL_KEYS.SPACE) return 'Space';
    if (key === SPECIAL_KEYS.CONTROL) return 'Ctrl';
    return sanitized;
  };

  const updateKeyboardVisuals = (key) => {
    const isSpecialKey = ["Ctrl", "Shift", "Alt"].includes(key);
    const target = document.querySelector(`#${key.toLowerCase()}`);
    
    if (isSpecialKey) {
      const leftKey = document.querySelector(`#L${key.toLowerCase()}`);
      applyKeyPressEffect(target, leftKey);
    } else {
      applyKeyPressEffect(target);
    }
  };

  const applyKeyPressEffect = (target, paired = null) => {
    if (!target) return;
    
    const removeAllEffects = () => {
      document.querySelectorAll(`.${style.firstbutton}`).forEach(btn => {
        btn.classList.remove(style.newbutton);
      });
    };

    const addEffect = () => {
      removeAllEffects();
      target.classList.add(style.newbutton);
      if (paired) paired.classList.add(style.newbutton);
    };

    addEffect();
    setTimeout(() => target.classList.remove(style.newbutton), 150);
  };

  const handleTyping = (key, target, event) => {
    if (key === target.value.charAt(0)) {
      target.value = target.value.slice(1);
      typedText += key;
    } else if (key === SPECIAL_KEYS.BACKSPACE) {
      target.value = typedText.charAt(typedText.length - 1) + target.value;
      typedText = typedText.slice(0, typedText.length - 1);
    } else if (target.value.length === 0) {
      finishTyping(event);
    } else {
      resetInput();
    }
  };

  const finishTyping = (event) => {
    wpm(calculateWPM(event.target.value.length, performance.now(), startTime));
    event.target.value = "";
    startTime = 0;
    handleWordReset(word.length, setword);
  };

  const resetInput = () => {
    setTimeout(() => {
      const input = document.querySelector("#typeInput");
      input.value = typedText;
    }, 0);
  };

  return (
    <div className={style.keyboard}>
      {loading ? (
        <RiseLoader loading={loading} size={25} aria-label="Loading Spinner" data-testid="loader" className="typingspce" />
      ) : (
        <div className="typingspce">
          <input 
            autoFocus 
            type="text" 
            id="typeInput" 
            className={style.textToType} 
            onKeyDown={handleKeyPress}
            inputMode="text"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="none"
            spellCheck="false"
          />
          <input 
            disabled 
            type="text" 
            id="typeWords" 
            className={`${style.textToType} ${style.textForType}`} 
            value={word.join(" ")} 
          />
        </div>
      )}
      <br />
      {window.innerWidth > 768 && <KeyboardLayout />}
    </div>
  );
}

Button.propTypes = {
  word: PropTypes.arrayOf(PropTypes.string).isRequired,
  wpm: PropTypes.func.isRequired,
  setword: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

export default Button;