class Cover {
  constructor(color, roughOptions, canvas) {
    this.color = color;
    this.roughOptions = roughOptions;
    this.inTransition = false;
    this.covering = true;
    this.transitionType = null;
    this.position = 0;
    this.targetPosition = 0;
    this.speed = 0;
    this.canvas = canvas;
  }
  unveilLevel(){
    this.transitionType = "unveilLevel";
    this.position = 0;
    this.moveToPosition(-innerWidth, -60);
  }
  coverLevel(){
    if(!this.covering){
      this.transitionType = "coverLevel";
      this.position = -innerWidth;
      this.moveToPosition(0, 60);
    }
  }
  nextLevel(){
    this.transitionType = "nextLevel";
    this.position = innerWidth;
    this.moveToPosition(0, -60);
  }
  moveToPosition(position, speed){
    this.targetPosition = position;
    this.speed = speed;
    this.inTransition = true;
  }
  update(){
    if(this.inTransition){
      this.position += this.speed;
      if((this.speed > 0 && this.position >= this.targetPosition) || (this.speed < 0 && this.position <= this.targetPosition)){
        this.position = this.targetPosition;
        this.inTransition = false;
        switch (this.transitionType) {
          case "unveilLevel":
            gameRunning = true;
            this.transitionType = null;
            this.covering = false;
            break;
          case "coverLevel":
            gameRunning = false;
            this.transitionType = null;
            this.covering = true;
            levelEnded = false;
            menu.displayMenu("main-menu");
            break;
          case "nextLevel":
            gameRunning = false;
            this.covering = true;
            menu.goToNextLevel();
            this.unveilLevel();
            break;
          default:
        }
      }
    }
  }
  draw(context){
    context.fillStyle = this.color;
    context.fillRect(0,0,innerWidth,innerHeight);
    if(this.position > 0){
      context.clearRect(0,0, this.position, innerHeight);
    }
    else if(this.position < 0){
      context.clearRect(this.position,0, innerWidth - this.position, innerHeight);
    }
  }
  drawRough(roughContext, context){
    for(let i = 0; i < this.roughOptions.length; i++){
      roughContext.rectangle(0,0,innerWidth,innerHeight, this.roughOptions[i]);
    }
    if(this.position > 0){
      context.clearRect(0,0, this.position, innerHeight);
    }
    else if(this.position < 0){
      context.clearRect(innerWidth + this.position,0, innerWidth, innerHeight);
    }
  }
}

function LoadCover(){
  return new Cover(coverConfig.color, coverConfig.roughOptions, coverCanvas);
}
