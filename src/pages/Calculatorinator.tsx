import React, {useState} from "react";
import "./Calculatorinator.css";
import Button from "../components/Button/Button.tsx";
import {getRPN} from "../utils/ShuntingYard/ShuntingYard";

interface CalculatorinatorProps {

}

const Calculatorinator = (props: CalculatorinatorProps) => {
    const TAG = "[Calculatorinator.tsx]";
    const [answer, setAnswer] = useState<string>("4");

    const isLastCharOperator = () => {
        const lastChar = answer.charAt(answer.length - 1);
        return (lastChar === "+" ||
            lastChar === "-" ||
            lastChar === "*" ||
            lastChar === "/");
    };

    const canAddDot = () => {
        if (!answer.includes(".")) return true;
        const lastPlus = answer.lastIndexOf("+");
        const lastminus = answer.lastIndexOf("-");
        const lastmult = answer.lastIndexOf("*");
        const lastDiv = answer.lastIndexOf("/");
        const lastplusMin = Math.max(lastPlus, lastminus);
        const lastMultDiv = Math.max(lastmult, lastDiv);
        const checkIndex = Math.max(lastplusMin, lastMultDiv);
        const lastDot = answer.lastIndexOf(".");
        return lastDot < checkIndex;
    };

    const solveProblem = (equation: string) => {
        console.log(TAG, equation);
        console.log(TAG, getRPN(equation));
        //"((?<=[/*\\-+])|(?=[/*\\-+]))";
        // const pattern = /((?<=[/*\-+])|(?=[/*\-+]))/;
        //https://stackoverflow.com/questions/43801602/split-an-arithmetic-expression-with-a-regex
        const pattern = /([*/]|\b\s*-|\b\s*\+)/g;
        const equationParts = equation.split(pattern);
        console.log(TAG, "equation bits:", equationParts);

        if (equationParts.length <= 2) {
            return;//prevents a crash if the equation is something like 5+, this can't be solved yet obvs
        }
    };

    const digitBtnHandler = (e: React.MouseEvent) => {
        const btnText = (e.target as HTMLButtonElement).value;

        switch (btnText.toLowerCase()) {
            case ".":
                if (canAddDot()) {
                    setAnswer(answer + btnText);
                }
                break;
            case "clear":
                setAnswer("");
                break;
            case "back":
                setAnswer(answer.substring(0, answer.length - 1));
                break;
            case "solve":
                if (!isLastCharOperator()) {
                    solveProblem(answer.replaceAll(",", ""));//removing commas for computation only, they WILL be included in the final string :]
                }
                break;
            case "-":
                if (!isLastCharOperator()) {//minus handled differently than other operators to allow negative input
                    setAnswer(answer + btnText);
                }
                break;
            case "+":
            case "*":
            case "/":
                if (!isLastCharOperator() && answer.length !== 0) {
                    setAnswer(answer + btnText);
                }
                break;
            default://default will be all the digits, just add them to the answer
                setAnswer(answer + btnText);
        }
    };


    return (
        <div className="calculatorinator">
            {/*<textarea className="answerArea" readOnly={true} value={"EEEEEEEE"}/>*/}
            <div id={"answerArea"} className="answerArea">{answer}</div>
            <Button id={"clear"} onClick={digitBtnHandler} text={"clear"}/>
            <Button id={"back"} onClick={digitBtnHandler} text={"back"}/>
            <Button id={"seven"} onClick={digitBtnHandler} text={"7"}/>
            <Button id={"eight"} onClick={digitBtnHandler} text={"8"}/>
            <Button id={"nine"} onClick={digitBtnHandler} text={"9"}/>
            <Button id={"multiply"} onClick={digitBtnHandler} text={"*"}/>
            <Button id={"divide"} onClick={digitBtnHandler} text={"/"}/>
            <Button id={"four"} onClick={digitBtnHandler} text={"4"}/>
            <Button id={"five"} onClick={digitBtnHandler} text={"5"}/>
            <Button id={"six"} onClick={digitBtnHandler} text={"6"}/>
            <Button id={"add"} onClick={digitBtnHandler} text={"+"}/>
            <Button id={"subtract"} onClick={digitBtnHandler} text={"-"}/>
            <Button id={"one"} onClick={digitBtnHandler} text={"1"}/>
            <Button id={"two"} onClick={digitBtnHandler} text={"2"}/>
            <Button id={"three"} onClick={digitBtnHandler} text={"3"}/>
            <Button id={"zero"} onClick={digitBtnHandler} text={"0"}/>
            <Button id={"dot"} onClick={digitBtnHandler} text={"."}/>
            <Button id={"solve"} onClick={digitBtnHandler} text={"solve"}/>
        </div>
    );
};

export default Calculatorinator;
