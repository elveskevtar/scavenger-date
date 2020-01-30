import React, { Component } from 'react';
import App from './App';

import './Splash.css';

class Splash extends Component {
    constructor() {
        super();
        this.state = {
            splashHeight: 0,
            streaks: [],
            style: {
                height: window.innerHeight + 'px'
            }
        };
    }

    getRandomInt(min, max) {
        return Math.floor(min + Math.random() * (max - min));
    }

    getRandomColor() {
        let rand = this.getRandomInt(0, 5);
        if (rand === 0) {
            return '#FCC141';
        } else if (rand === 1) {
            return '#E94D34';
        } else if (rand === 2) {
            return '#EB527E';
        } else if (rand === 3) {
            return '#F4ABC8';
        } else if (rand === 4) {
            return '#8FD2E5';
        }
    }

    updateDimensions = () => {
        this.setState({style: { height: window.innerHeight + 'px' }});
        this.render();
        this.setState({
            splashHeight: document.getElementById('Splash').clientHeight
        })
    }

    componentDidMount = () => {
        this.updateDimensions();
        window.addEventListener('resize', this.updateDimensions);
        this.tick();
    }

    componentWillUnmount = () => {
        window.removeEventListener('resize', this.updateDimensions);
    }

    getAlive = (streak) => {
        if (streak.dir === 0) {
            return streak.left < window.innerWidth;
        } else if (streak.dir === 1) {
            return streak.top < this.state.splashHeight;
        } else if (streak.dir === 2) {
            return streak.left >= 0 - streak.style.width;
        } else if (streak.dir === 3) {
            return streak.top >= 0 - streak.style.height;
        }
    }

    tick = () => {
        let streaks = this.state.streaks;
        let rand = this.getRandomInt(0, 100);

        if (rand >= 50 && rand < 54) {
            let dir = this.getRandomInt(0, 4);
            let color = this.getRandomColor();
            let speed = this.getRandomInt(5, 10);
            let length = this.getRandomInt(200, 300);
            let thickness = window.innerHeight / this.getRandomInt(30, 33);
            let id = 0;
            let width = 0;
            let height = 0;
            let fromTop = 0;
            let fromLeft = 0;
            if (streaks.length > 0) {
                id = streaks[streaks.length - 1].id + 1;
            }
            if (dir === 0 || dir === 2) {
                width = length;
                height = thickness;
                fromTop = this.getRandomInt(0, this.state.splashHeight);
                if (dir === 2) {
                    fromLeft = window.innerWidth;
                }
            } else if (dir === 1 || dir === 3) {
                width = thickness;
                height = length;
                fromLeft = this.getRandomInt(0, window.innerWidth);
                if (dir === 3) {
                    fromTop = this.state.splashHeight;
                }
            }
            streaks.push({
                id: id,
                speed: speed,
                opacity: 0,
                dir: dir,
                top: fromTop,
                left: fromLeft,
                style: {
                    backgroundColor: color,
                    width: width,
                    height: height
                }
            });
        }

        for (let i = 0; i < streaks.length; i++) {
            if (streaks[i].opacity < 0.7) {
                streaks[i].opacity += 0.003;
            }
            if (streaks[i].dir === 0) {
                streaks[i].left += streaks[i].speed;
            } else if (streaks[i].dir === 1) {
                streaks[i].top += streaks[i].speed;
            } else if (streaks[i].dir === 2) {
                streaks[i].left -= streaks[i].speed;
            } else if (streaks[i].dir === 3) {
                streaks[i].top -= streaks[i].speed;
            }
        }

        streaks = streaks.filter(this.getAlive);
        this.setState({ streaks: streaks });
        setTimeout(this.tick, 16);
    }

    render = () => {
        let streaks = this.state.streaks;
        streaks = streaks.map((streak) =>
            <div id='streak' key={streak.id} style={Object.assign({}, streak.style,
                {top: streak.top + 'px'}, {left: streak.left + 'px'},
                {opacity: streak.opacity})} />);
        return (
            <div id="Splash" className="Splash">
                {streaks}
                <div className='Splash-top' style={this.state.style}>
                    <App />
                </div>
            </div>
        );
    }
}

export default Splash;
