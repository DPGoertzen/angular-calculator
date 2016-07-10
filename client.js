
var numButtonArray = [];
for(var i = 1; i<10; i++){
  numButtonArray.push(i);
}
numButtonArray.push(0);
var operButtonArray = ["+", "-", "*", "/"]
// tells us if our operand has been pressed yet or not.
var operandPressed = false;
var firstNum = [];
var secondNum = [];
var equals = "=";
var currentOper = "";
var total = 0;

var insultArray = [
  ", moron.",
  ". Idiot.",
  ". C'mon dummy!",
  ", el stupido.",
  "! Tool.",
  ", what a muppet.",
  ", dirtbag!",
  ", weaksauce.",
  ", you must be SO proud.",
  ". Or do the math yourself."
];

function randomPicker(max){
  return Math.floor(Math.random() * max + 1);
}

function insultGen(){
  var random = randomPicker(insultArray.length);
  return insultArray[random];
}

angular.module('calculator', []);

angular.module('calculator').controller('MainController', function($scope){
  $scope.numButtonList = numButtonArray;
  $scope.operButtonList = operButtonArray;
  $scope.firstNumber = firstNum;
  $scope.secondNumber = secondNum;
  $scope.equals = equals;
  $scope.total = 0;

  $scope.numHandler = function(clickedButton) {
  // the way we determine if we're done with the first number is by
  // checking to see if an operand has been pressed.
    if(!operandPressed){
      $scope.firstNumber.push(clickedButton);
      $scope.total = $scope.firstNumber.join("");
      console.log($scope.firstNumber);
    } else {
      $scope.secondNumber.push(clickedButton);
      $scope.total = $scope.secondNumber.join("");
      console.log($scope.secondNumber);
    }
  };

  $scope.operHandler = function(clickedButton) {
    operandPressed = true;
    currentOper = clickedButton;
    $scope.total = currentOper;
  };

  $scope.equalsHandler = function(){
    var finishedFirstNumber = parseInt($scope.firstNumber.join(""));
    var finishedSecondNumber = parseInt($scope.secondNumber.join(""));
    switch(currentOper){
      case "+":
        total = finishedFirstNumber + finishedSecondNumber;
        break;
      case "-":
        total = finishedFirstNumber - finishedSecondNumber;
        break;
      case "*":
        total = finishedFirstNumber * finishedSecondNumber;
        break;
      case "/":
        total = finishedFirstNumber / finishedSecondNumber;
        break;
    }
    if(total != Infinity){

      $scope.total = total.toString() + insultGen();
    } else {
      $scope.total = "Don't divide by 0, asshole."
    }
    // resetting for the next calculation
    operandPressed = false;
    $scope.firstNumber = [];
    $scope.secondNumber = [];

  }

});
