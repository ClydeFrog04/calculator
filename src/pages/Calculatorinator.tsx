import React, {useState} from "react";
import "./Calculatorinator.css";
import Button from "../components/Button/Button.tsx";
import {evaluateEquation, getRPN} from "../utils/ShuntingYard/ShuntingYard";
import {Tokenizer} from "../utils/ShuntingYard/Tokenizer";

interface CalculatorinatorProps {

}

const Calculatorinator = (props: CalculatorinatorProps) => {
    const TAG = "[Calculatorinator.tsx]";
    const [answer, setAnswer] = useState<string>("");

    const isLastCharOperator = () => {
        if(answer === undefined) return false;
        console.log(TAG, typeof answer);
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

    const printAllTokens = (equation: string) => {
        const tokenizer = new Tokenizer(equation);

        let token;
        while ((token = tokenizer.getNextToken())) {
            console.log(TAG, "token found:", token);
        }
    };

    const solveProblem = (equation: string) => {
        const value = evaluateEquation(equation);
        console.log(TAG, value);
        setAnswer(String(value));
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
                if (!isLastCharOperator() && answer.length > 0) {
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
            <Button id={"seven"} class={"digit"} onClick={digitBtnHandler} text={"7"}/>
            <Button id={"eight"} class={"digit"} onClick={digitBtnHandler} text={"8"}/>
            <Button id={"nine"} class={"digit"} onClick={digitBtnHandler} text={"9"}/>
            <Button id={"multiply"} onClick={digitBtnHandler} text={"*"}/>
            <Button id={"divide"} onClick={digitBtnHandler} text={"/"}/>
            <Button id={"four"} class={"digit"} onClick={digitBtnHandler} text={"4"}/>
            <Button id={"five"} class={"digit"} onClick={digitBtnHandler} text={"5"}/>
            <Button id={"six"} class={"digit"} onClick={digitBtnHandler} text={"6"}/>
            <Button id={"add"} onClick={digitBtnHandler} text={"+"}/>
            <Button id={"subtract"} onClick={digitBtnHandler} text={"-"}/>
            <Button id={"one"} class={"digit"} onClick={digitBtnHandler} text={"1"}/>
            <Button id={"two"} class={"digit"} onClick={digitBtnHandler} text={"2"}/>
            <Button id={"three"} class={"digit"} onClick={digitBtnHandler} text={"3"}/>
            <Button id={"zero"} class={"digit"} onClick={digitBtnHandler} text={"0"}/>
            <Button id={"dot"} onClick={digitBtnHandler} text={"."}/>
            <Button id={"exponent"} onClick={digitBtnHandler} text={"^"}/>
            <Button id={"solve"} onClick={digitBtnHandler} text={"solve"}/>
        </div>
    );
};

export default Calculatorinator;
