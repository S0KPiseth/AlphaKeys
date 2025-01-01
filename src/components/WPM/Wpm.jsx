export const calculateWPM = (textLength, endTime, startTime) => {
    const end = endTime - startTime;
    const endMinute = end / (1000 * 60);
    return (textLength / 5 / endMinute).toFixed(2);
};

export const handleWordReset = (wordLength, setword) => {
    setword("1");
    setTimeout(() => {
        switch (wordLength) {
            case 25:
                setword("25");
                break;
            case 50:
                setword("50");
                break;
            case 100:
                setword("100");
                break;
            case 150:
                setword("150");
                break;
        }
    }, 0);
};
