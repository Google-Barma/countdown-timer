(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{L1EO:function(t,e,n){},QfWi:function(t,e,n){"use strict";n.r(e);n("L1EO"),n("Muwe"),n("e+qc"),n("y89P");new(function(){function t(t){var e=t.selector;this.startBtn=document.querySelector(e+" .btn__start"),this.resetBtn=document.querySelector(e+" .btn__reset"),this.tenSecBtn=document.querySelector(e+' button[data-value="10sec"]'),this.twentySecBtn=document.querySelector(e+' button[data-value="20sec"]'),this.thirtySecBtn=document.querySelector(e+' button[data-value="30sec"]'),this.wunHourBtn=document.querySelector(e+' button[data-value="1hours"]'),this.wunDayBtn=document.querySelector(e+' button[data-value="1days"]'),this.days=document.querySelector(e+' .value[data-value="days"]'),this.hours=document.querySelector(e+' .value[data-value="hours"]'),this.mins=document.querySelector(e+' .value[data-value="mins"]'),this.secs=document.querySelector(e+' .value[data-value="secs"]'),this.form=document.querySelector(""+e)}var e=t.prototype;return e.setDisabledTimeBtn=function(){this.tenSecBtn.setAttribute("disabled","disabled"),this.twentySecBtn.setAttribute("disabled","disabled"),this.thirtySecBtn.setAttribute("disabled","disabled"),this.wunHourBtn.setAttribute("disabled","disabled"),this.wunDayBtn.setAttribute("disabled","disabled")},e.removeDisabledBtn=function(){this.tenSecBtn.removeAttribute("disabled"),this.twentySecBtn.removeAttribute("disabled"),this.thirtySecBtn.removeAttribute("disabled"),this.wunHourBtn.removeAttribute("disabled"),this.wunDayBtn.removeAttribute("disabled")},e.setDisabledStartBtn=function(){this.startBtn.setAttribute("disabled","disabled")},e.removeDisabledStartBtn=function(){this.startBtn.removeAttribute("disabled")},e.setStartTimeValue=function(t){localStorage.setItem("startTimeValue",+t),this.converToDate(t)},e.getStartTimeValue=function(){return localStorage.getItem("startTimeValue")},e.setCurrentTimeValue=function(t){localStorage.setItem("currentValue",t)},e.getCurrentTimeValue=function(){return localStorage.getItem("currentValue")},e.converToDate=function(t){this.days.textContent="0"+parseInt(t/1e3/3600/24),this.hours.textContent=this.pad(Math.floor(t/1e3/3600%24)),this.mins.textContent=this.pad(Math.floor(t/1e3/60%60)),this.secs.textContent=this.pad(Math.floor(t/1e3%60))},e.pad=function(t){return String(t).padStart(2,0)},e.resetTimeValue=function(){this.toggleStartBtnToStart(),this.stopTimer(),this.removeDisabledBtn(),this.days.textContent="00",this.hours.textContent="00",this.mins.textContent="00",this.secs.textContent="00",localStorage.removeItem("startTimeValue"),localStorage.removeItem("currentValue"),this.setDisabledStartBtn()},e.stopTimer=function(){clearInterval(this.intervalId)},e.countdown=function(){var t=this;this.intervalId=setInterval((function(){t.differenceTime=t.countdownTime-Date.now(),t.differenceTime<=999&&t.resetTimeValue(),t.setCurrentTimeValue(t.differenceTime),t.converToDate(t.differenceTime)}),1e3)},e.startCountdown=function(){this.countdownTime=+this.getStartTimeValue()+Date.now(),this.countdown()},e.continueCountdown=function(){this.countdownTime=+this.getCurrentTimeValue()+Date.now(),this.countdown()},e.toggleStartBtnToPause=function(){this.startBtn.classList.replace("btn__continue","btn__pause"),this.startBtn.textContent="Пауза"},e.toggleStartBtnToContinue=function(){this.startBtn.classList.replace("btn__pause","btn__continue"),this.startBtn.textContent="Продолжить"},e.toggleStartBtnToStart=function(){this.startBtn.classList.contains("btn__pause")&&this.startBtn.classList.replace("btn__pause","btn__start"),this.startBtn.classList.contains("btn__continue")&&this.startBtn.classList.replace("btn__continue","btn__start"),this.startBtn.textContent="Старт"},e.toggleStartBtnClass=function(){this.startBtn.classList.contains("btn__start")?(this.startBtn.classList.replace("btn__start","btn__pause"),this.toggleStartBtnToPause(),this.startCountdown()):this.startBtn.classList.contains("btn__pause")?(this.toggleStartBtnToContinue(),this.stopTimer()):this.startBtn.classList.contains("btn__continue")&&(this.toggleStartBtnToPause(),this.continueCountdown())},e.timerInit=function(){var t=this;this.form.addEventListener("click",(function(e){var n=e.target;if("BUTTON"===n.nodeName){if("start"!==n.dataset.value&&"reset"!==n.dataset.value){var s=n.dataset.time;t.setStartTimeValue(s),t.removeDisabledStartBtn()}"start"===n.dataset.value&&(t.setDisabledTimeBtn(),t.toggleStartBtnClass()),"reset"===n.dataset.value&&t.resetTimeValue(),console.dir(t.form.childNodes[3].childNodes[1].childNodes)}}))},t}())({selector:"#timer-1"}).timerInit()}},[["QfWi",1,2]]]);
//# sourceMappingURL=main.f5fa45b1e4e0dcb7574e.js.map