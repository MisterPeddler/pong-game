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
        this.speed = 5;
        this.score = 0;
        this.gameIsNotPaused = true;

        this.upPressed = false;
        this.downPressed = false;

        document.addEventListener('keydown', event => {
            switch (event.keyCode) {
                case up:
                      console.log('up pressed');
                      this.upPressed = true;
                    break;

                case down:
                      this.downPressed = true;
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


    up() {
        this.y = Math.max(0, this.y - this.speed);
    }

    down() {
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
