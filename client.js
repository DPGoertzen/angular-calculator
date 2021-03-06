// regular "good" calculator. for hidden mode, click "happycalc" in index.html.
var numButtonArray = [];
for(var i = 1; i<10; i++){
  numButtonArray.push(i);
}
numButtonArray.push(0, "c", "=");
var operButtonArray = ["+", "-", "*", "/"]
// tells us if our operand has been pressed yet or not.
var operandPressed = false;
var firstNum = [];
var secondNum = [];
var equals = "=";
var currentOper = "";
//total is what displays on the calculator "screen"
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

// clears everything and resets the operand pressed flag.
    if(clickedButton == "c"){
      $scope.total = 0;
      operandPressed = false;
      $scope.firstNumber = [];
      $scope.secondNumber = [];
    } else if(clickedButton == "="){
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
          $scope.total = "Divided by 0!"
        }
        // resetting for the next calculation
        operandPressed = false;
        $scope.firstNumber = [];
        $scope.secondNumber = [];
    // the way we determine if we're done with the first number is by
    // checking to see if an operand has been pressed.
    } else if(!operandPressed){
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

});
