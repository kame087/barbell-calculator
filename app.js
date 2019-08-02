/***************** MODEL ******************/
/*****************************************/
let plates = [45, 35, 25, 10, 5];
let plateCount = [];

/**************** CONTROLLER *************/
/*****************************************/

var arrayRemove = function(arr, value) {
  return arr.filter(function(ele) {
    return ele != value;
  });
};

$("button.plate").click(function() {
  $button = $(this);
  let plateVal = "";
  if ($button.hasClass("plate-btn-selected")) {
    $button.removeClass("plate-btn-selected");
    $button.addClass("plate-btn");
    plateVal = parseFloat($button.text());
    plates = arrayRemove(plates, plateVal);
    console.log(plates);
  } else {
    $button.addClass("plate-btn-selected");
    $button.removeClass("plate-btn");
    plateVal = parseFloat($button.text());
    plates.push(plateVal);
    console.log(plates);
  }
});

var constructPlateCountArray = function() {
  for (var i = 0; i < plates.length; i++) {
    plateCount.push(0);
  }
};

var resetInputs = function() {
  document.getElementById("total-weight").value = "";
  document.getElementById("barbell-weight").value = "";
  plates = [45, 35, 25, 10, 5];
  plateCount = [];
};

var getUserInput = function() {
  let userInputs = [0, 0];
  // Gather user input
  let totalWeight = parseFloat(document.getElementById("total-weight").value); // total weight
  const BARBELL_WEIGHT = parseFloat(
    document.getElementById("barbell-weight").value
  ); // barbell weight
  userInputs[0] = totalWeight;
  userInputs[1] = BARBELL_WEIGHT;

  return userInputs;
};

var renderOutput = function() {};

var calcPlates = function() {
  // sort by descending order
  plates = plates.sort(function(a, b) {
    return b - a;
  });

  let tWeight = getUserInput()[0];
  let bWeight = getUserInput()[1];

  let weight = (tWeight - bWeight) / 2.0; // weight on each side
  constructPlateCountArray();

  for (var i = 0; i < plates.length; i++) {
    while (weight >= plates[i]) {
      weight -= plates[i];
      plateCount[i] += 1;
    }
  }

  console.log(plateCount);

  resetInputs();
};
