const container = document.querySelector(".buttonsContainer");
let display = document.querySelector(".displayText");
let firstNum;
var secNum;
let thirdNum;
let fourthNum;
let fifthNum;
let operator;
let calc;


function createDivs(rows, divs) {
    for(let i = 0; i < rows; i++) {
        const rowDiv = document.createElement('div');
        rowDiv.className = "row";
        container.appendChild(rowDiv);
        for(let b = 0; b < divs; b++) {
            const colDiv = document.createElement('div');
            colDiv.className = `box`;
            colDiv.id = `boxNumber`;
            rowDiv.appendChild(colDiv);
            
           
        }   
    }
}

function nameButtons() {
    box[0].textContent = "1";
    box[1].textContent = "2";
    box[2].textContent = "3";
    box[3].textContent = "+";
    box[3].id = "boxAdd";
    box[4].textContent = "4";
    box[5].textContent = "5";
    box[6].textContent = "6";
    box[7].textContent = "-";
    box[7].id = "boxSubtract";
    box[8].textContent = "7";
    box[9].textContent = "8";
    box[10].textContent = "9";
    box[11].textContent = "*";
    box[11].id = "boxMultiply";
    box[12].textContent = "0";
    box[13].textContent = "C";
    box[13].id = "boxClear";
    box[14].textContent = "=";
    box[14].id = "boxEqual";
    box[15].textContent = "/";
    box[15].id = "boxDivide";
}

function buttonClicked() {
    box.forEach(boxes => boxes.addEventListener("mousedown", function(e){
        boxes.classList.add("clicked");
    }));
    box.forEach(boxes => boxes.addEventListener("mouseup", function() {
        boxes.classList.remove("clicked");
        if (boxes.id === "boxNumber") {
            getNumbers(boxes);

        } else if (boxes.id === "boxAdd") {
            logic(boxes, "clickLogic");

        } else if (boxes.id === "boxSubtract") {
            logic(boxes, "clickLogic");

        } else if (boxes.id === "boxMultiply") {
            logic(boxes, "clickLogic");

        } else if (boxes.id === "boxDivide") {
            logic(boxes, "clickLogic");

        } else if (boxes.id === "boxEqual") {
            if (operator === "+" && secNum !== undefined) {
                calc = add();
                logic(boxes, "operatorLogic");

            } else if (operator === "-" && secNum !== undefined) {
                calc = sub();
                logic(boxes, "operatorLogic");

            } else if (operator === "*" && secNum !== undefined) {
                calc = mult();
                logic(boxes, "operatorLogic");

            } else if (operator === "/" && secNum !== undefined) {
                calc = div();
                logic(boxes, "operatorLogic");
            } 

        } else if (boxes.id === "boxClear") {
            reset();
            calc = undefined;
            display.textContent = "0";
        }



    }))
}

function add() {
    let result = firstNum + secNum;
    return Math.round(result * 100) / 100;
}

function sub() {
    result = firstNum - secNum;
    return Math.round(result * 100) / 100;

}

function mult() {
    result = firstNum * secNum;
    return Math.round(result * 100) / 100;
}

function div() {
    result = firstNum / secNum;
    return Math.round(result * 100) / 100;
}

function reset() {
    firstNum = undefined;
    secNum = undefined;
    operator = undefined;
}

function logic(boxes, option) {
    if (option === "clickLogic") {
        if (firstNum !== null && secNum === undefined && operator === undefined) {
            if (firstNum !== undefined) {
                operator = `${boxes.textContent}`;
                display.textContent += ` ${operator} `;
                console.log(firstNum);
            }
        }
    } else if (option === "operatorLogic") {
        console.log("hello");
        if (calc.toString().length > 10) {
            display.textContent = "Invalid Number"
        } else {
            display.textContent = calc;
        }
        reset();
        firstNum = calc;
    }
    

}

function getNumbers(item) {
    let number = parseInt(item.textContent);
    if (operator === undefined && firstNum !== null) {
        if (firstNum === undefined) {
            firstNum = number;
            display.textContent = firstNum;
            //return firstNum;
            //console.log(number);
        } else {
            firstNum = parseInt(`${firstNum}${number}`);
            console.log(typeof firstNum);
            display.textContent = firstNum;
            //return firstNum;
            //console.log(number);
        }
    } else { 
        if (secNum === undefined) {
            secNum = number;
            display.textContent += secNum;
            console.log(number);
        } else {
            secNum = parseInt(`${secNum}${number}`);
            display.textContent += number;
            //console.log(number);
        }

    }
}

createDivs(4,4);
box = document.querySelectorAll('.box');
nameButtons();
display.textContent = "0";
buttonClicked();
