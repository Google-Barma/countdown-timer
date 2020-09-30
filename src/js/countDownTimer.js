// Создайте таймер
// Таймер можно выставить на 10с/20с/30с. ( У вас должно быть 3 кнопки с данными значениями)
// У таймера должна быть возможность поставить на паузу, продолжить, сбросить, старт.
//  Изначально должно быть всего 2 кнопки - старт и сбросить,
// после старта таймера кнопка старта меняет состояние на пауза,
// после нажатия на паузу кнопка меняет состояние на продолжить,
// после нажатия на продолжить кнопка меняет состояние на пауза
// после нажатия на сбросить кнопка старта снова имеет сочтояние старт

export default class CountdownTimer {
  constructor({ selector }) {
    this.handleTenSecBtn = this.handleTenSecBtn.bind(this);
    this.handleTwentySecBtn = this.handleTwentySecBtn.bind(this);
    this.handleThirtySecBtn = this.handleThirtySecBtn.bind(this);
    this.handleOneMinBtn = this.handleOneMinBtn.bind(this);
    this.hangleOneHourBtn = this.hangleOneHourBtn.bind(this);
    this.handleOneDayBtn = this.handleOneDayBtn.bind(this);
    this.handleResetBtn = this.handleResetBtn.bind(this);
    this.handleStartBtn = this.handleStartBtn.bind(this);

    this.startBtn = document.querySelector(`${selector} .btn__start`);
    this.resetBtn = document.querySelector(`${selector} .btn__reset`);
    this.tenSecBtn = document.querySelector(
      `${selector} button[data-value="10sec"]`,
    );
    this.twentySecBtn = document.querySelector(
      `${selector} button[data-value="20sec"]`,
    );
    this.thirtySecBtn = document.querySelector(
      `${selector} button[data-value="30sec"]`,
    );
    this.wunHourBtn = document.querySelector(
      `${selector} button[data-value="1hours"]`,
    );
    this.wunDayBtn = document.querySelector(
      `${selector} button[data-value="1days"]`,
    );
    this.days = document.querySelector(`${selector} .value[data-value="days"]`);
    this.hours = document.querySelector(
      `${selector} .value[data-value="hours"]`,
    );
    this.mins = document.querySelector(`${selector} .value[data-value="mins"]`);
    this.secs = document.querySelector(`${selector} .value[data-value="secs"]`);
  }

  handleTenSecBtn() {
    this.setStartTimeValue(10000);
    this.removeDisabledStartBtn();
  }

  handleTwentySecBtn() {
    this.setStartTimeValue(20000);
    this.removeDisabledStartBtn();
  }

  handleThirtySecBtn() {
    this.setStartTimeValue(30000);
    this.removeDisabledStartBtn();
  }

  handleOneMinBtn() {
    this.setStartTimeValue(60000);
    this.removeDisabledStartBtn();
  }

  hangleOneHourBtn() {
    this.setStartTimeValue(3600000);
    this.removeDisabledStartBtn();
  }

  handleOneDayBtn() {
    this.setStartTimeValue(86400000);
    this.removeDisabledStartBtn();
  }

  handleStartBtn() {
    this.setDisabledBtn();
    this.toggleStartBtnClass();
  }

  handleResetBtn() {
    this.toggleStartBtnToStart();
    this.resetTimeValue();
    this.stopTimer();
    this.removeDisabledBtn();
  }

  setDisabledBtn() {
    this.tenSecBtn.setAttribute('disabled', 'disabled');
    this.twentySecBtn.setAttribute('disabled', 'disabled');
    this.thirtySecBtn.setAttribute('disabled', 'disabled');
    this.wunHourBtn.setAttribute('disabled', 'disabled');
    this.wunDayBtn.setAttribute('disabled', 'disabled');
  }

  removeDisabledBtn() {
    this.tenSecBtn.removeAttribute('disabled');
    this.twentySecBtn.removeAttribute('disabled');
    this.thirtySecBtn.removeAttribute('disabled');
    this.wunHourBtn.removeAttribute('disabled');
    this.wunDayBtn.removeAttribute('disabled');
  }

  setDisabledStartBtn() {
    this.startBtn.setAttribute('disabled', 'disabled');
  }

