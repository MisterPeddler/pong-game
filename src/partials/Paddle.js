import {
    SVG_NS,
    KEYS
} from '../settings';

export default class Paddle {
    constructor(boardHeight, width, height, x, y, up, down) {
        this.boardHeight = boardHeight;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.speed = 0;
        this.maxSpeed = 10;
        this.score = 0;
        this.gameIsNotPaused = true;

        this.upPressed = false;
        this.downPressed = false;

        document.addEventListener('keydown', event => {
            switch (event.keyCode) {
                case up:
                      console.log('up pressed');
                      this.speed = 0;
                      this.upPressed = true;
                    break;

                case down:
                      this.downPressed = true;
                      this.speed = 0;
                        console.log('down pressed');
                    break;

                case KEYS.spaceBar:
                    this.gameIsNotPaused = !this.gameIsNotPaused;
                    break;
            }

        });

        document.addEventListener('keyup', event => {
            switch (event.keyCode) {
                case up:
                      this.upPressed = false;
                        console.log('up released');
                    break;

                case down:
                    this.downPressed = false;
                      console.log('down released');
                    break;
            }
        });
    }

    incrementSpeed(){
      if(this.speed < this.maxSpeed){
        this.speed = this.speed + 0.5;
      }
    }

    up() {
      this.incrementSpeed();
        this.y = Math.max(0, this.y - this.speed);
    }

    down() {
      this.incrementSpeed();
        this.y = Math.min(this.boardHeight - this.height, this.y + this.speed);
    }


    coordinates(x, y, width, height) {
        let leftX = x;
        let rightX = x + width;
        let topY = y;
        let bottomY = y + height;
        return [leftX, rightX, topY, bottomY];
    }

    render(svg) {

      //I think this will change speed based on processor
      //does the game render loop only run at a certain rate?

      if(this.upPressed){this.up();}
      else if(this.downPressed){this.down();}

        let paddle = document.createElementNS(SVG_NS, 'rect');
        paddle.setAttributeNS(null, 'x', this.x);
        paddle.setAttributeNS(null, 'y', this.y);
        paddle.setAttributeNS(null, 'width', this.width);
        paddle.setAttributeNS(null, 'height', this.height);
        paddle.setAttributeNS(null, 'fill', '#fff');

        svg.appendChild(paddle);

    }
}
