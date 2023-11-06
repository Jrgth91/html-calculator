// Cache DOM Elements
const container = document.querySelector(".buttonsContainer");
let display = document.querySelector(".displayText");
let upperDisplay = document.querySelector(".upperDisplay");
let operator;
let firstNum;
let secNum;
let fullEx;
let result;
let box;
let row;
let hasDecimal = false;

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
    box = document.querySelectorAll(".box");
    row = document.querySelectorAll(".row");
}

// Adds text and data to buttons needed for display, functions and logic
function nameButtons() {
    
    let values = [
    "7", "8", "9", "/", 
    "4", "5", "6", "*", 
    "1", "2", "3", "-", 
    "0", ".", "=", "+", 
    "C", "ArrowLeft", "ArrowRight", "E", 
    "AC", "", "", "Last Res Off"];
    let ids = [
    "boxNumber", "boxNumber", "boxNumber", "boxDivide", 
    "boxNumber", "boxNumber", "boxNumber", "boxMultiply", 
    "boxNumber", "boxNumber", "boxNumber", "boxSubtract", 
    "boxNumber", "boxDecimal", "boxEqual", "boxAdd", 
    "boxClear", "boxBack", "boxForward", "boxExponent", 
    "boxClearAC", "Notset", "boxLastCalc", "boxLastCalc"];
      for (let i = 0; i < box.length; i++) {
        box[i].textContent = values[i];
        box[i].dataset.key = values[i];
        box[i].id = ids[i];
    }
    box[16].dataset.key = "c";
    box[17].textContent = "<";
    box[18].textContent = ">";
    box[19].dataset.key = "e";
    box[20].dataset.key = "a";
    box[23].parentNode.removeChild(box[23]);
    box[20].style.flex = "1";
    box[21].style.flex = "1";
    box[22].style.flex = "2";
    box[22].textContent = "Display Last Number";
}

function clickEvents() {
    container.addEventListener("mousedown", function(e) {
        if (e.target.classList.contains("box")) {
            e.target.classList.add("clicked");
        }
    });
    container.addEventListener("mouseup", function(e) {
        if (e.target.classList.contains("box")) {
            e.target.classList.remove("clicked");
            let data = e.target.textContent;
            
            switch(e.target.textContent) {
                case "7":
                case "8":
                case "9":
                case "4":
                case "5":
                case "6":
                case "1":
                case "2":
                case "3":
                case "0":
                    logic("Number", data);
                    break;
                case "+":
                case "-":
                case "/":
                case "*":
                case "E":
                    if (firstNum !== undefined && secNum === undefined) {
                        operator = e.target.textContent;
                    }
                    logic("Operator", data);
                    break;
                case "A":
                case "C":
                    logic("Clear", data);
                    break;
                case ".":
                    checkDecimal();
                    break;
                case "Last Res Off":
                case "<":
                case ">":
                case "=":
                    if (operator !== undefined && secNum !== undefined) {
                        result = doMath(operator);
                        display.textContent = result;
                        firstNum = fullEx = result.toString();
                        operator = undefined;
                        secNum = undefined;
                    }
            }
        } 
    }); 
}

function logic(type, item) {

    switch(type) {
        case "Number":
        let number = item;
        if  (operator === undefined) {
            if (firstNum === undefined) {
                firstNum = item;
                fullEx = firstNum;
            } else if (firstNum !== undefined && secNum === undefined) {
                firstNum += number;
                fullEx += number;
            } 
            display.textContent = fullEx;
        } else {
            if (secNum === undefined) {
                secNum = number;
            } else {
                secNum += number;
            }
            display.textContent = fullEx = `${firstNum} ${operator} ${secNum}`;
            
        } 
        break;
        case "Operator":
            display.textContent = fullEx = `${firstNum} ${operator} `;
            break;
        case "Clear":
            firstNum = operator = secNum = undefined;
            display.textContent = "0";

    }
    
}

function checkDecimal() {
        
        if (firstNum !== undefined && operator === undefined) {

            if (!firstNum.includes(".")) {
                firstNum += ".";
                fullEx += ".";
                hasDecimal = true;
            } else {
                hasDecimal = false;
            } display.textContent = fullEx;
        } else if (operator !== undefined && secNum !==undefined) {
            if (!secNum.includes(".")) {
                secNum += ".";
                fullEx += ".";
                hasDecimal = true
            } else {
                hasDecimal = false;
            }  display.textContent = fullEx;
        }         
}

function deleteChars() {
    window.addEventListener("keydown", function(e) {
        if (e.key === "Backspace") {
            if (fullEx[(fullEx.length - 1)] === " ") {
                console.log(fullEx[(fullEx.length - 1)]);
                fullEx = fullEx.slice(0,-3);
                display.textContent = fullEx;
                if (operator === "") {
                    fullEx = fullEx.slice(0,-1);
                    console.log("here");
                }
            }  else if (fullEx.length > 1) {     
                fullEx = fullEx.slice(0,-1);
                display.textContent = fullEx;
                
            }   else if (fullEx.length === 1) {
                display.textContent = "0";
                operator = undefined;
                firstNum = undefined;
                secNum = undefined; 
            }
            if (firstNum !== undefined && operator !== undefined && secNum !== undefined) {
                [firstNum,operator,secNum] = fullEx.split(" ");
                console.log(firstNum,operator,secNum);
            }
        } 
    })
}

function doMath(type) {
    ///convert strings
    let results;
    [firstNum,operator,secNum] = fullEx.split(" ");
    if (hasDecimal) {
        firstNum = parseFloat(firstNum);
        secNum = parseFloat(secNum);
    } else {
        firstNum = parseInt(firstNum);
        secNum = parseInt(secNum);
    }
    switch(operator) {

        case "+":
            results = firstNum + secNum;
            return Math.round(results * 100) / 100;
        case "-":
            results = firstNum - secNum;
            return Math.round(results * 100) / 100;
        case  "*":
            results = firstNum * secNum;
            return Math.round(results * 100) / 100;
        case "/":
            results = firstNum / secNum;
            return Math.round(results * 100) / 100;
        case "E":
            results = firstNum ** secNum;
            return Math.round(results * 100) / 100;
    }
}

 
//Main
display.textContent = "0";
createDivs(6,4);
nameButtons();
clickEvents();
deleteChars();
