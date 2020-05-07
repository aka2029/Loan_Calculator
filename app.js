// listen for submit
document.getElementById("loan-form").addEventListener("submit", function(e) {
  //now its no longer an event handler so we take out e from calculateResults and remore the preventDefault method

  //Hide Results - although already hidden but when we hit calculate then the results will show
  document.getElementById("results").style.display = "none";

  // Show Loader
  document.getElementById("loading").style.display = "block";

  setTimeout(calculateResults, 2000);

  e.preventDefault();
});

// Calculate Results
function calculateResults() {
  console.log("Calculating...");
  // UI Vars
  const amount = document.getElementById("amount");
  const interest = document.getElementById("interest");
  const years = document.getElementById("years");
  const monthlyPayment = document.getElementById("monthly-payment");
  const totalPayment = document.getElementById("total-payment");
  const totalInterest = document.getElementById("total-interest");

  const principal = parseFloat(amount.value); //it was pointing to the input but we need the value.... & we also want it as a float ie decimal.
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayment = parseFloat(years.value) * 12;

  // compute monthly payments
  const x = Math.pow(1 + calculatedInterest, calculatedPayment);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2); //to set value at the location and show it by 2 decimals
    totalPayment.value = (monthly * calculatedPayment).toFixed(2);
    totalInterest.value = (monthly * calculatedPayment - principal).toFixed(2);

    // Show results
    document.getElementById("results").style.display = "block";

    // Hide loader
    document.getElementById("loading").style.display = "none";
  } else {
    showError("Please Check Your numbers"); //our own custom method
  }
}

// Show error
function showError(error) {
  // Show results
  document.getElementById("results").style.display = "none";

  // Hide loader
  document.getElementById("loading").style.display = "none";

  // Create a div
  const errorDiv = document.createElement("div");

  // Get elements
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  // Add class
  errorDiv.className = "alert alert-danger"; // in bootstrap both these classes are req

  // create text node and append it to div
  errorDiv.appendChild(document.createTextNode(error));

  // Insert error above heading
  card.insertBefore(errorDiv, heading); // THIS IS NEW........ NOT USED BEOFRE

  // Clear error after 3sec
  setTimeout(clearError, 3000); // 3000 ms = 3sec
}

// clear error
function clearError() {
  document.querySelector(".alert").remove();
}
