function generateSecretSantaPairs(arr) {
  const shuffledArr = arr.slice();
  for (let i = shuffledArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArr[i], shuffledArr[j]] = [shuffledArr[j], shuffledArr[i]];
  }

  const pairs = {};
  for (let i = 0; i < arr.length; i++) {
    pairs[arr[i]] = shuffledArr[i % arr.length];
  }

  for (const person in pairs) {
    if (person === pairs[person]) {
      return generateSecretSantaPairs(arr);
    }
  }

  return pairs;
}

document
  .getElementById("generateButton")
  .addEventListener("click", function () {
    const inputNames = document.getElementById("names").value;
    const people = inputNames.split(",").map((name) => name.trim());

    if (people.length < 2) {
      alert("Please enter at least two names.");
      return;
    }

    const pairs = generateSecretSantaPairs(people);

    const resultElement = document.getElementById("result");
    resultElement.innerHTML = "<h2>Secret Santa Pairs:</h2>";

    for (const person in pairs) {
      const pairElement = document.createElement("p");
      pairElement.textContent = `${person} → ${pairs[person]}`;
      pairElement.classList.add("pair");
      resultElement.appendChild(pairElement);
    }

    // Adjust container height based on the number of names
    const container = document.querySelector(".container");
    container.style.height = `${Math.max(300, 50 * people.length)}px`;
  });
