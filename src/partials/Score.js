import { SVG_NS } from '../settings';

export default class Score {
    constructor(distanceFromCenter, y, size, side, gameWidth) {
        this.distanceFromCenter = distanceFromCenter;
        this.x = 0;
        this.y = y;
        this.size = size;
        this.gameWidth = gameWidth;
        this.side = side;

    }

    setXPos(element){
      let elementWidth = element.getBoundingClientRect().width;

      if(this.side === 'LEFT'){
        this.x = this.gameWidth/2 - elementWidth - this.distanceFromCenter;
      }else if(this.side === 'RIGHT'){
        this.x = this.gameWidth/2 + this.distanceFromCenter;
      }

    }

    render(svg, points) {

        let score = document.createElementNS(SVG_NS, 'text');
        score.setAttributeNS(null, 'x', this.x);
        score.setAttributeNS(null, 'y', this.y);
        score.setAttributeNS(null, 'font-size', this.size);
        score.setAttributeNS(null, 'font-family', 'Silkscreen Web');
        score.setAttributeNS(null, 'fill', '#fff');
        score.innerHTML = points;

        svg.appendChild(score);

        this.setXPos(score);

    }
}
