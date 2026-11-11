// Add Event Listener
document.querySelector("button").addEventListener("click", gradeQuiz);

displayQ4Choices();
displayQ5Choices();

let attempts = localStorage.getItem("total_attempts");

if (attempts === null) {
 attempts = 0;
} else {
 attempts = Number(attempts);
}

function shuffleArray(array) {
 for (let i = array.length - 1; i > 0; i--) {
  let j = Math.floor(Math.random() * (i + 1));
  let temp = array[i];
  array[i] = array[j];
  array[j] = temp;
 }
}

function displayQ4Choices() {
 let q4ChoicesArray = ["Maine", "Rhode Island", "Maryland", "Delaware"];
 shuffleArray(q4ChoicesArray);

 let choicesContainer = document.querySelector("#q4Choices");
 choicesContainer.textContent = "";

 for (let choice of q4ChoicesArray) {
  let input = document.createElement("input");
  input.type = "radio";
  input.name = "q4";
  input.id = choice;
  input.value = choice;

  let label = document.createElement("label");
  label.htmlFor = choice;
  label.textContent = choice;

  choicesContainer.appendChild(input);
  choicesContainer.appendChild(label);
  choicesContainer.appendChild(document.createTextNode(" "));
 }
}

function displayQ5Choices() {
 let q5ChoicesArray = ["Washington D.C.", "Sacramento", "New York City", "Las Vegas"];
 shuffleArray(q5ChoicesArray);

 let choicesContainer = document.querySelector("#q5Choices");
 choicesContainer.textContent = "";

 for (let choice of q5ChoicesArray) {
  let input = document.createElement("input");
  input.type = "radio";
  input.name = "q5";
  input.id = choice;
  input.value = choice;

  let label = document.createElement("label");
  label.htmlFor = choice;
  label.textContent = choice;

  choicesContainer.appendChild(input);
  choicesContainer.appendChild(label);
  choicesContainer.appendChild(document.createTextNode(" "));
 }
}

function isFormValid() {
 let isValid = true;
 let q1Response = document.querySelector("#q1").value;
 let q6Response = document.querySelector("#q6").value;
 let q10Response = document.querySelector("#q10").value;
 let validationFdbk = document.querySelector("#validationFdbk");

 if (q1Response === "") {
  isValid = false;
  validationFdbk.textContent = "Question 1 was not answered";
 }

if (q6Response === "") {
  isValid = false;
  validationFdbk.textContent = "Question 6 was not answered";
 }

if (q10Response === "") {
  isValid = false;
  validationFdbk.textContent = "Question 10 was not answered";
 }

 return isValid;
}

let score = 0;

function setMarkImage(index, imageName, altText) {
 let markContainer = document.querySelector(`#markImg${index}`);
 markContainer.textContent = "";

 let img = document.createElement("img");
 img.src = `img/${imageName}`;
 img.alt = altText;
 markContainer.appendChild(img);
}

function rightAnswer(index) {
 let feedback = document.querySelector(`#q${index}Feedback`);
 feedback.textContent = "Correct!";
 feedback.className = "bg-success text-white";
 setMarkImage(index, "checkmark.jpg", "Checkmark");
 score += 10;
}

function wrongAnswer(index) {
 let feedback = document.querySelector(`#q${index}Feedback`);
 feedback.textContent = "Incorrect!";
 feedback.className = "bg-danger text-white";
 setMarkImage(index, "xmark.jpg", "X mark");
}

function gradeQuiz() {
 document.querySelector("#validationFdbk").textContent = "";

 if (!isFormValid()) {
  return;
 }

 score = 0;

//Question 1
 let q1Response = document.querySelector("#q1").value.toLowerCase();

 if (q1Response === "sacramento") {
  rightAnswer(1);
} else {
   wrongAnswer(1);
}

//Question 2
 let q2Response = document.querySelector("#q2").value;

 if (q2Response === "mo") {
  rightAnswer(2);
} else {
   wrongAnswer(2);
}

//Question 3
 if (document.querySelector("#Jefferson").checked &&
 document.querySelector("#Roosevelt").checked &&
 !document.querySelector("#Jackson").checked &&
 !document.querySelector("#Franklin").checked) {
   rightAnswer(3);
 } else {
   wrongAnswer(3);
 }

//Question 4
 let selectedQ4 = document.querySelector("input[name=q4]:checked");

 if (selectedQ4 !== null && selectedQ4.value === "Rhode Island") {
  rightAnswer(4);
 } else {
  wrongAnswer(4);
 }

//Question 5
 let selectedQ5 = document.querySelector("input[name=q5]:checked");

 if (selectedQ5 !== null && selectedQ5.value === "Washington D.C.") {
  rightAnswer(5);
 } else {
  wrongAnswer(5);
 }

//Question 6
let q6Response = document.querySelector("#q6").value.toLowerCase();

if (q6Response === "alaska") {
  rightAnswer(6);
} else {
   wrongAnswer(6);
}

//Question 7
let q7Response = document.querySelector("#q7").value;

 if (q7Response === "az") {
  rightAnswer(7);
} else {
   wrongAnswer(7);
}

//Question 8
 if (document.querySelector("#NewYorkCity").checked &&
 !document.querySelector("#Boston").checked &&
 !document.querySelector("#Miami").checked &&
 !document.querySelector("#Philadelphia").checked) {
   rightAnswer(8);
 } else {
   wrongAnswer(8);
 }

//Question 9
 let q9Response = document.querySelector("#q9").value;

 if (q9Response === "au") {
  rightAnswer(9);
} else {
   wrongAnswer(9);
}

//Question 10
 let q10Response = document.querySelector("#q10").value.toLowerCase();

 if (q10Response === "wyoming") {
  rightAnswer(10);
} else {
   wrongAnswer(10);
}

 let totalScore = document.querySelector("#totalScore");
 totalScore.textContent = `Total Score: ${score}`;

 if (score < 80) {
  totalScore.className = "text-danger";
 } else {
  totalScore.className = "text-success";
 }

 let congratsMessage = document.querySelector("#congratsMessage");

 if (score > 80) {
  congratsMessage.textContent = "Great Job!";
  congratsMessage.className = "text-success";
 } else {
  congratsMessage.textContent = "";
 }

 attempts++;
 document.querySelector("#totalAttempts").textContent = `Total Attempts: ${attempts}`;
 localStorage.setItem("total_attempts", attempts);
}