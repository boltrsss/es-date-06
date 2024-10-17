let stepData = {};

function showLoadingScreen() {
  document.getElementById("intro").style.display = "none";
  document.getElementById("loadingScreen").style.display = "flex";

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 10;
    updateProgressBar(progress);
    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        document.getElementById("loadingScreen").style.display = "none";
        showStep(1);
      }, 10);
    }
  }, 120);
}

function updateProgressBar(progress) {
  document.getElementById("progress-bar").style.width = progress + "%";
}

function showStep(stepNumber) {
  const steps = document.querySelectorAll(".step");
  const stepItems = document.querySelectorAll(".step-title li");
  steps.forEach((step) => {
    step.style.display = "none";
  });

  if (stepNumber < 6) {
    updateProgressBar(0);
    stepItems.forEach((stepItem) => {
      stepItem.classList.remove("active");
    });

    document.querySelector(`#stepItem${stepNumber}`).classList.add("active");

    if (stepNumber === 2) {
      const setp2 = document.querySelectorAll("#step2");

      setp2.forEach((data, idx) => {
        if (idx + 1 === stepData.step1.id) {
          data.style.display = "flex";
        } else {
          data.style.display = "none";
        }
      });
    } else {
      document.getElementById(`step${stepNumber}`).style.display = "flex";
    }

    if (stepNumber === 5) {
      const step5 = document.querySelector("#step5");

      const images = {
        blonde: [
          "./assets/images/blonde/3.png",
          "./assets/images/blonde/2.png",
          "./assets/images/blonde/1.png",
        ],
        brunette: [
          "./assets/images/brunette/3.png",
          "./assets/images/brunette/2.png",
          "./assets/images/brunette/1.png",
        ],
        blackhead: [
          "./assets/images/blackhead/3.png",
          "./assets/images/blackhead/2.png",
          "./assets/images/blackhead/1.png",
        ],
      };

      if (window.innerWidth < 575) {
        document.querySelector(".step-title").style.top = "9rem";
      }

      if (window.innerWidth < 330) {
        document.querySelector(".step-title").style.top = "10rem";
      }

      const buttons = step5.querySelectorAll(".resultImage");

      buttons.forEach((button, idx) => {
        if (stepData.step2.id === 1) {
          const innerImage = button.querySelector("img");

          innerImage.setAttribute("src", images.blonde[idx]);

          button.addEventListener("click", () => {
            storeDataAndProceed({ id: idx + 1, img: images.blonde[idx] });
          });
        } else if (stepData.step2.id === 2) {
          const innerImage = button.querySelector("img");

          innerImage.setAttribute("src", images.brunette[idx]);

          button.addEventListener("click", () => {
            storeDataAndProceed({ id: idx + 1, img: images.brunette[idx] });
          });
        } else if (stepData.step2.id === 3) {
          const innerImage = button.querySelector("img");

          innerImage.setAttribute("src", images.blackhead[idx]);

          button.addEventListener("click", () => {
            storeDataAndProceed({ id: idx + 1, img: images.blackhead[idx] });
          });
        }
      });
    }
  }

  if (stepNumber === 6) {
    document.getElementById("loadingScreen").style.display = "flex";
    document.querySelector("#loadingScreen ul").style.display = "block";
    document.querySelector("#loadingScreen h2").innerHTML =
      "Revisando tu respuesta";

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 10;
      updateProgressBar(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          document.getElementById("loadingScreen").style.display = "none";
          document.getElementById("thankYouPage").style.display = "block";
          document.querySelector(".content").style.paddingTop = "2rem";
        }, 100);
      }
    }, 200);
  }
  if (stepNumber === 1) {
    document.querySelector(".step-title").style.left = "0";
    if (window.innerWidth <= 575) {
      document.querySelector(".step-title").style.left = "50%";
      document.querySelector(".step-title").style.opacity = "1";
    }
    document.querySelector(".content").style.paddingLeft = "10rem";
  }
  if (stepNumber === 6) {
    document.querySelector(".step-title").style.left = "-15rem";
    document.querySelector(".content").style.paddingLeft = "0";
    document.querySelector(".content").style.paddingBottom = "2rem";
  }
}

function storeDataAndProceed(data) {
  const currentStep = Object.keys(stepData).length + 1;
  stepData[`step${currentStep}`] = data;
  showStep(currentStep + 1);
  updateTitle(currentStep);
}

function updateTitle() {
  const stepItems = document.querySelectorAll(".step-title li");

  stepItems.forEach((stepItem, idx) => {
    const stepImage = stepItem.querySelector(".selectedImage");
    if (stepData[`step${idx + 1}`]) {
      stepItem.classList.add("valueAdded");
      stepImage.setAttribute("src", stepData[`step${idx + 1}`].img);
    }
  });
}

//countdown
let totalTime = 11 * 60 + 54;

function updateCountdown() {
  let minutes = Math.floor(totalTime / 60);
  let seconds = totalTime % 60;

  let countdownElement = document.getElementById("countdown");

  countdownElement.innerHTML = `${minutes} minutos y <strong>${seconds} segundos</strong>`;

  totalTime--;

  if (totalTime >= 0) {
    setTimeout(updateCountdown, 1000);
  } else {
    countdownElement.innerHTML = "0 minutos y <strong>0 segundos</strong>";
  }
}

updateCountdown();
