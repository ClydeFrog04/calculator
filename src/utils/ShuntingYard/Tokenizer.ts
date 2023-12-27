const TokenTypes = {
    NUMBER: "NUMBER",
    IDENTIFIER: "IDENTIFIER",
    ADDITION: "+",
    SUBTRACTION: "-",
    MULTIPLICATION: "*",
    DIVISION: "/",
    EXPONENTIATION: "^",
    PARENTHESIS_LEFT: "(",
    PARENTHESIS_RIGHT: ")"
};

const TokenSpec = [
    [/^\s+/, null],
    [/^(?:\d+(?:\.\d*)?|\.\d+)/, TokenTypes.NUMBER],
    [/^[a-z]+/, TokenTypes.IDENTIFIER], // Now we can understand letters!
    [/^\+/, TokenTypes.ADDITION],
    [/^\-/, TokenTypes.SUBTRACTION],
    [/^\*/, TokenTypes.MULTIPLICATION],
    [/^\//, TokenTypes.DIVISION],
    [/^\^/, TokenTypes.EXPONENTIATION],
    [/^\(/, TokenTypes.PARENTHESIS_LEFT],
    [/^\)/, TokenTypes.PARENTHESIS_RIGHT]
];

type Token = {
    type: string | RegExp,
    value: any
}

export class Tokenizer {
    private input: string;
    private cursor: number;

    constructor(input: string) {
        console.log("input was:", input);
        this.input = input;
        this.cursor = 0;
    }

    hasMoreTokens() {
        return this.cursor < this.input.length;
    }

    match(regex: RegExp, inputSlice: string) {
        const matched = regex.exec(inputSlice);
        if (matched === null) {
            return null;
        }
        this.cursor += matched[0].length;
        return matched[0];
    }

    getNextToken(): Token | null {
        if (!this.hasMoreTokens()) {
            return null;
        }
        const inputSlice = this.input.slice(this.cursor);

        for (let [regex, type] of TokenSpec) {
            const tokenValue = this.match(regex as RegExp, inputSlice);

            if (tokenValue === null) {
                continue;
            }

            if (type === null) {
                return this.getNextToken();
            }

            return {
                type,
                value: tokenValue
            };
        }

        throw new SyntaxError(`Unexpected token: "${inputSlice[0]}"`);
    }
}
