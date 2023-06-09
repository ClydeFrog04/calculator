import {operators} from "./operators.ts";

const assert =  (predicate) => {
    if(predicate) return;
    throw new Error("Assertion failed due to invalid token");
}

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
                while(topOfStack !== "("){
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

    for(let i of input){
        if(i === " ") continue;
        handleToken(i);
    }
    while(stack.length !== 0){
        assert(peek() !== "(");
        addToOutput(stack.pop());
    }
    return out;
}
