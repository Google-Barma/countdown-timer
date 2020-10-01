import './styles.css';

import CountdownTimer from './js/countDownTimer';

const timer = new CountdownTimer({ selector: '#timer-1' });

timer.timerInit();

console.log(timer);
