//reference for this code: https://inspirnathan.com/posts/154-shunting-yard-algorithm-with-tokenizer
/*
 * I decided to follow a tutorial for using postfix notation with a tokenizer to evaluate expressions. My original java
 * solution worked but felt it was not the best it could be, more difficult to maintain and extend. This method is more
 * in line with how calculators are written and function so that's what i wanted to do! :]
 * if you'd like to see the original android version check out my github: https://github.com/ClydeFrog04/AndroidCalculator
 */
import {operators} from "./operators.ts";
import {Tokenizer} from "./Tokenizer";

const assert = (predicate) => {
    if (predicate) return;
    throw new Error("Assertion failed due to invalid token");
};

export const evaluateEquation = (input) => {
    console.log("evaluating:", input);
    const opSymbols = Object.keys(operators);
    const stack = [];
    let output = [];

    const peek = () => {
        return stack.at(-1);
    };

    const addToOutput = (token) => {
        output.push(token);
    };

    const handlePop = () => {
        const op = stack.pop();

        if (op === "(") return;

        const right = parseFloat(output.pop());
        const left = parseFloat(output.pop());

        switch (op) {
            case "+":
                return left + right;
            case "-":
                return left - right;
            case "*":
                return left * right;
            case "/":
                return left / right;
            case "^":
                return left ** right;
            default:
                throw new Error(`Invalid operation: ${op}`);
        }
    };

    const handleToken = (token) => {
        const o1 = token;
        let o2;
        let topOfStack;
        console.log("handling token:", token);
        switch (true) {
            case !isNaN(parseFloat(token)):
                addToOutput(token);
                break;
            case opSymbols.includes(token):
                // const o1 = token;
                o2 = peek();

                while (
                    o2 !== undefined &&
                    o2 !== "(" &&
                    (operators[o2].precedence > operators[o1].precedence ||
                        (operators[o2].precedence === operators[o1].precedence &&
                            operators[o1].association === "left"))
                    ) {
                    addToOutput(handlePop());
                    o2 = peek();
                }
                stack.push(o1);
                break;
            case token === "(":
                stack.push(token);
                break;
            case token === ")":
                topOfStack = peek();
                while (topOfStack !== "(") {
                    assert(stack.length !== 0);
                    addToOutput(handlePop());
                    topOfStack = peek();
                }
                assert(peek() === "(");
                handlePop();
                break;
            default:
                throw new Error(`Invalid token: ${token}`);
        }
    };

    const tokenizer = new Tokenizer(input);
    let token;
    while ((token = tokenizer.getNextToken())) {
        handleToken(token.value);
    }

    while (stack.length !== 0) {
        assert(peek() !== "(");
        addToOutput(handlePop());
    }

    return output[0];
};


export function getRPN(input: string): string {
    const opSymbols = Object.keys(operators);
    const stack: string[] = [];
    let out = "";

    const peek = () => {
        return stack.at(-1);
    };
    const addToOutput = (token: string | undefined) => {
        out += " " + token;
    };

    const handlePop = () => {
        return stack.pop();
    };

    const handleToken = (token: string) => {
        let o1: string;
        let o2: string | undefined;
        let topOfStack: string | undefined;

        switch (true) {
            case !isNaN(parseFloat(token)):
                addToOutput(token);
                break;
            case opSymbols.includes(token):
                o1 = token;
                o2 = peek();
                while (
                    o2 !== undefined &&
                    o2 !== "(" &&
                    //@ts-ignore
                    (operators[o2].precedence > operators[o1].precedence ||
                        //@ts-ignore
                        (operators[o2].precedence === operators[o1].precedence &&
                            //@ts-ignore
                            operators[o1].association === "left"))
                    ) {
                    addToOutput(handlePop());
                    o2 = peek();
                }
                stack.push(o1);
                break;
            case token === "(":
                stack.push(token);
                break;
            case token === ")":
                topOfStack = peek();
                while (topOfStack !== "(") {
                    assert(stack.length !== 0);
                    addToOutput(handlePop());
                    topOfStack = peek();
                }
                assert(peek() === "(");
                handlePop();
                break;
            default:
                throw new Error(`Invalid token ${token}`);
        }
    };

    // for(let i of input){
    //     if(i === " ") continue;
    //     handleToken(i);
    // }

    const tokenizer = new Tokenizer(input);
    let token;
    while ((token = tokenizer.getNextToken())) {
        handleToken(token.value);
    }

    while (stack.length !== 0) {
        assert(peek() !== "(");
        addToOutput(stack.pop());
    }
    return out;
}
