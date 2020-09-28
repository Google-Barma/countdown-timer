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
    this.selector = selector;
    this.startTimeValue = null;

    this.handleTenSecBtn = this.handleTenSecBtn.bind(this);
    this.handleTwentySecBtn = this.handleTwentySecBtn.bind(this);
    this.handleThirtySecBtn = this.handleThirtySecBtn.bind(this);
    this.handleOneMinBtn = this.handleOneMinBtn.bind(this);
    this.hangleOneHourBtn = this.hangleOneHourBtn.bind(this);
    this.handleOneDayBtn = this.handleOneDayBtn.bind(this);

    this.startBtn = document.querySelector(`${selector} .btn__start-pause`);
    this.resetBtn = document.querySelector(`${selector} .bnt__reset`);
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

  timerInit() {
    this.tenSecBtn.addEventListener('click', this.handleTenSecBtn);
    this.twentySecBtn.addEventListener('click', this.handleTwentySecBtn);
    this.thirtySecBtn.addEventListener('click', this.handleThirtySecBtn);
    this.wunHourBtn.addEventListener('click', this.hangleOneHourBtn);
    this.wunDayBtn.addEventListener('click', this.handleOneDayBtn);
  }

  handleTenSecBtn() {
    this.setStartTimeValue(10000);
  }

  handleTwentySecBtn() {
    this.setStartTimeValue(20000);
  }

  handleThirtySecBtn() {
    this.setStartTimeValue(30000);
  }

  handleOneMinBtn() {
    this.setStartTimeValue(60000);
  }

  hangleOneHourBtn() {
    this.setStartTimeValue(3600000);
  }
  handleOneDayBtn() {
    this.setStartTimeValue(86400000);
  }

  setStartTimeValue(ms) {
    this.startTimeValue = ms;
    this.countTimeDate(this.startTimeValue);
  }

  timeLog() {
    console.log(this.days);
  }

  countTimeDate(ms) {
    this.days.textContent = `0 ${parseInt(ms / 1000 / 3600 / 24)}`;
    this.hours.textContent = this.pad(Math.floor((ms / 1000 / 3600) % 24));
    this.mins.textContent = this.pad(Math.floor((ms / 1000 / 60) % 60));
    this.secs.textContent = this.pad(Math.floor((ms / 1000) % 60));
  }

  pad = function (value) {
    return String(value).padStart(2, 0);
  };
}
