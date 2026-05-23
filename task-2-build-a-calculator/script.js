const display = document.getElementById("display");

function appendValue(value){
    display.value += value;
    showResult();
}

function clearDisplay(){
    display.value = "";
}

function deleteLast(){
    display.value = display.value.slice(0, -1);
    showResult();
}

function calculate(){
    try{
        display.value = eval(display.value);
    }
    catch{
        display.value = "Error";
    }
}

// Real-time result display
function showResult(){
    try{
        if(display.value !== ""){
            let result = eval(display.value);
            console.log("Result:", result);
        }
    }
    catch{
        // Ignore invalid expressions
    }
}

// Keyboard support
document.addEventListener("keydown", (event) => {

    const key = event.key;

    if(!isNaN(key) || ['+', '-', '*', '/', '.', '%'].includes(key)){
        appendValue(key);
    }
    else if(key === "Enter"){
        calculate();
    }
    else if(key === "Backspace"){
        deleteLast();
    }
    else if(key === "Escape"){
        clearDisplay();
    }
});
