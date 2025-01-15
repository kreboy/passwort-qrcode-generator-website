function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
  }
  
  function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
  }
  
  function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
  }
  
  function getRandomSymbol() {
    const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";
    return symbols[Math.floor(Math.random() * symbols.length)];
  }
  
  const passwordGenerator = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol,
  };
  
  const lengthInput = document.getElementById("password-length");
  const passwordLengthValue = document.getElementById("password-length-value");
  const includeUppercase = document.getElementById("include-uppercase");
  const includeNumbers = document.getElementById("include-numbers");
  const includeSymbols = document.getElementById("include-symbols");
  const generateBtn = document.getElementById("generate-btn");
  const passwordOutput = document.getElementById("password-output");
  const copyBtn = document.getElementById("copy-btn");
  const loadingOverlay = document.getElementById("loading-overlay");
  
  function generatePassword(length, upper, number, symbol) {
    const typesCount = upper + number + symbol + 1;
    const typesArr = [
      { lower: true },
      { upper },
      { number },
      { symbol },
    ].filter((type) => Object.values(type)[0]);
  
    if (typesCount === 0) return "";
  
    let password = "";
    for (let i = 0; i < length; i += typesCount) {
      typesArr.forEach((type) => {
        const funcName = Object.keys(type)[0];
        password += passwordGenerator[funcName]();
      });
    }
  
    return password.slice(0, length);
  }
  
  function showAlert(message, type = "success") {
    const alertBox = document.createElement("div");
    alertBox.textContent = message;
    alertBox.className = `alert alert-${type}`;
    document.body.appendChild(alertBox);
  
    setTimeout(() => {
      alertBox.remove();
    }, 3000);
  }
  
  generateBtn.addEventListener("click", () => {
    const length = +lengthInput.value;
    const hasUpper = includeUppercase.checked;
    const hasNumber = includeNumbers.checked;
    const hasSymbol = includeSymbols.checked;
  
    loadingOverlay.classList.add("active");
  
    setTimeout(() => {
      const password = generatePassword(length, hasUpper, hasNumber, hasSymbol);
      passwordOutput.value = password;
  
      loadingOverlay.classList.remove("active");
  
      showAlert("Password generated successfully!", "success");
    }, 1000);
  });

  copyBtn.addEventListener("click", () => {
    const password = passwordOutput.value;
    if (!password) {
      showAlert("No password to copy!", "error");
      return;
    }
  
    navigator.clipboard.writeText(password).then(() => {
      showAlert("Password copied!", "success");
    }).catch(() => {
      showAlert("Failed to copy password!", "error");
    });
  });

  lengthInput.addEventListener("input", () => {
    passwordLengthValue.textContent = lengthInput.value;
  });
  