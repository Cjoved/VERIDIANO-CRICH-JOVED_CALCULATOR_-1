const display = document.getElementById("display");
const autodisplay = document.getElementById("placeholderResult");
const history = document.getElementById("history");
var result;

let  autocompute = false;

function clearDisplay(){
    display.value ="";
    autodisplay.value = "";
    autocompute = false;

}
function AclearDisplay(){
    location.reload();
}

function deleteToDisplay(){
    var currentValue = display.value;
    display.value= currentValue.slice(0, -1);
    autodisplay.value = "";
    autocompute = false;
}
function updateHistory(calculation){
    history.innerHTML += calculation + '<br>';
}

function appendToDisplay(input) {
    var displayElement = document.getElementById("display");
   if (autocompute) {
        displayElement.value= '';
        autodisplay.value = '';
        autocompute = false;
 }
    if (input === "√") {
        displayElement.value += "√";

    } 
    else if (input === "²"){
        displayElement.value += "²";
    }
    else if (input === "%"){
        displayElement.value += "%";
    }

    else if (input === "=") {
        calculate();
        autodisplay.value = "";
        autocompute = false;
        
    } else if (/[0-9+\-/*^()]/.test(input)) {
        displayElement.value += input;
        Resultupdate();
    }
 
}

function calculate() {
    try {
        var displayvalue = document.getElementById("display").value;
        var displayElement = document.getElementById("display");

        if (displayvalue.trim() === "") {
            displayElement.value = "ERROR: Empty input";
            return;
        }

        if (displayvalue.includes("√")) {
            var squareroot = parseFloat(displayvalue.substring(1)); 
            result = Math.sqrt(squareroot);
            displayElement.value = result ;
            updateHistory("√" + squareroot + " = " + result);
        }
        else if (displayvalue.endsWith("^2")){
            var squared = parseFloat(displayvalue.substring(0, displayvalue.length - 1));
            result = Math.pow(squared, 2);
            displayElement.value = result ;
            updateHistory(displayvalue+"="+ result);
        
        }else if (displayvalue.endsWith("%")) {
            var percent = parseFloat(displayvalue.substring(0, displayvalue.length - 1));
            result = (percent / 100) * autodisplay.value;
            displayElement.value = result;
            updateHistory(displayvalue + " = " + result);
        }
         else {
            //result = new Function('return ' + displayvalue)();
            result= eval(displayvalue);
            displayElement.value = result;
            updateHistory(displayvalue + " = " + result);
        }
        autocompute = true;
    } catch (error) {
        displayElement.value = "ERROR";
        autocompute = false;
    }
}

function toggleSign(){

    result = display.value;
    if (display.value !== '0' && display.value !== 'Error') {
        if (result.startsWith('-')) {
            display.value = display.value.slice(1);

        }else if (display.value=== "%" || display.value === "√")
        {
            display.value = "ERROR";
        }
        
         else {
            display.value = '-' + display.value;
        }
}
}
function Resultupdate() {
    try {
        let displayValue = display.value;

        if (displayValue.trim() === "") {
            autodisplay.value = "";
            return;
        }

        let result;
        if (displayValue.startsWith("√")) {
            displayValue = displayValue.slice(1);
            let squareroot = parseFloat(displayValue);
            result = Math.sqrt(squareroot);
        } else if (displayValue.includes("^2")) {
            displayValue = displayValue.replace("^2", "**2");
            let squared = parseFloat(displayValue);
            result = eval(squared);
        } else {
            result = eval(displayValue);
        }

        
        autodisplay.value = result;
    } catch (error) {
        autodisplay.value = "";
    }
    
}
function hide(){

    if (history.style.width === "300px") {
        history.style.width = "0px";
        txthide.style.color = "transparent"; 
        history.style.color = "transparent";
 
        
    } else {
        history.style.width = "300px";
        txthide.style.color = "#807e7e";
        history.style.color ="#807e7e";
    }
}
