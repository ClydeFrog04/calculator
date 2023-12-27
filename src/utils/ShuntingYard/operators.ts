export const operators = {
    "u":{
        precedence: 4,
        association: "right"
    },
    "^":{
        precedence: 4,
        association: "right"
    },
    "*":{
        precedence: 3,
        association: "left"
    },
    "/":{
        precedence: 3,
        association: "left"
    },
    "+":{
        precedence: 2,
        association: "left"
    },
    "-":{
        precedence: 2,
        association: "left"
    },
}
