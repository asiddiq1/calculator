

let isDecimal = false; 
let isPositive = true;
let isNegative = false;

let txtDisplay = '0';
let upperDisplayTxt = '';

let lowerDisplay = document.querySelector('.lower');
let upperDisplay = document.querySelector('.upper');

keypad = document.querySelector('.keypad');

keypad.addEventListener('click', function(e){
    let option = e.target.getAttribute("data-option");
    calculator(option);

});

window.addEventListener('keydown', function(e){
    let obj = document.querySelector(`button[data-option="${e.key}"]`);
    try{
        let option = obj.getAttribute("data-option");
        calculator(option);
    }
    catch (e){
        return;
    }
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
         if (!isDecimal){
            txtDisplay += txt; 
            isDecimal = true;      
    }
}

}

const checkSign = function(txt){
    if (txt == 'sign'){
        if (isPositive){
            txtDisplay = '-' + txtDisplay;
            isNegative = true; 
            isPositive = false; 
        }
        else if (isNegative){
            txtDisplay = txtDisplay.substring(1);
            isPositive = true;
            isNegative = false; 
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
    else if (+txt == 0 && (txtDisplay == '0' || txtDisplay == '-0')){
        console.log('tgfgf');
    }
    else if (+txt || +txt == 0){
        txtDisplay += txt; 
    }
    
    lowerDisplay.textContent = txtDisplay;
}


const deleteLast = function(txt){
    if (txt == 'Backspace'){
        lastStr = txtDisplay.slice(-1);
        if (lastStr == '.'){
            isDecimal = false;
        }
        if (txtDisplay.length <= 1){
            txtDisplay = '0';
        }
        else{
            txtDisplay = txtDisplay.slice(0, -1);
        }
        
    }
}

const clearAll = function(txt){
    if (txt == 'ac'){
        txtDisplay = '0';
        upperDisplayTxt = '';
        upperDisplay.textContent = upperDisplayTxt;
        isDecimal = false; 
        isPositive = true;
        isNegative = false;

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
        isDecimal = false; 
        isPositive = true;
        isNegative = false;
    }
    
}

const checkEquals = function(op){
    if (op == 'Enter'){
        if (upperDisplayTxt)
        {
            let arr = upperDisplayTxt.split(" ");
            let operatedNumber = operate(arr[1], +arr[0], +txtDisplay);
            txtDisplay = operatedNumber.toString();
            console.log(txtDisplay);
            if (txtDisplay.includes('.')){
                txtDisplay = (+txtDisplay).toFixed(2);
            }
            else if (txtDisplay.length > 10) {
                let txtToNum = +txtDisplay;
                let num = txtToNum.toExponential(2);
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
    if (op == '+'){
        return add(num1, num2);
    }
    else if (op == '-'){
        return subtract(num1, num2);
    }
    else if (op == '*'){
        return multiply(num1, num2);

    }
    else if (op == '/'){
        return divide(num1, num2); 
    }
    else{
        return mod(num1, num2); 
    }

}

