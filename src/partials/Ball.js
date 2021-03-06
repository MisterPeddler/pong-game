import {
    SVG_NS
} from '../settings';


export default class Ball {
    constructor(radius, boardWidth, boardHeight) {
        this.radius = radius;
        this.boardWidth = boardWidth;
        this.boardHeight = boardHeight;
        this.direction = Math.random() < 0.5 ? 1 : -1;

        this.ping = new Audio('public/sounds/pong-04.wav');

        this.reset();
    }

    reset() {
        this.x = this.boardWidth / 2;
        this.y = this.boardHeight / 2;

        this.vy = 0;

        while (this.vy === 0) {
            this.vy = Math.floor(Math.random() * 10 - 5);
        }

        this.vx = this.direction * (6 - Math.abs(this.vy));
    }

    wallCollision() {
        const hitLeft = this.x - this.radius <= 0;
        const hitRight = this.x + this.radius >= this.boardWidth;
        const hitTop = this.y - this.radius <= 0;
        const hitBottom = this.y + this.radius >= this.boardHeight;

        if (hitLeft || hitRight) {
            this.vx = -this.vx;
        } else if (hitTop || hitBottom) {
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
        this.reset();
    }

    screenShake() {
        $('#game').effect('shake', {
            times: 2,
            distance: 5
        }, 250);
    }

    render(svg, paddle1, paddle2, murderBall) {

        this.x += this.vx;
        this.y += this.vy;

        this.wallCollision();
        this.paddleCollision(paddle1, paddle2);

        let ball = document.createElementNS(SVG_NS, 'circle');
        ball.setAttributeNS(null, 'cx', this.x);
        ball.setAttributeNS(null, 'cy', this.y);
        ball.setAttributeNS(null, 'r', this.radius);
        ball.setAttributeNS(null, 'fill', '#fff');

        svg.appendChild(ball);

        const rightGoal = this.x + this.radius >= this.boardWidth;
        const leftGoal = this.x - this.radius <= 0;

        if (rightGoal) {
            this.direction = 1;
            this.goal(paddle1);

            this.screenShake();

            if (Math.abs(paddle1.score - paddle2.score) === 5) {
                murderBall.release('RIGHT');
            }

        } else if (leftGoal) {

            this.direction = -1;
            this.goal(paddle2);

            this.screenShake();

            if (Math.abs(paddle1.score - paddle2.score) === 5) {
                murderBall.release('LEFT');
            }
        }

    }
}
