import {
    SVG_NS
} from '../settings';
import Ball from './Ball';
import MurderVolley from './MurderVolley';


export default class MurderBall {
    constructor(radius, boardWidth, boardHeight) {
        this.radius = radius;
        this.boardWidth = boardWidth;
        this.boardHeight = boardHeight;
        this.renderCount = 0;

        this.murderVolley1 = new MurderVolley(8, this.boardWidth, this.boardHeight, 'black', 'white', -5, 1);
        this.murderVolley2 = new MurderVolley(8, this.boardWidth, this.boardHeight, 'black', 'white', -4, 2);
        this.murderVolley3 = new MurderVolley(8, this.boardWidth, this.boardHeight, 'black', 'white', -3, 3);
        this.murderVolley4 = new MurderVolley(8, this.boardWidth, this.boardHeight, 'black', 'white', -2, 4);
        this.murderVolley5 = new MurderVolley(8, this.boardWidth, this.boardHeight, 'black', 'white', -1, 5);
        this.murderVolley6 = new MurderVolley(8, this.boardWidth, this.boardHeight, 'black', 'white', 1, 5);
        this.murderVolley7 = new MurderVolley(8, this.boardWidth, this.boardHeight, 'black', 'white', 2, 4);
        this.murderVolley8 = new MurderVolley(8, this.boardWidth, this.boardHeight, 'black', 'white', 3, 3);
        this.murderVolley9 = new MurderVolley(8, this.boardWidth, this.boardHeight, 'black', 'white', 4, 2);
        this.murderVolley10 = new MurderVolley(8, this.boardWidth, this.boardHeight, 'black', 'white', 5, 1);


        this.murderBallIsActive = false;

    }

    release(rightOrLeft) {
        //stops new murder balls from appearing while one is active
        if (this.murderBallIsActive) {
            return;
        }

        //sends the murder ball left or right based on who earned it
        if (rightOrLeft === 'RIGHT') {
            this.direction = 1;
        } else if (rightOrLeft === 'LEFT') {
            this.direction = -1;
        }

        //flag for tracking murder ball activity
        this.murderBallIsActive = true;

        //starts the murder ball in the middle
        this.x = this.boardWidth / 2;
        this.y = this.boardHeight / 2;

        this.setNewDirection();
    }


    //changes the direction of the murder ball
    setNewDirection() {
        this.vy = 0;

        while (this.vy === 0) {
            this.vy = Math.floor(Math.random() * 10 - 5);
        }

        this.vx = this.direction * (6 - Math.abs(this.vy));
    }

    stop() {
        this.murderBallIsActive = false;
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
                this.direction *= -1;
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
                this.direction *= -1;
            }

        }
    }


    //randomly assigns one of two colors to the murder ball
    colorPicker() {
        return Math.random() < 0.5 ? 'red' : 'pink';
    }

    renderMurderVolley(svg, paddle1, paddle2, direction) {
        this.murderVolley1.render(svg, paddle1, paddle2, direction);
        this.murderVolley2.render(svg, paddle1, paddle2, direction);
        this.murderVolley3.render(svg, paddle1, paddle2, direction);
        this.murderVolley4.render(svg, paddle1, paddle2, direction);
        this.murderVolley5.render(svg, paddle1, paddle2, direction);
        this.murderVolley6.render(svg, paddle1, paddle2, direction);
        this.murderVolley7.render(svg, paddle1, paddle2, direction);
        this.murderVolley8.render(svg, paddle1, paddle2, direction);
        this.murderVolley9.render(svg, paddle1, paddle2, direction);
        this.murderVolley10.render(svg, paddle1, paddle2, direction);
    }

    render(svg, paddle1, paddle2) {

        //updates the murder ball location every 9 render frames
        if (this.renderCount % 9 === 0) {
            this.x += this.vx;
            this.y += this.vy;
        }

        //changes direction every 100 render frames
        if (this.renderCount % 100 === 0) {
            this.setNewDirection();
        }

        this.renderCount++;

        this.wallCollision();
        this.paddleCollision(paddle1, paddle2);

        //prevents the murderball from being rendered
        //when it's not required
        if (this.murderBallIsActive) {
            let ball = document.createElementNS(SVG_NS, 'circle');
            ball.setAttributeNS(null, 'cx', this.x);
            ball.setAttributeNS(null, 'cy', this.y);
            ball.setAttributeNS(null, 'r', this.radius);
            ball.setAttributeNS(null, 'fill', this.colorPicker());

            svg.appendChild(ball);
            this.renderMurderVolley(svg, paddle1, paddle2, -1);

            const rightGoal = this.x + this.radius >= this.boardWidth;
            const leftGoal = this.x - this.radius <= 0;

            if (rightGoal) {
                this.murderVolley1.launchVolley(1);
                this.murderVolley2.launchVolley(1);
                this.murderVolley3.launchVolley(1);
                this.murderVolley4.launchVolley(1);
                this.murderVolley5.launchVolley(1);
                this.murderVolley6.launchVolley(1);
                this.murderVolley7.launchVolley(1);
                this.murderVolley8.launchVolley(1);
                this.murderVolley9.launchVolley(1);
                this.murderVolley10.launchVolley(1);
                this.stop();
            } else if (leftGoal) {
                this.murderVolley1.launchVolley(-1);
                this.murderVolley2.launchVolley(-1);
                this.murderVolley3.launchVolley(-1);
                this.murderVolley4.launchVolley(-1);
                this.murderVolley5.launchVolley(-1);
                this.murderVolley6.launchVolley(-1);
                this.murderVolley7.launchVolley(-1);
                this.murderVolley8.launchVolley(-1);
                this.murderVolley9.launchVolley(-1);
                this.murderVolley10.launchVolley(-1);
                this.stop();
            }
        }

        this.renderMurderVolley(svg, paddle1, paddle2);

    }
}
