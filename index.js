const clockface = document.querySelector('#timer-1')

class CountdownTimer {
  constructor({ onTick, targetDate }) {
    this.onTick = onTick;
    this.targetDate = targetDate;
    this.clockface = clockface;
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
      this.onTick(time);
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
  
function updateClockface({ days, hours, mins, secs }) {
  clockface.textContent = `${days}:${hours}:${mins}:${secs}`;
}
const timer = new CountdownTimer({
  onTick: updateClockface,
  targetDate: new Date('Jan 01, 2022'),
});
timer.init()