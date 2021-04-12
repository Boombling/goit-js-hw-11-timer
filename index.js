const ref = {
    dayTime: document.querySelector('.value[data-value="days"]'),
    hoursTime: document.querySelector('.value[data-value="hours"]'),
    minsTime: document.querySelector('.value[data-value="mins"]'),
    secsTime: document.querySelector('.value[data-value="secs"]'),
}

class CountdownTimer {
  constructor({ onTick, selector, targetDate }) {
    this.onTick = onTick;
    this.selector = selector;
    this.targetDate = targetDate;
  }
  init() {
    const startTime = this.targetDate;
    const interval = setInterval(() => {
      const carrentTime = Date.now();
      const deltaTime = startTime - carrentTime;
      if (deltaTime <= 0) {
        return clearInterval(interval);
      }
      const time = this.getTimeComponents(deltaTime);
      this.onTick(time, this.selector);
    }, 1000)

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
  
function updateClockface({ days, hours, mins, secs }, ) {
  ref.dayTime.textContent = `${days}`;
  ref.hoursTime.textContent = `${hours}`;
  ref.minsTime.textContent = `${mins}`;
  ref.secsTime.textContent = `${secs}`;
}
const timer = new CountdownTimer({
  onTick: updateClockface,
  selector: "#timer-1",
  targetDate: new Date('Jan 01, 2022'),
});
timer.init()