class Timer{
  constructor() {
    this.running = false;
    this.sum = 0;
    this.lastStart = null;
  }
  start(){
    this.running = true;
    this.lastStart = performance.now();
  }
  pause(){
    this.running = false;
    this.sum += performance.now() - this.lastStart;
    this.lastStart = null;
  }
  resume(){
    this.running = true;
    this.lastStart = performance.now();
  }
  reset(){
    this.running = false;
    this.sum = 0;
    this.lastStart = null;
  }
  totalTime(){
    let sum = this.sum;
    if(this.lastStart != null) sum += performance.now() - this.lastStart;
    return sum;
  }
  updateCurrentTimeDiv(){
    if(this.running){
      menu.updateCurrentTimeDiv(this.getCurrentTimeString());
    }
  }
  getCurrentTimeString(){
    return Timer.millisecondsToString(this.totalTime());
  }
  static millisecondsToString(duration){
    if(duration == null || duration == undefined) return "-- : --. --- ";
    let milliseconds = Math.floor(duration % 1000);
    let seconds = Math.floor((duration / 1000) % 60);
    let minutes = Math.floor((duration / (1000 * 60)) % 60);

    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 100) ? (milliseconds < 10) ? (milliseconds == 0) ? "000" : "00" + milliseconds : "0" + milliseconds : milliseconds;

    return minutes + ":" + seconds + "." + milliseconds;
  }
}
