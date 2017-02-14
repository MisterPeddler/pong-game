import {
    SVG_NS,
    KEYS
} from '../settings';
import Board from './Board';
import Paddle from './Paddle';
import Ball from './Ball';
import Score from './Score';
import MurderBall from './MurderBall';

export default class Game {

    constructor(element, width, height) {

        this.pause = false;

        this.element = element;
        this.width = width;
        this.height = height;

        this.gameElement = document.getElementById(this.element);

        this.board = new Board(this.width, this.height);

        this.boardGap = 10;
        this.paddleWidth = 8;
        this.paddleHeight = 56;

        this.paddle1 = new Paddle(this.height,
            this.paddleWidth,
            this.paddleHeight,
            this.boardGap,
            (this.height - this.paddleHeight) / 2,
            KEYS.a,
            KEYS.z);

        this.paddle2 = new Paddle(this.height,
            this.paddleWidth,
            this.paddleHeight,
            this.width - this.boardGap - this.paddleWidth,
            (this.height - this.paddleHeight) / 2,
            KEYS.up,
            KEYS.down);

        this.ball = new Ball(8, this.width, this.height);
        this.murderBall = new MurderBall(5, this.width, this.height);

        this.player1Score = new Score(50, 30, 30, 'LEFT', this.width);
        this.player2Score = new Score(50, 30, 30, 'RIGHT', this.width);

        document.addEventListener('keydown', event => {
            if (event.keyCode === KEYS.spaceBar) {
                this.pause = !this.pause;
            }
        });

    }

    render() {

        if (this.pause) {
            return
        }

        this.gameElement.innerHTML = '';

        let svg = document.createElementNS(SVG_NS, 'svg');
        svg.setAttributeNS(null, 'width', this.width);
        svg.setAttributeNS(null, 'height', this.height);
        svg.setAttributeNS(null, 'viewBox', `0 0 ${this.width} ${this.height}`);
        this.gameElement.appendChild(svg);

        this.board.render(svg);
        this.paddle1.render(svg);
        this.paddle2.render(svg);

        this.ball.render(svg, this.paddle1, this.paddle2);


        this.player1Score.render(svg, this.paddle1.score);
        this.player2Score.render(svg, this.paddle2.score);

      
          this.murderBall.render(svg, this.paddle1, this.paddle2);


    }

}
