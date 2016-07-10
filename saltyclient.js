// evil calculator is evil. Special functionality for 8 + 8, 7 + 7, and / 0
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
var total = 0;


// the special sauce.
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
  ". Or is it?"
];

function randomPicker(max){
  return Math.floor(Math.random() * max);
}

function insultGen(){
  var random = randomPicker(insultArray.length);
  return insultArray[random];
}

// end special sauce

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
        // special gag functionalities: 8+8 = 18, and 7+7 = 77.
        if(finishedFirstNumber == 8 && finishedSecondNumber == 8 && currentOper == "+"){
          total = 18;
          $scope.total = total.toString() + insultGen();
        } else if(finishedFirstNumber == 7 && finishedSecondNumber == 7 && currentOper == "+"){
          total = 77;
          $scope.total = total.toString() + insultGen();
        } else if(total != Infinity) {
          $scope.total = total.toString() + insultGen();
        }else{
          $scope.total = "Don't divide by 0, ass."
        }
        // resetting for the next calculation
        operandPressed = false;
        $scope.firstNumber = [];
        $scope.secondNumber = [];
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

  // $scope.equalsHandler = function(){
  //   var finishedFirstNumber = parseInt($scope.firstNumber.join(""));
  //   var finishedSecondNumber = parseInt($scope.secondNumber.join(""));
  //   switch(currentOper){
  //     case "+":
  //       total = finishedFirstNumber + finishedSecondNumber;
  //       break;
  //     case "-":
  //       total = finishedFirstNumber - finishedSecondNumber;
  //       break;
  //     case "*":
  //       total = finishedFirstNumber * finishedSecondNumber;
  //       break;
  //     case "/":
  //       total = finishedFirstNumber / finishedSecondNumber;
  //       break;
  //   }
  //   if(total != Infinity){
  //     $scope.total = total.toString() + insultGen();
  //   } else {
  //     $scope.total = "Don't divide by 0, asshole."
  //   }
  //   // resetting for the next calculation
  //   operandPressed = false;
  //   $scope.firstNumber = [];
  //   $scope.secondNumber = [];
  //
  // }

});
