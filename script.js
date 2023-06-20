

let txtDisplay = '0';
let upperDisplayTxt = '';

const lowerDisplay = document.querySelector('.lower');
const upperDisplay = document.querySelector('.upper');
const keypad = document.querySelector('.keypad');


window.addEventListener('keydown', function(e){
    let obj = document.querySelector(`button[data-option="${e.key}"]`);
    if (e.key == 'Enter' && !upperDisplayTxt) e.preventDefault();
    if (e.key == 'Enter' && upperDisplayTxt)
        obj = document.querySelector(`button[data-option="="]`);
    try{
        let option = obj.getAttribute("data-option");
        calculator(option);}
    catch (e){
        return;
    }
});


keypad.addEventListener('click', function(e){
    let option = e.target.getAttribute("data-option");
    if (!option) return;
    calculator(option);

});


const calculator = function(option){
    deleteLast(option);
    clearAll(option);
    checkSign(option);
    if (txtDisplay.length < 10){
        displayTxt(option);}
    checkOperator(option);
    checkEquals(option);
}

const add = function(num1, num2){
    return num1 + num2; 
}

const subtract = function(num1, num2){
    return num1 - num2; 
}

const multiply = function(num1, num2){
    return num1 * num2; 
}

const divide = function(num1, num2){
    if (num2 == 0 || num2 == -0) return 'ERROR';
    return num1 / num2; 
}

const mod = function(num1, num2){
    return num1 % num2; 
}


const checkDecimal = function(txt){
    if (txt == '.'){
         if (!txtDisplay.includes('.')){
            txtDisplay += txt;      
    }
}

}

const checkSign = function(txt){
    if (txt == 'sign'){
        if (txtDisplay.includes('-')){
            txtDisplay = txtDisplay.substring(1);
        }
        else{
            txtDisplay = '-' + txtDisplay;
        }
    }
    lowerDisplay.textContent = txtDisplay;
   
}


const displayTxt = function(txt){
    checkDecimal(txt); 
    if (+txt && (txtDisplay == '0' || txtDisplay == '-0')){
        txtDisplay = txtDisplay.slice(0, -1);
        txtDisplay += txt; 
    }
    else if (+txt == 0 && (txtDisplay == '0' || txtDisplay == '-0')){}
    else if (+txt || +txt == 0){
        txtDisplay += txt; 
    }
    
    lowerDisplay.textContent = txtDisplay;
}


const deleteLast = function(txt){
    if (txt == 'Backspace'){
        if ((txtDisplay.length <= 1) || (txtDisplay.includes('-') && txtDisplay.length == 2)){
            txtDisplay = '0';
        }
        else{
            txtDisplay = txtDisplay.slice(0, -1);
        }
        
    }
}

const clearAll = function(txt){
    if (txt == 'Escape'){
        txtDisplay = '0';
        upperDisplayTxt = '';
        upperDisplay.textContent = upperDisplayTxt;

    }
}

const checkOperator = function(op){
    if (op.match('[(%+*/^)-]')){
        if (!upperDisplayTxt){
            if (txtDisplay.slice(-1) == '.'){
                txtDisplay = txtDisplay.slice(0, -1);
            }
            upperDisplayTxt = `${txtDisplay} ${op}`;
            txtDisplay = '0';
            lowerDisplay.textContent = txtDisplay;
        }
        else{        
            upperDisplayTxt = upperDisplayTxt.slice(0, -1) + '' + op;      
        }
        
        upperDisplay.textContent = upperDisplayTxt;
    }
    
}

const checkEquals = function(op){
    if (op == '='){
        if (upperDisplayTxt)
        {
            let arr = upperDisplayTxt.split(" ");
            let operatedNumber = operate(arr[1], +arr[0], +txtDisplay);
            txtDisplay = operatedNumber.toString();
            if (txtDisplay.includes('.')){
                txtDisplay = (+txtDisplay).toFixed(2);
            }
            else if (txtDisplay.length > 10) {
                let num = (+txtDisplay).toExponential(2);
                txtDisplay = num.toString();
            }
            lowerDisplay.textContent = txtDisplay;
            upperDisplayTxt = '';
            upperDisplay.textContent = upperDisplayTxt;
            if (txtDisplay == 'ERROR') txtDisplay = '0';

   
        }
    }
}


const operate = function(op, num1, num2){

    switch(op){
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2); 
        case '%':
            return mod(num1, num2); 

    }

}

