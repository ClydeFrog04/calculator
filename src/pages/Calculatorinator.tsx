import React, {useState} from "react";
import "./Calculatorinator.css";
import Button from "../components/Button/Button.tsx";

interface CalculatorinatorProps {

}

const Calculatorinator = (props: CalculatorinatorProps) => {
    const TAG = "[Calculatorinator.tsx]";
    const [answer, setAnswer] = useState<string>("0");

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
    }

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
            <div className="answerArea">{answer}</div>
            <div className="buttons">
                <div className="left">
                    <div className="clear">
                        <Button onClick={digitBtnHandler} text={"clear"}/>
                    </div>
                    <div className="digits">
                        <Button onClick={digitBtnHandler} text={"7"}/>
                        <Button onClick={digitBtnHandler} text={"8"}/>
                        <Button onClick={digitBtnHandler} text={"9"}/>
                        <Button onClick={digitBtnHandler} text={"4"}/>
                        <Button onClick={digitBtnHandler} text={"5"}/>
                        <Button onClick={digitBtnHandler} text={"6"}/>
                        <Button onClick={digitBtnHandler} text={"1"}/>
                        <Button onClick={digitBtnHandler} text={"2"}/>
                        <Button onClick={digitBtnHandler} text={"3"}/>
                    </div>
                    <div className="zeroAndDot">
                        <Button onClick={digitBtnHandler} text={"0"}/>
                        <Button onClick={digitBtnHandler} text={"."}/>
                    </div>
                </div>
                <div className="right">
                    <div className="back">
                        <Button onClick={digitBtnHandler} text={"back"}/>
                    </div>
                    <div className="operators">
                        <Button onClick={digitBtnHandler} text={"*"}/>
                        <Button onClick={digitBtnHandler} text={"/"}/>
                        <Button onClick={digitBtnHandler} text={"+"}/>
                        <Button onClick={digitBtnHandler} text={"-"}/>
                    </div>
                    <div className="solve">
                        <Button onClick={digitBtnHandler} text={"solve"}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calculatorinator;
