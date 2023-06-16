// const math = require('mathjs');

function evaluateExpression(expression) {
  // Define custom functions
  const customFunctions = {
    ln: math.log,
  };

  // Add custom functions and constants to the Math.js instance
  math.import(customFunctions);

  // Define a custom function for the base-10 logarithm 
  math.import({
    log10: function(x) {
      return math.log(x) / math.log(10);
    },
    log3: function(x) {
        return math.log(x) / math.log(3);
    },
    log2: function(x) {
        return math.log(x) / math.log(2);
    },
  }, { override: true });

  // Evaluate the expression
  return math.evaluate(expression);
}

/*PART ON CALCUL WITH MATH IMPORT ABOVE CODE OF THE CALCULATOR BELOW*/

let divCalculator = document.createElement("div")
divCalculator.id = "calculator"
divCalculator.style.width = "20%"
divCalculator.style.height = "450px"
divCalculator.style.border = "1px solid black"
let screen = document.createElement("div")
screen.id = "screen"
screen.style.height = "20%"
screen.style.backgroundColor = "#BDB76B"
screen.style.margin = "10px"
screen.style.borderRadius = "5px"
screen.style.overflow = "auto"

// #region

const style = document.createElement('style');

const css = `
  ::-webkit-scrollbar {
    width: 12px; /* Adjust width as needed */
  }

  ::-webkit-scrollbar-track {
    background-color: transparent; /* Set the background color of the track */
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.3); /* Set the background color of the thumb */
    border-radius: 6px; /* Rounded corners for the thumb */
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: rgba(0, 0, 0, 0.3); /* Change the background color of the thumb on hover */
  }
`;

style.textContent = css;

document.head.appendChild(style);

//#endregion


let screenCalc = document.createElement("div")
screenCalc.id = "screenCalc"
screenCalc.style.height = "30%"
screenCalc.style.padding = "10px"
let screenAnswer = document.createElement("div")
screenAnswer.id = "screenAnswer"
screenAnswer.style.height = "25%"
screenAnswer.style.padding = "10px"
screenAnswer.style.display = "flex"
screenAnswer.style.justifyContent = "end"



let buttons = document.createElement("div")
buttons.id = "buttons"
buttons.style.display = "flex"
buttons.style.flexWrap = "wrap"
buttons.style.justifyContent ="center"

document.querySelector("main").appendChild(divCalculator)
document.getElementById("calculator").appendChild(screen)
document.getElementById("screen").appendChild(screenCalc)
document.getElementById("screen").appendChild(screenAnswer)
document.getElementById("calculator").appendChild(buttons)

/* buttons creation */
let buttonsElements = [
    "2nd","exp","clr","del","sqrt","(",")","/","7","8","9","x","4","5","6","-","1","2","3","+","0",".","ans","="
]

let buttonsElementsSecond = ["2nd","exp", "clr", "del", "sqrt", "(", ")", "!", "e", "π", "sin", "cos", "tan", "log", "ln", "log2(", "log3(","log10(","%","","","","","=" ]

let second = false

let objectsCreated = {}

for (element of buttonsElements){
    let name = "button"+element
    objectsCreated[name] = document.createElement("div")
    objectsCreated[name].id = `button${element}`
    objectsCreated[name].className = `button`
    objectsCreated[name].textContent = `${element}`
    objectsCreated[name].style.width = "60px"
    objectsCreated[name].style.height = "45px"
    objectsCreated[name].style.backgroundColor = "gray"
    objectsCreated[name].style.color = "white"
    objectsCreated[name].style.display = "flex"
    objectsCreated[name].style.alignItems = "center"
    objectsCreated[name].style.justifyContent = "center"
    objectsCreated[name].style.borderRadius = "10%"
    objectsCreated[name].style.margin = "5px"
    
    document.getElementById("buttons").appendChild(objectsCreated[name])
}

let historyCalculNumber = 0
let historyCalcul = {}
let calculDiv = "history" + historyCalculNumber


let lastKeyPressedIsEqual = false
/*--------------------------------------------------*/

