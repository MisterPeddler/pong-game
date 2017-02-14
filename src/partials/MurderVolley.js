import {
    SVG_NS
} from '../settings';

export default class MurderVolley {
    constructor(radius,
        boardWidth,
        boardHeight,
        color1,
        color2,
        vy,
        vx) {

        this.radius = radius;
        this.boardWidth = boardWidth;
        this.boardHeight = boardHeight;
        this.color1 = color1;
        this.color2 = color2;

        this.vx = vx;
        this.vy = vy;

        this.volleyBallIsActive = false;
    }

    launchVolley(direction) {
        if (this.volleyBallIsActive) {
            return;
        }

        this.volleyBallIsActive = true;
        this.direction = direction;

        this.x = this.boardWidth / 2;
        this.y = this.boardHeight / 2;
    }

    stopVolley() {
        this.volleyBallIsActive = false;
    }

    wallCollision() {
        const hitTop = this.y - this.radius <= 0;
        const hitBottom = this.y + this.radius >= this.boardHeight;

        if (hitTop || hitBottom) {
            this.vy = -this.vy;
        }
    }

    paddleCollision(paddle1, paddle2) {
        if (this.vx > 0) {
            let paddle = paddle2.coordinates(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
            let [leftX, rightX, topY, bottomY] = paddle;

            if (
                this.x + this.radius >= leftX &&
                this.x + this.radius <= rightX &&
                this.y >= topY &&
                this.y <= bottomY
            ) {
                this.vx = -this.vx;
            }

        } else {
            let paddle = paddle1.coordinates(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
            let [leftX, rightX, topY, bottomY] = paddle;
            if (
                this.x - this.radius <= rightX &&
                this.x - this.radius >= leftX &&
                this.y >= topY &&
                this.y <= bottomY
            ) {
                this.vx = -this.vx;
            }

        }
    }

    goal(paddle) {
        paddle.score++;
    }

    screenShake() {
        $('#game').effect('shake', {
            times: 1,
            distance: 5
        }, 100);
    }

    colorPicker() {
        return Math.random() < 0.5 ? this.color1 : this.color2;
    }

    render(svg, paddle1, paddle2) {

        if (!this.volleyBallIsActive) {
            return;
        }

        this.wallCollision();
        this.paddleCollision(paddle1, paddle2);

        this.x += (this.vx * this.direction);
        this.y += this.vy;

        let ball = document.createElementNS(SVG_NS, 'circle');

        ball.setAttributeNS(null, 'cx', this.x);
        ball.setAttributeNS(null, 'cy', this.y);
        ball.setAttributeNS(null, 'r', this.radius);
        ball.setAttributeNS(null, 'fill', this.colorPicker());

        svg.appendChild(ball);

        const rightGoal = this.x + this.radius >= this.boardWidth;
        const leftGoal = this.x - this.radius <= 0;

        if (rightGoal) {

            this.screenShake();
              this.goal(paddle1);
            this.stopVolley();


        } else if (leftGoal) {

            this.screenShake();
            this.goal(paddle2);
            this.stopVolley();

        }

    }
}
