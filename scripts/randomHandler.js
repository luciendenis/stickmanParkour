class RandomHandler {
  constructor(size) {
    this.size = size;
    this.sequence = [];
    for(let i = 0; i < size ; i++){
      this.sequence.push(Math.random());
    }
  }
  giveRandomIndex(){
    return Math.floor(Math.random()*this.size);
  }
  giveNumber(index){
    index = (index) % this.sequence.length;
    return this.sequence[index];
  }
}

var randomHandler = new RandomHandler(100000);