let allButtons = document.getElementsByClassName("button")
let ans = ""
for (let button of allButtons){
    button.addEventListener("click", () => {
        if (lastKeyPressedIsEqual == true){
            document.getElementById("screenCalc").textContent = ""
            document.getElementById("screenAnswer").textContent = ""
            lastKeyPressedIsEqual = false
        }
        switch (button.textContent){
            case "2nd" :
                if (second == false){
                    second = true
                    let i = 0
                    for (element of buttonsElements){
                        document.getElementById(`button${element}`).textContent = buttonsElementsSecond[i]
                        i+=1
                    }
                }
                else if (second == true){
                    second = false
                    let j = 0
                    for (element of buttonsElements){
                        document.getElementById(`button${element}`).textContent = buttonsElements[j]
                        j+=1
                    }
                }
            break;

            case "exp" :
                document.getElementById("screenCalc").textContent += "^"
            break;

            case "clr" :
                document.getElementById("screenCalc").textContent = ""
                document.getElementById("screenAnswer").textContent = ""
                document.querySelectorAll(".history").forEach(element => element.remove());
            break;

            case "del" :
                let calcul = document.getElementById('screenCalc').textContent
                calcul = calcul.slice(0,-1)
                document.getElementById("screenCalc").textContent = calcul
            break;

            case "sqrt" :
                document.getElementById("screenCalc").textContent += "^0.5"
            break

            case "ans" :
                document.getElementById("screenCalc").textContent += ans
            break 

            case "x" :
                document.getElementById("screenCalc").textContent += "*"
            break

            case "+" :
                document.getElementById("screenCalc").textContent += " + "
            break

            case "-" :
                document.getElementById("screenCalc").textContent += " - "
            break

            case "=" :
                let answer = evaluateExpression(document.getElementById("screenCalc").textContent.replace("π", Math.PI).replace("log(", "log10("))
                document.getElementById("screenAnswer").textContent = answer
                ans = answer
                historyCalcul[calculDiv] = document.createElement("div")
                historyCalcul[calculDiv].textContent =  document.getElementById("screenCalc").textContent.replace("π", Math.PI).replace("log(", "log10(") + " = " + answer
                historyCalcul[calculDiv].style.padding = "10px"
                historyCalcul[calculDiv].className = "history"
                document.getElementById("screen").insertBefore(historyCalcul[calculDiv], document.getElementById("screenCalc"))
                historyCalculNumber += 1
                document.getElementById("screen").scrollTop = document.getElementById("screen").scrollHeight
                lastKeyPressedIsEqual = true
            break

            case "π" :
                document.getElementById("screenCalc").textContent += "π"
            break

            case "sin" :
                document.getElementById("screenCalc").textContent += "sin"
            break

            case "cos" :
                document.getElementById("screenCalc").textContent += "cos"
            break

            case "tan" :
                document.getElementById("screenCalc").textContent += "tan"
            break

            default :
            document.getElementById("screenCalc").textContent += button.textContent
            break;
        }
    })
}

document.body.addEventListener("keypress", (e) => {
    if (lastKeyPressedIsEqual == true){
        document.getElementById("screenCalc").textContent = ""
        document.getElementById("screenAnswer").textContent = ""
        lastKeyPressedIsEqual = false
    }
    switch (e.key){
        case "0" :
            document.getElementById("screenCalc").textContent += "0"
        break
        
        case "1" :
            document.getElementById("screenCalc").textContent += "1"
        break

        case "2" :
            document.getElementById("screenCalc").textContent += "2"
        break

        case "3" :
            document.getElementById("screenCalc").textContent += "3"
        break

        case "4" :
            document.getElementById("screenCalc").textContent += "4"
        break

        case "5" :
            document.getElementById("screenCalc").textContent += "5"
        break

        case "6" :
            document.getElementById("screenCalc").textContent += "6"
        break

        case "7" :
            document.getElementById("screenCalc").textContent += "7"
        break

        case "8" :
            document.getElementById("screenCalc").textContent += "8"
        break

        case "9" :
            document.getElementById("screenCalc").textContent += "9"
        break

        case "+" :
            document.getElementById("screenCalc").textContent += "+"
        break

        case "-" :
            document.getElementById("screenCalc").textContent += "-"
        break

        case "*" :
            document.getElementById("screenCalc").textContent += "*"
        break

        case "/" :
            document.getElementById("screenCalc").textContent += "/"
        break

        case "." :
            document.getElementById("screenCalc").textContent += "."
        break
        case "(" :
            document.getElementById("screenCalc").textContent += "("
        break
        case ")" :
            document.getElementById("screenCalc").textContent += ")"
        break

        case "Enter" :
            let answer = evaluateExpression(document.getElementById("screenCalc").textContent.replace("π", Math.PI).replace("log(", "log10("))
            document.getElementById("screenAnswer").textContent = answer
            ans = answer
            historyCalcul[calculDiv] = document.createElement("div")
            historyCalcul[calculDiv].textContent =  document.getElementById("screenCalc").textContent.replace("π", Math.PI).replace("log(", "log10(") + " = " + answer
            historyCalcul[calculDiv].style.padding = "10px"
            document.getElementById("screen").insertBefore(historyCalcul[calculDiv], document.getElementById("screenCalc"))
            historyCalculNumber += 1
            document.getElementById("screen").scrollTop = document.getElementById("screen").scrollHeight
            lastKeyPressedIsEqual = true
        break

    }
})


