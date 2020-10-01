export default class CountdownTimer {
  constructor({ selector }) {
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
    this.form = document.querySelector(`${selector}`);
  }

  setDisabledTimeBtn() {
    // this.form.childNodes[3].childNodes[1].childNodes.forEach(item => {
    //   if (item !== 'text') {
    //     console.log(item);
    //     // item.setAttribute('disabled', 'disabled');
    //   }
    // });
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
    localStorage.setItem('startTimeValue', +ms);
    this.converToDate(ms);
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
    this.toggleStartBtnToStart();
    this.stopTimer();
    this.removeDisabledBtn();
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
        this.resetTimeValue();
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

  timerInit() {
    this.form.addEventListener('click', event => {
      const target = event.target;
      if (target.nodeName !== 'BUTTON') {
        return;
      }

      if (
        target.dataset.value !== 'start' &&
        target.dataset.value !== 'reset'
      ) {
        const ms = target.dataset.time;
        this.setStartTimeValue(ms);
        this.removeDisabledStartBtn();
      }

      if (target.dataset.value === 'start') {
        this.setDisabledTimeBtn();
        this.toggleStartBtnClass();
      }

      if (target.dataset.value === 'reset') {
        this.resetTimeValue();
      }
    });
  }
}
