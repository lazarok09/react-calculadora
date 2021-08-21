import { useEffect, useState } from "react";
import styles from "./index.module.css";
export const Calculator = () => {
  const [number, setNumber] = useState();
  const [nextNumber, setNextNumber] = useState();
  const [expression, setExpression] = useState();
  const [result, setResult] = useState();

  // background
  const [customColor, setCustomColor] = useState();

  // function to clear states
  const clear = () => {
    setNumber((prevState) => undefined);
    setNextNumber((prevState) => undefined);
    setExpression((prevState) => undefined);
    setResult((prevState) => undefined);
  };
  // when a number is clicked:
  const handleNumber = (e) => {
    // caso a expression seja clicada
    if (!!expression) {
      let prevNumNext = nextNumber;
      // primeiro valor
      if (prevNumNext === undefined) {
        setNextNumber(e.target.innerHTML);
        return;
      }
      // normalmente
      setNextNumber(prevNumNext + e.target.innerHTML);
      return;
    }

    let prevNum = number;
    if (prevNum === undefined) {
      setNumber(e.target.innerHTML);
      return;
    }
    setNumber(prevNum + e.target.innerHTML);
  };

  // when a expression is selected
  const handleExpression = (e) => {
    if (!!number || !!nextNumber) {
      setExpression(e.target.innerHTML);
    }
  };

  // when = simbol is clicked
  const handleResult = (e) => {
    const intNumber = parseInt(number);
    const intNextNumber = parseInt(nextNumber);
    const result =
      expression === "+"
        ? intNumber + intNextNumber
        : expression === "-"
        ? intNumber - intNextNumber
        : expression === "*"
        ? intNumber * intNextNumber
        : expression === "/"
        ? intNumber / intNextNumber
        : null;

    setResult((r) => result);
  };

  // re-render the calculator when background changes
  useEffect(() => {
    let result = document.getElementById("main");
    result.style.background = customColor;
  }, [customColor]);

  // when background button is clicked
  function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  const handleBackgroundColor = () => {
    let randomColor = getRandomColor();
    setCustomColor(randomColor);
    let result = document.getElementById("main");
    result.style.color = "white";
    let display = document.getElementById("display");
    display.style.color = "black";
  };

  return (
    <div id="main" className={styles.calculatorFrame}>
      <div id="display" className={styles.calculatorNumberNow}>
        {number} {expression} {nextNumber}{" "}
        <span>{result && `= ${result}`}</span>
      </div>

      <div onClick={clear} className={styles.clearButton}>
        <button>Clear</button>
      </div>
      <div className={styles.calculatorNumbersAndExpressionsContainer}>
        <div className={styles.calculatorNumbers}>
          <div onClick={handleNumber}>1</div>
          <div onClick={handleNumber}>2</div>
          <div onClick={handleNumber}>3</div>
          <div onClick={handleNumber}>4</div>
          <div onClick={handleNumber}>5</div>
          <div onClick={handleNumber}>6</div>
          <div onClick={handleNumber}>7</div>
          <div onClick={handleNumber}>8</div>
          <div onClick={handleNumber}>9</div>
          <div className={styles.zero} onClick={handleNumber}>
            0
          </div>
        </div>
        <div className={styles.calculatorExpressions}>
          <div onClick={handleExpression}>+</div>
          <div onClick={handleExpression}>-</div>
          <div onClick={handleExpression}>*</div>
          <div onClick={handleExpression}>/</div>
          <div className={styles.warnColor} onClick={handleResult}>
            =
          </div>
        </div>
      </div>

      <footer>
        <div
          style={{ color: "white", height: "5rem", marginTop: "1rem" }}
          className={styles.clearButton}
          onClick={handleBackgroundColor}
        >
          <h2>Random background</h2>
        </div>
      </footer>
    </div>
  );
};
