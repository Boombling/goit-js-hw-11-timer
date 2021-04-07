// // new CountdownTimer({
// //   selector: '#timer-1',
// //   targetDate: new Date('Jul 17, 2019'),
// // });

// // /*
// //  * Оставшиеся дни: делим значение UTC на 1000 * 60 * 60 * 24, количество
// //  * миллисекунд в одном дне (миллисекунды * секунды * минуты * часы)
// //  */
// // const days = Math.floor(time / (1000 * 60 * 60 * 24));

// // /*
// //  * Оставшиеся часы: получаем остаток от предыдущего расчета с помощью оператора
// //  * остатка % и делим его на количество миллисекунд в одном часе
// //  * (1000 * 60 * 60 = миллисекунды * минуты * секунды)
// //  */
// // const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

// // /*
// //  * Оставшиеся минуты: получаем оставшиеся минуты и делим их на количество
// //  * миллисекунд в одной минуте (1000 * 60 = миллисекунды * секунды)
// //  */
// // const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));

// // /*
// //  * Оставшиеся секунды: получаем оставшиеся секунды и делим их на количество
// //  * миллисекунд в одной секунде (1000)
// //  */
// // const secs = Math.floor((time % (1000 * 60)) / 1000);

// class Timer {
//   constructor ( selector, countdown = 0 ) {
//   this.element = document.querySelector('#timer-1');
//   this.countdown = countdown;
// }
// getDays(){
//   Math.floor(time / (1000 * 60 * 60 * 24));
// }
// getHours(){
//   Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
// }
// getMinutes(){
//   Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
// }
// getSeconds(){
//   Math.floor((time % (1000 * 60)) / 1000);
// }
// render(){
//   this.element.innerHTML = `${this.getDays()}:${this.getHours()}:${this.getMinutes()}:${this.getSeconds()}:`
// }

// init(){
//   const interval = setInterval(() => {
//     this.countdown -= 1000;
//     if (this.countdown <= 0) {
//       this.countdown = 0;
//       clearInterval(interval);
//       return
//     }

//     this.render();
//   }, 1000);
// }
// }


// function pad (value) {
//   return String(value).padStart(2, '0');
// }

// // const timer = new CountdownTimer({
// //   selector: '#timer-1',
// //   targetDate: new Date('Jul 01, 2022'),
// // });
// const timer = new CountdownTimer('#timer-1', 10000)
// timer.init();
const refs = {
  clockface: document.querySelector('#timer-1'),
  targetDate: new Date('Jul 01, 2022'),
};

class Timer {
  constructor({ onTick }) {
    this.intervalId = null;
    this.targetDate = new Date('Jul 01, 2022');
    this.onTick = onTick;

    this.init();
  }

  init() {
    const time = this.getTimeComponents(0);
    this.onTick(time);
  }
  start() {
    // if (this.isActive) {
    //   return;
    // }

    // const startTime =  Date.now();
    // this.isActive = true;


//   const interval = setInterval(() => {
//     this.countdown -= 1000;
//     if (this.countdown <= 0) {
//       this.countdown = 0;
//       clearInterval(interval);
//       return
//     }

//     this.render();
//   }, 1000);
    
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = targetDate - currentTime;
      const time = this.getTimeComponents(deltaTime);

      this.onTick(time);
    }, 1000);
  }

  getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }
}

const timer = new Timer({
  onTick: updateClockface,
});

function updateClockface({ days, hours, mins, secs }) {
  refs.clockface.textContent = `${days}:${hours}:${mins}:${secs}`;
}