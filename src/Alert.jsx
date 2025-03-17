import { useEffect, useState } from "react";

function Alert({ isFinish, setIsFinish, setResetRef }) {
  const [second, setSecond] = useState(5);
  useEffect(() => {
    const countDownId = setInterval(() => {
      if (second > 0) {
        setSecond((pre) => pre - 1);
      } else if (second == 0) {
        setResetRef((pre) => !pre);
        setIsFinish(false);
      }
    }, 1000);
    return () => clearInterval(countDownId);
  }, [second]);

  return (
    <div className="demo">
      <p>Congrats!</p>
      <p>{second}</p>
      <button
        className="continueBtn"
        onClick={() => {
          setIsFinish(false);
          setResetRef((pre) => !pre);
        }}
      >
        Continue
      </button>
    </div>
  );
}
export default Alert;
