
const container = document.querySelector(".buttonsContainer");
let display = document.querySelector(".displayText");
let firstNum;
var secNum;
let operator;
let calc;

// Dynamically adds divs for button layout
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

// Adds text and data to buttons needed for display, functions and logic
function nameButtons() {
    box[0].textContent = "7";
    box[1].textContent = "8";
    box[2].textContent = "9";
    box[3].textContent = "/";
    box[3].id = "boxDivide";
    box[4].textContent = "4";
    box[5].textContent = "5";
    box[6].textContent = "6";
    box[7].textContent = "*";
    box[7].id = "boxMultiply";
    box[8].textContent = "1";
    box[9].textContent = "2";
    box[10].textContent = "3";
    box[11].textContent = "-";
    box[11].id = "boxSubtract";
    box[12].textContent = "0";
    box[13].textContent = ".";
    box[13].id = "boxDecimal";
    box[14].textContent = "=";
    box[14].id = "boxEqual";
    box[15].textContent = "+";
    box[15].id = "boxAdd";
    box[16].textContent = "AC";
    box[16].id = "boxClear"
    box[17].textContent = "C";
    box[17].id = "boxClear";
    box[18].textContent = "<";
    box[18].id = "boxBack"
    box[19].textContent = "E";
    box[19].dataset.name = "^";
    box[19].id = "boxExponent";

}

// Adds event listeners to buttons 
// There should be a few ways to shorten this. 
function buttonClicked() {
    box.forEach(boxes => boxes.addEventListener("mousedown", function(e){
        boxes.classList.add("clicked");
    }));
    box.forEach(boxes => boxes.addEventListener("mouseup", function() {
        boxes.classList.remove("clicked");
        if (boxes.id === "boxNumber") {
            getNumbers(boxes, "number");

        } else if (boxes.id === "boxDecimal") {
            getNumbers(boxes, "decimal")

        } else if (boxes.id === "boxAdd") {
            logic(boxes.textContent, "clickLogic");

        } else if (boxes.id === "boxSubtract") {
            logic(boxes.textContent, "clickLogic");

        } else if (boxes.id === "boxMultiply") {
            logic(boxes.textContent, "clickLogic");

        } else if (boxes.id === "boxDivide") {
            logic(boxes.textContent, "clickLogic");

        } else if (boxes.id === "boxExponent") {
            logic(boxes.dataset.name, "clickLogic");

        } else if (boxes.id === "boxEqual"  && secNum !== undefined) {
            convertStrings();
            if (operator === "+") {
                calc = add();
                logic(boxes.textContent, "operatorLogic");

            } else if (operator === "-") {
                calc = sub();
                logic(boxes.textContent, "operatorLogic");

            } else if (operator === "*") {
                calc = mult();
                logic(boxes.textContent, "operatorLogic");

            } else if (operator === "/") {
                calc = div();
                logic(boxes.textContent, "operatorLogic");

            } else if (operator === "^") {
                calc = exponent();
                logic(boxes.dataset.name, "operatorLogic");

            } 

        } else if (boxes.id === "boxClear") {
            reset();
            calc = undefined;
            display.textContent = "0";
        }
    }))
}

// Math functions
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

function exponent() {
    result = firstNum ** secNum;
    return Math.round(result * 100) / 100;
}

function reset() {
    firstNum = undefined;
    secNum = undefined;
    operator = undefined;
}

// Some display logic to prevent doubles of the operator between numbers
// and display errors when calculated number is longer than the  display

function logic(boxes, option) {
    if (option === "clickLogic") {
        if (firstNum !== null && secNum === undefined && operator === undefined) {
            if (firstNum !== undefined) {
                operator = `${boxes}`;
                display.textContent = `${firstNum} ${operator} `;
            } 
        } else if ( operator !== undefined) {
            
             operator = `${boxes}`;
             display.textContent = `${firstNum} ${operator} `;
             if (secNum !== undefined) {
            operator = `${boxes}`;
             display.textContent = `${firstNum} ${operator} ${secNum}`;
             }
        } 
    } else if (option === "operatorLogic") {
        if (calc.toString().length > 10) {
            display.textContent = "Error"
            calc = undefined;
            
        } else {
            display.textContent = calc;
        }
        reset();
        firstNum = calc;
    }
}


// This function prevents multiple decimals to be displayed aswell as
// update the display, this can definetly be shortened
function getNumbers(item, property) {
    let number = item.textContent;
    if (operator === undefined && firstNum !== null) {
        if (firstNum === undefined) {
            if (property === "decimal") {
                firstNum = 0;
                firstNum += ".";
                display.textContent = firstNum;
                // firstNum = parseFloat(firstNum);
            } else {
                firstNum = number;
                display.textContent = firstNum;
                console.log(typeof firstNum);
                //return firstNum;
                //console.log(number);
            }

        } else {
            if (property === "decimal" && !firstNum.includes(".")) {
                firstNum += ".";
                display.textContent = firstNum;
                console.log("float!")
                // console.log(typeof firstNum) 

            } else {
                if (property !== "decimal") {
                    firstNum += number;
                    display.textContent = firstNum;
                    //return firstNum;
                    //console.log(number);
                }
            }
        }
    
    } else { 
        if (secNum === undefined) {
            if (property !== "decimal") {
                secNum = number;
                display.textContent += secNum;
                console.log(number);
            }
        } else {
            if (property === "decimal") {
                if (!secNum.includes("."))
                {
                    secNum = ".";
                    display.textContent += secNum
            } else {
                display.textContent += number;
            }

        }

    }
}
}

// converts the final display string into an array then
// converts the data as either an interger or float for calulations
function convertStrings() {
    string = display.textContent;
    const numbers = string.split(` ${operator} `);
    if (numbers[0].includes(".")) {
        firstNum = parseFloat(numbers[0]);
    } else {
        firstNum = parseInt(numbers[0]);
    }
    if (numbers[1].includes(".")) {
        secNum = parseFloat(numbers[1]);
    } else {
        secNum = parseInt(numbers[1]);
    }
}

// main
createDivs(5,4);
box = document.querySelectorAll('.box');
nameButtons();
display.textContent = "0";
buttonClicked();



