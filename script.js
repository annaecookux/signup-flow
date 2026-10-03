const form = document.getElementById('authForm');
const modeButtons = [...document.querySelectorAll('.segment')];
const steps = [...document.querySelectorAll('.step')];
const formSteps = [...document.querySelectorAll('.form-step')];
const nextButtons = [...document.querySelectorAll('[data-next-step]')];
const skipButtons = [...document.querySelectorAll('[data-skip]')];
const carouselSlides = [...document.querySelectorAll('.slide')];
const carouselDots = [...document.querySelectorAll('.dot')];

let currentStepIndex = 0;
let currentMode = 'signup';

function updateMode(mode) {
  currentMode = mode;
  modeButtons.forEach((button) => {
    const active = button.dataset.mode === mode;
    button.classList.toggle('active', active);
  });

  const stepHeader = document.querySelector('.step-header h2');
  const kicker = document.querySelector('.kicker');

  if (mode === 'login') {
    stepHeader.textContent = 'Welcome back';
    kicker.textContent = 'Log in';
    formSteps[0].querySelector('.step-header h2').textContent = 'Welcome back';
    formSteps[0].querySelector('.kicker').textContent = 'Log in';
    formSteps[0].querySelector('.social-grid').style.display = 'none';
    formSteps[0].querySelector('.divider').style.display = 'none';
    formSteps[1].querySelector('.step-header h2').textContent = 'Secure access';
    formSteps[1].querySelector('.kicker').textContent = 'Quick access';
  } else {
    stepHeader.textContent = 'Choose how you want to get started';
    kicker.textContent = 'Create account';
    formSteps[0].querySelector('.step-header h2').textContent = 'Choose how you want to get started';
    formSteps[0].querySelector('.kicker').textContent = 'Create account';
    formSteps[0].querySelector('.social-grid').style.display = 'grid';
    formSteps[0].querySelector('.divider').style.display = 'grid';
    formSteps[1].querySelector('.step-header h2').textContent = 'Set up your account';
    formSteps[1].querySelector('.kicker').textContent = 'Almost there';
  }

  if (mode === 'login') {
    formSteps.forEach((step, index) => {
      if (index === 0) step.classList.add('active');
      else step.classList.remove('active');
    });
    currentStepIndex = 0;
    updateStepper(0);
    const emailField = document.getElementById('emailChoice');
    if (emailField) {
      emailField.placeholder = 'name@example.com';
    }
  }
}

function updateStepper(index) {
  steps.forEach((step, stepIndex) => {
    step.classList.toggle('is-active', stepIndex === index);
    step.classList.toggle('is-complete', stepIndex < index);
  });

  formSteps.forEach((step, stepIndex) => {
    step.classList.toggle('active', stepIndex === index);
  });
}

function goToNextStep() {
  const nextIndex = Math.min(currentStepIndex + 1, formSteps.length - 1);
  currentStepIndex = nextIndex;
  updateStepper(nextIndex);
}

function skipStep() {
  const nextIndex = Math.min(currentStepIndex + 1, formSteps.length - 1);
  currentStepIndex = nextIndex;
  updateStepper(currentStepIndex);
}

modeButtons.forEach((button) => {
  button.addEventListener('click', () => updateMode(button.dataset.mode));
});

nextButtons.forEach((button) => {
  button.addEventListener('click', goToNextStep);
});

skipButtons.forEach((button) => {
  button.addEventListener('click', skipStep);
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const submitButton = form.querySelector('[type="submit"]');
  const originalText = submitButton.textContent;

  submitButton.textContent = 'Account ready';
  submitButton.disabled = true;
  submitButton.style.opacity = '0.9';

  setTimeout(() => {
    submitButton.textContent = originalText;
    submitButton.disabled = false;
    submitButton.style.opacity = '1';
  }, 1800);
});

let sliderIndex = 0;
function showSlide(index) {
  carouselSlides.forEach((slide, slideIndex) => {
    slide.classList.toggle('active', slideIndex === index);
  });

  carouselDots.forEach((dot, dotIndex) => {
    dot.classList.toggle('active', dotIndex === index);
  });
}

carouselDots.forEach((dot) => {
  dot.addEventListener('click', () => {
    sliderIndex = Number(dot.dataset.index);
    showSlide(sliderIndex);
  });
});

setInterval(() => {
  sliderIndex = (sliderIndex + 1) % carouselSlides.length;
  showSlide(sliderIndex);
}, 3500);

updateMode('signup');
updateStepper(0);
