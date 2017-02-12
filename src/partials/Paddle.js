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
        this.speed = 40;
        this.score = 0;
        this.gameIsNotPaused = true;

        document.addEventListener('keydown', event => {
            //  console.log('key pressed');
            switch (event.keyCode) {
                case up:
                    if (this.gameIsNotPaused) {
                        this.up();
                    }
                    break;

                case down:
                    if (this.gameIsNotPaused) {
                        this.down();
                    }
                    break;

                case KEYS.spaceBar:
                    this.gameIsNotPaused = !this.gameIsNotPaused;
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

        let paddle = document.createElementNS(SVG_NS, 'rect');
        paddle.setAttributeNS(null, 'x', this.x);
        paddle.setAttributeNS(null, 'y', this.y);
        paddle.setAttributeNS(null, 'width', this.width);
        paddle.setAttributeNS(null, 'height', this.height);
        paddle.setAttributeNS(null, 'fill', '#fff');

        svg.appendChild(paddle);

    }
}
