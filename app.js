const cscore = document.querySelector(".num1");
const pscore = document.querySelector(".num2");
const points = document.querySelectorAll(".value");
const gamestart = document.querySelector(".gamestart");
const resultZone = document.querySelector(".result-zone");
const wtext = document.querySelector("#win-text");
const ltext = document.querySelector("#lost-text");
const ttext = document.querySelector("#tie-text");
const subText = document.querySelector(".sub-text");
const playAgainBtn = document.querySelector(".playBtn");
const replayBtn = document.querySelector(".replayBtn");
const urock = document.querySelector("#user-rock");
const prock = document.querySelector("#pc-rock");
const upaper = document.querySelector("#user-paper");
const ppaper = document.querySelector("#pc-paper");
const uscissor = document.querySelector("#user-scissor");
const pscissor = document.querySelector("#pc-scissor");
const userIcon = document.querySelector(".user-side-icon");
const pcIcon = document.querySelector(".pc-side-icon");
const nbutton = document.querySelector(".next");
const rbutton = document.querySelector(".rules");
const stage1 = document.querySelector(".stage1");
const stage2 = document.querySelector(".stage2");
const winnerPlayAgainBtn = document.querySelector(".winnerPlayBtn");
const rulesDisplay = document.querySelector(".popup");
const crossBtn = document.querySelector(".cross");
const pointsArray = Array.from(points);

// Function to get scores from local storage
function updateScore() {
  const scoresJSON = localStorage.getItem("scores");
  const updatedScores = scoresJSON
    ? JSON.parse(scoresJSON)
    : { user: 0, computer: 0 };
  cscore.innerText = updatedScores.computer;
  pscore.innerText = updatedScores.user;
}
updateScore();

console.log(pointsArray);

const valueOfKey = (name) => {
  console.log(name);
  let keyVal = 0;
  if (name === "rock") {
    keyVal = 1;
  } else if (name === "paper") {
    keyVal = 2;
  } else if (name === "scissor") {
    keyVal = 3;
  }
  return keyVal;
};

const getRandomNumber = () => {
  // Generate a random decimal number between 0 (inclusive) and 1 (exclusive)
  const randomDecimal = Math.random();

  // random number between 1,2 and 3
  const randomNumber = Math.floor(randomDecimal * 3) + 1;

  return randomNumber;
};

const playRockPaperScissors = (uchoice, cchoice) => {
  if (uchoice === cchoice) {
    return "tie";
  } else if (
    (uchoice === 1 && cchoice === 3) ||
    (uchoice === 2 && cchoice === 1) ||
    (uchoice === 3 && cchoice === 2)
  ) {
    return "user";
  } else {
    return "comp";
  }
};

const updateScores = (result) => {
  // Retrieve the current scores from local storage
  const scoresJSON = localStorage.getItem("scores");
  const scores = scoresJSON ? JSON.parse(scoresJSON) : { user: 0, computer: 0 };

  // Update the scores based on the result
  if (result === "user") {
    scores.user += 1;
  } else if (result === "comp") {
    scores.computer += 1;
  }

  // Save the updated scores back to local storage
  localStorage.setItem("scores", JSON.stringify(scores));

  updateScore();
};

const updateResultSides = (uchoice, cchoice) => {
  // setting user icon
  if (uchoice === 1) {
    urock.style.display = "flex";
    upaper.style.display = "none";
    uscissor.style.display = "none";
  } else if (uchoice === 2) {
    urock.style.display = "none";
    upaper.style.display = "flex";
    uscissor.style.display = "none";
  } else if (uchoice === 3) {
    urock.style.display = "none";
    upaper.style.display = "none";
    uscissor.style.display = "flex";
  }

  // setting pc icon
  if (cchoice === 1) {
    prock.style.display = "flex";
    ppaper.style.display = "none";
    pscissor.style.display = "none";
  } else if (cchoice === 2) {
    prock.style.display = "none";
    ppaper.style.display = "flex";
    pscissor.style.display = "none";
  } else if (cchoice === 3) {
    prock.style.display = "none";
    ppaper.style.display = "none";
    pscissor.style.display = "flex";
  }
};

const updateResultZone = (result, uchoice, cchoice) => {
  // make playing screen invisible and result screen visible
  gamestart.style.display = "none";
  resultZone.style.display = "flex";

  if (result === "tie") {
    wtext.style.display = "none";
    ltext.style.display = "none";
    subText.style.display = "none";
    playAgainBtn.style.display = "none";
    nbutton.style.display = "none";

    ttext.style.display = "block";
    replayBtn.style.display = "block";

    updateResultSides(uchoice, cchoice);
    userIcon.classList.remove("green-background");
    pcIcon.classList.remove("green-background");
  } else if (result === "user") {
    ltext.style.display = "none";
    ttext.style.display = "none";
    replayBtn.style.display = "none";

    wtext.style.display = "flex";
    subText.style.display = "flex";
    playAgainBtn.style.display = "block";
    nbutton.style.display = "inline";

    updateResultSides(uchoice, cchoice);

    userIcon.classList.add("green-background");
    pcIcon.classList.remove("green-background");
  } else if (result === "comp") {
    wtext.style.display = "none";
    ttext.style.display = "none";
    replayBtn.style.display = "none";
    nbutton.style.display = "none";

    ltext.style.display = "flex";
    subText.style.display = "flex";
    playAgainBtn.style.display = "block";

    updateResultSides(uchoice, cchoice);

    userIcon.classList.remove("green-background");
    pcIcon.classList.add("green-background");
  }
};

const keyClick = (event) => {
  const target = event.target;
  const parentDiv = target.closest(".value"); // Get the closest parent div with the class "item"

  if (parentDiv) {
    const keyClicked = parentDiv.id; // Fetching the key clicked
    console.log("keyClicked:", keyClicked);
    const uchoice = valueOfKey(keyClicked);
    console.log("uchoice:", uchoice);

    // call the random response from computer
    const cchoice = getRandomNumber();
    console.log("cchoice:", cchoice);

    // compare the results and genarate result
    const result = playRockPaperScissors(uchoice, cchoice);
    console.log("Result: ", result);

    // update the local storage based on the result
    updateScores(result);

    // update the result zone based on the result
    updateResultZone(result, uchoice, cchoice);
  }
};

const playAgain = (event) => {
  // make playing screen visible and result screen invisible
  gamestart.style.display = "";
  resultZone.style.display = "none";
  stage1.style.display = "";
  stage2.style.display = "none";
};

replayBtn.addEventListener("click", playAgain);
playAgainBtn.addEventListener("click", playAgain);
winnerPlayAgainBtn.addEventListener("click", playAgain);

const nextPage = () => {
  stage1.style.display = "none";
  stage2.style.display = "flex";
  nbutton.style.display = "none";
};
nbutton.addEventListener("click", nextPage);

const showRule = () => {
  crossBtn.style.display = "";
  rulesDisplay.style.display = "";
};
rbutton.addEventListener("click", showRule);

const deleteRule = () => {
  crossBtn.style.display = "none";
  rulesDisplay.style.display = "none";
};

crossBtn.addEventListener("click", deleteRule);

pointsArray.forEach((key) => key.addEventListener("click", keyClick));
