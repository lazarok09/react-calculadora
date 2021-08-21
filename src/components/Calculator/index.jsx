import { useState } from "react";
import styles from "./index.module.css";
export const Calculator = () => {
  const [number, setNumber] = useState();
  const [nextNumber, setNextNumber] = useState();
  const [expression, setExpression] = useState();
  const [result, setResult] = useState();
  const clear = () => {
    setNumber((prevState) => undefined);
    setNextNumber((prevState) => undefined);
    setExpression((prevState) => undefined);
    setResult((prevState) => undefined);
  };
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
  const handleExpression = (e) => {
    if (!!number || !!nextNumber) {
      setExpression(e.target.innerHTML);
    }
  };
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
    console.log(result);
  };
  return (
    <div className={styles.calculatorFrame}>
      <div className={styles.calculatorNumberNow}>
        {number} {expression} {nextNumber}{" "}
        <span>{result && `= ${result}`}</span>
      </div>

      <div className={styles.clearButton}>
        <button onClick={clear}>Clear</button>
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
          <div className={styles.zero} onClick={handleNumber}>0</div>
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
    </div>
  );
};
