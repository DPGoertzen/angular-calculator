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

angular.module('calculator', []);

angular.module('calculator').controller('MainController', function($scope){
  $scope.numButtonList = numButtonArray;
  $scope.operButtonList = operButtonArray;
  $scope.firstNumber = firstNum;
  $scope.secondNumber = secondNum;
  $scope.equals = equals;
  $scope.total = 0;

  $scope.numHandler = function(clickedButton) {
    if(!operandPressed){
      $scope.firstNumber.push(clickedButton);
      console.log($scope.firstNumber);
      // return $scope.firstNumber;
    } else {
      $scope.secondNumber.push(clickedButton);
      console.log($scope.secondNumber);
    }
  };

  $scope.operHandler = function(clickedButton) {
    operandPressed = true;
    currentOper = clickedButton;
    console.log("operand", currentOper);
  };

  $scope.equalsHandler = function(){
    operandPressed = false;
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
      $scope.total = total;
    } else {
      $scope.total = "Don't divide by 0, asshole."
    }
    $scope.firstNumber = [];
    $scope.secondNumber = [];

    console.log(total);
    console.log(finishedFirstNumber);
    console.log(finishedSecondNumber);
  }

});
