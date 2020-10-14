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

  _setDisabledTimeBtn() {
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

  _removeDisabledBtn() {
    this.tenSecBtn.removeAttribute('disabled');
    this.twentySecBtn.removeAttribute('disabled');
    this.thirtySecBtn.removeAttribute('disabled');
    this.wunHourBtn.removeAttribute('disabled');
    this.wunDayBtn.removeAttribute('disabled');
  }

  _setDisabledStartBtn() {
    this.startBtn.setAttribute('disabled', 'disabled');
  }

  _removeDisabledStartBtn() {
    this.startBtn.removeAttribute('disabled');
  }

  _setStartTimeValue(ms) {
    localStorage.setItem('startTimeValue', +ms);
    this._converToDate(ms);
  }

  _getStartTimeValue() {
    return localStorage.getItem('startTimeValue');
  }

  _setCurrentTimeValue(ms) {
    localStorage.setItem('currentValue', ms);
  }

  _getCurrentTimeValue() {
    return localStorage.getItem('currentValue');
  }

  _converToDate(ms) {
    this.days.textContent = `0${parseInt(ms / 1000 / 3600 / 24)}`;
    this.hours.textContent = this._pad(Math.floor((ms / 1000 / 3600) % 24));
    this.mins.textContent = this._pad(Math.floor((ms / 1000 / 60) % 60));
    this.secs.textContent = this._pad(Math.round((ms / 1000) % 60));
  }

  _pad(value) {
    return String(value).padStart(2, 0);
  }

  _resetTimeValue() {
    this._toggleStartBtnToStart();
    this._stopTimer();
    this._removeDisabledBtn();
    this.days.textContent = '00';
    this.hours.textContent = '00';
    this.mins.textContent = '00';
    this.secs.textContent = '00';

    localStorage.removeItem('startTimeValue');
    localStorage.removeItem('currentValue');

    this._setDisabledStartBtn();
  }

  _stopTimer() {
    clearInterval(this.intervalId);
  }

  _countdown() {
    this.intervalId = setInterval(() => {
      this.differenceTime = this.countdownTime - Date.now();
      console.log(this.differenceTime);

      if (this.differenceTime < 0) {
        console.log('reset');
        this._resetTimeValue();
        return;
      }

      this._setCurrentTimeValue(this.differenceTime);
      this._converToDate(this.differenceTime);
    }, 1000);
  }

  _startCountdown() {
    this.countdownTime = +this._getStartTimeValue() + Date.now();

    this._countdown();
  }

  _continueCountdown() {
    this.countdownTime = +this._getCurrentTimeValue() + Date.now();

    this._countdown();
  }

  // _startCountdown() {
  //   this.countdownTime = this.getStartTimeValue + Date.now();

  //   this.interval = setTimeout(function tickTack() {
  //     this.interval = setTimeout(tickTack, 1000);

  //     this.differenceTime = this.countdownTime - Date.now();
  //     this.converToDate(this.differenceTime);
  //   }, 1000);
  // }

  _toggleStartBtnToPause() {
    this.startBtn.classList.replace('btn__continue', 'btn__pause');
    this.startBtn.textContent = 'Пауза';
  }

  _toggleStartBtnToContinue() {
    this.startBtn.classList.replace('btn__pause', 'btn__continue');
    this.startBtn.textContent = 'Продолжить';
  }

  _toggleStartBtnToStart() {
    if (this.startBtn.classList.contains('btn__pause')) {
      this.startBtn.classList.replace('btn__pause', 'btn__start');
    }
    if (this.startBtn.classList.contains('btn__continue')) {
      this.startBtn.classList.replace('btn__continue', 'btn__start');
    }
    this.startBtn.textContent = 'Старт';
  }

  _toggleStartBtnClass() {
    if (this.startBtn.classList.contains('btn__start')) {
      this.startBtn.classList.replace('btn__start', 'btn__pause');
      this._toggleStartBtnToPause();
      this._startCountdown();
    } else if (this.startBtn.classList.contains('btn__pause')) {
      this._toggleStartBtnToContinue();
      this._stopTimer();
    } else if (this.startBtn.classList.contains('btn__continue')) {
      this._toggleStartBtnToPause();
      this._continueCountdown();
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
        this._setStartTimeValue(ms);
        this._removeDisabledStartBtn();
      }

      if (target.dataset.value === 'start') {
        this._setDisabledTimeBtn();
        this._toggleStartBtnClass();
      }

      if (target.dataset.value === 'reset') {
        this._resetTimeValue();
      }
    });
  }
}
