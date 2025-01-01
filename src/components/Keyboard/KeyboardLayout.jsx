import style from './KeyboardLayout.module.css';
import { useState, useEffect } from 'react';

const KEYBOARD_LAYOUT = [
    ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace"],
    ["Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\"],
    ["CapsLock", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", "Enter"],
    ["LShift", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", "Shift"],
    ["LCtrl", "LAlt", "Space", "Alt", "Ctrl"],
];

const renderKey = (element, specialClass = '') => {
    const baseClass = `${style.firstbutton} ${specialClass}`.trim();
    return (
        <button
            key={element}
            className={baseClass}
            id={element.toLowerCase()}
        >
            {element}
        </button>
    );
};

const KeyboardLayout = () => {
    const [showKeyboard, setShowKeyboard] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            setShowKeyboard(window.innerWidth > 768);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (!showKeyboard) return null;

    return (
        <div className={style.keyboard}>
            {KEYBOARD_LAYOUT.map((row, rowIndex) => (
                <div key={rowIndex} className={style.keyboardRow}>
                    {row.map(key => {
                        switch (key) {
                            case 'Backspace':
                            case 'Tab':
                                return renderKey(key, style.mediumBtn);
                            case 'Enter':
                            case 'CapsLock':
                                return renderKey(key, style.enterBtn);
                            case 'LShift':
                            case 'Shift':
                                return renderKey(key, style.shiftBtn);
                            case 'Space':
                                return renderKey(key, style.spaceBtn);
                            default:
                                return renderKey(key);
                        }
                    })}
                </div>
            ))}
        </div>
    );
};

export default KeyboardLayout;