  removeDisabledStartBtn() {
    this.startBtn.removeAttribute('disabled');
  }

  setStartTimeValue(ms) {
    localStorage.setItem('startTimeValue', ms);

    const setStartTime = this.getStartTimeValue();
    this.converToDate(setStartTime);
  }

  getStartTimeValue() {
    return localStorage.getItem('startTimeValue');
  }

  setCurrentTimeValue(ms) {
    localStorage.setItem('currentValue', ms);
  }

  getCurrentTimeValue() {
    return localStorage.getItem('currentValue');
  }

  converToDate(ms) {
    this.days.textContent = `0${parseInt(ms / 1000 / 3600 / 24)}`;
    this.hours.textContent = this.pad(Math.floor((ms / 1000 / 3600) % 24));
    this.mins.textContent = this.pad(Math.floor((ms / 1000 / 60) % 60));
    this.secs.textContent = this.pad(Math.floor((ms / 1000) % 60));
  }

  pad(value) {
    return String(value).padStart(2, 0);
  }

  resetTimeValue() {
    this.days.textContent = '00';
    this.hours.textContent = '00';
    this.mins.textContent = '00';
    this.secs.textContent = '00';

    localStorage.removeItem('startTimeValue');
    localStorage.removeItem('currentValue');

    this.setDisabledStartBtn();
  }

  stopTimer() {
    clearInterval(this.intervalId);
  }

  countdown() {
    this.intervalId = setInterval(() => {
      this.differenceTime = this.countdownTime - Date.now();

      if (this.differenceTime <= 999) {
        this.handleResetBtn();
      }

      this.setCurrentTimeValue(this.differenceTime);
      this.converToDate(this.differenceTime);
    }, 1000);
  }

  startCountdown() {
    this.countdownTime = +this.getStartTimeValue() + Date.now();

    this.countdown();
  }

  continueCountdown() {
    this.countdownTime = +this.getCurrentTimeValue() + Date.now();

    this.countdown();
  }

  // startCountdown() {
  //   this.countdownTime = this.getStartTimeValue + Date.now();

  //   this.interval = setTimeout(function tickTack() {
  //     this.interval = setTimeout(tickTack, 1000);

  //     this.differenceTime = this.countdownTime - Date.now();
  //     this.converToDate(this.differenceTime);
  //   }, 1000);
  // }

  toggleStartBtnToPause() {
    this.startBtn.classList.replace('btn__continue', 'btn__pause');
    this.startBtn.textContent = 'Пауза';
  }

  toggleStartBtnToContinue() {
    this.startBtn.classList.replace('btn__pause', 'btn__continue');
    this.startBtn.textContent = 'Продолжить';
  }

  toggleStartBtnToStart() {
    if (this.startBtn.classList.contains('btn__pause')) {
      this.startBtn.classList.replace('btn__pause', 'btn__start');
    }
    if (this.startBtn.classList.contains('btn__continue')) {
      this.startBtn.classList.replace('btn__continue', 'btn__start');
    }
    this.startBtn.textContent = 'Старт';
  }

  toggleStartBtnClass() {
    if (this.startBtn.classList.contains('btn__start')) {
      this.startBtn.classList.replace('btn__start', 'btn__pause');
      this.toggleStartBtnToPause();
      this.startCountdown();
    } else if (this.startBtn.classList.contains('btn__pause')) {
      this.toggleStartBtnToContinue();
      this.stopTimer();
    } else if (this.startBtn.classList.contains('btn__continue')) {
      this.toggleStartBtnToPause();
      this.continueCountdown();
    }
  }

  //чтоб не было таких списков можно ловить же всплытие?!
  timerInit() {
    this.tenSecBtn.addEventListener('click', this.handleTenSecBtn);
    this.twentySecBtn.addEventListener('click', this.handleTwentySecBtn);
    this.thirtySecBtn.addEventListener('click', this.handleThirtySecBtn);
    this.wunHourBtn.addEventListener('click', this.hangleOneHourBtn);
    this.wunDayBtn.addEventListener('click', this.handleOneDayBtn);
    this.startBtn.addEventListener('click', this.handleStartBtn);
    this.resetBtn.addEventListener('click', this.handleResetBtn);
  }
}
