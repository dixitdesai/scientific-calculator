const body = document.body;
const input = document.querySelector("input");
const buttons = document.querySelectorAll("button");
const backspace = document.querySelector(".backspace");
const unit = document.querySelector(".unit");
const mc = document.querySelector(".mc");
const mr = document.querySelector(".mr");
const ms = document.querySelector(".ms");

const operators = ["+", "×", "÷", "-", "*", "/"];
const keywords = ["(" , ")", "!", "."];


const isNumber = (num) => {
    if (num.length > 1)
        return false;
    return (num >= '0' && num <= '9');
}

const isOperator = (op) => {
    if (op.length > 1)
        return false;
    return operators.includes(op);
}


const isKeyword = (key) => {
    if (key.length > 1)
        return false;
    return keywords.includes(key);
}


const valid = (value) => {
    if (value === "×")   
        return "*";
    else if (value === "÷") {
        return "/";
    }
    return value;
}


// Factorial
const factorial = (num) => {
    console.log(num, typeof num);
    num = num.slice(0, num.length - 1);
    num = +num;
    if (num === 0 || num === 1)
      return 1;
    for (let i = num - 1; i >= 1; i--) {
      num *= i;
    }
    return num;
}


const calculateLog = (expression, isLog) => {
    let expr;
    if (isLog)
        expr = "log";
    else
        expr = "ln";

    let index = expression.search(expr);

    let substr = "";
    
    let isParenthesis = false;

    for (var i = index+expr.length; i < expression.length; i++) {
        if (isNumber(expression[i])) 
            substr += expression[i];
        else if (expression[i] === "(" || expression[i] === ")") {
            isParenthesis =  true;
            continue;
        }
        else
            break;
    }
    
    console.log("substr" , substr);

    let res;
    if (isLog)
        res =  Math.log(substr) / Math.LN10;
    else 
        res = Math.log(substr)

    
    if (!isParenthesis)
        expression = expression.replace(`${expr}${substr}`, res);
    else 
        expression = expression.replace(`${expr}(${substr})`, res);
    
    return expression;

}


const formatExpression = (expression) => {
    // LOG
    while (expression.includes("log")) {
        expression = calculateLog(expression, true);
    }

    // LN
    while (expression.includes("ln")) {
        expression = calculateLog(expression, false);
    }

    let splitedArr;
    // Power
    splitedArr = expression.split("^");
    expression = splitedArr.join("**");

    // Sin
    splitedArr = expression.split("sin");
    expression = splitedArr.join("Math.sin");

    // Cos
    splitedArr = expression.split("cos");
    expression = splitedArr.join("Math.cos");

    // tan
    splitedArr = expression.split("tan");
    expression = splitedArr.join("Math.tan");

    // Round
    splitedArr = expression.split("round");
    expression = splitedArr.join("Math.round");

    // Floor
    splitedArr = expression.split("floor");
    expression = splitedArr.join("Math.floor");

    // Ceil
    splitedArr = expression.split("ceil");
    expression = splitedArr.join("Math.ceil");

    return expression;
}

// Expression Evaluation
const evaluate = (expression) => {
    try {

        expression = formatExpression(expression);
        console.log(expression);
        return eval(expression);

    } catch (error) {
        alert("Please enter valid Expression!");
        return expression;
    }
}


// Keyboard Events
body.addEventListener("keypress", (e) => {

    if (e.key === "=" || e.key === "Enter") {

        let result = evaluate(input.value);

        input.value = result;
        
        if (e.key === "=")
            setTimeout(()=> {
                input.value = input.value.slice(0, input.value.length - 1);
            }, 0);
    }
    else if (!(isNumber(e.key) || (isOperator(e.key)) || (isKeyword(e.key)))) {
       
        alert("Please enter a valid number!")
        let value = input.value;
        
        setTimeout(()=>{
            input.value = value;
        }, 0);
    }
    
})  



const handleClick = (key) => {
    if (isNumber(key) || isOperator(key) || isKeyword(key)) {
        input.value += valid(key);
    }
    else {
        switch (key) {
            case "=":
                input.value = evaluate(input.value);
                break;

            case "C":
                input.value = "";
                break;

            case "e":
                if(input.value && isNumber(input.value[input.value.length - 1])){ 
                    alert("e Can't be right after a number");
                    break;
                }
                input.value += "2.71827";
                break;

            case "π":
                if(input.value && isNumber(input.value[input.value.length - 1])){ 
                    alert("Pi Can't be right after a number");
                    break;
                }
                input.value += "3.14159";
                break;

            case "mod":
                input.value += "%";
                break;

            case "+/-":
                if (input.value[0] === "-") {
                    input.value = input.value.slice(1);
                }
                else {
                    input.value = "-" + input.value;
                }
                break;

            case "n!":
                input.value = factorial(input.value + "!");
                break;

            case "1/x":
                if(input.value.length && isNumber(input.value[input.value.length - 1])){ 
                    alert("Enter valid input!");
                    break;
                }
                input.value += "1/";
                break;
            
            case "|x|":
                input.value = input.value && Math.abs(eval(input.value));    
                break;

            case "x2":
                input.value += "^2";
                break;

            case "√x":
                input.value = "^0.5";
                break;

            case "log":
                input.value += "log";
                break;

            case "ln":
                input.value += "ln";
                break;

            case "10x":
                input.value += "10^";
                break;

            case "xy":
                input.value += "^";
                break;
            
            case "exp":
                input.value += "*10^";
                break;

            case "F-E":
                const val = +input.value;
                input.value = val.toExponential();
                break;

            case "sin":
                input.value += "sin(";
                break;

            case "cos":
                input.value += "cos(";
                break;

            case "tan":
                input.value += "tan(";
                break;

            case "round()":
                input.value += "round(";
                break;
            
            case "ceil()":
                input.value += "ceil(";
                break; 
                
            case "floor()":
                input.value += "floor(";
                break; 

            case "MS":
                localStorage.setItem("memory", input.value);
                mc.removeAttribute("disabled");
                mr.removeAttribute("disabled");
                ms.setAttribute("disabled", true);
                break;

            case "MC":
                localStorage.setItem("memory", "");
                ms.removeAttribute("disabled");
                mc.setAttribute("disabled", true);
                mr.setAttribute("disabled", true);
                break;

            case "MR":
                input.value = localStorage.getItem("memory");
                break;
            
            case "M+":
                var a = +localStorage.getItem("memory");
                var b = +input.value;
                var c = a+b;
                console.log(c);
                localStorage.setItem("memory", c);
                input.value = c;
                break;

            case "M-":
                var a = +localStorage.getItem("memory");
                var b = +input.value;
                var c = a-b;
                localStorage.setItem("memory", c);
                input.value = c;
                break;

            case "DEG":
                break;
            default:
                break;
        }
    }
}


// Click Events 
buttons.forEach((btn) => {
    btn.addEventListener("click", (e)=> {
        console.log(e.target);
        handleClick(e.target.innerText);

    })
});

backspace.addEventListener("click", (e) => {
    
    input.value = input.value.slice(0, input.value.length - 1);
});

if (localStorage.getItem("memory")) {
    mc.removeAttribute("disabled");
    mr.removeAttribute("disabled");
    ms.setAttribute("disabled", true);
}

