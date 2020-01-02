function d2r(degrees) {
    return degrees*Math.PI/180.0;
}  

function dist2(p1, p2) {
    return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
}

function manhattan(p1, p2) {
    return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
}

class OrbitAnimator { 
    constructor() {
        this.isAnimating = true;
        this.container = document.getElementById('canvas-container');
        this.canvas = document.getElementById('canvas');
        this.context = canvas.getContext('2d');
        
        let xWidth = this.container.offsetWidth;
        let xHeight = this.container.offsetHeight;
        this.centerX = this.canvas.width/2;
        this.centerY = this.canvas.height/2;
        this.canvas.height = xHeight;
        this.canvas.width = xWidth;
        

        this.threshold = 200;  
        this._init(15, 8);

        this._startAnimation = this._startAnimation.bind(this);  
        this._drawLine = this._drawLine.bind(this);
        this._init = this._init.bind(this);
        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
    }
    
    stop() {
        this.isAnimating = false;
    }

    start() {
        this.isAnimating = true;
        this._startAnimation();
    }
    
    reset() {
        this.stop();
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.start();
        this.stop();
    }

    _init(n, size) {
        this.particles = [];
        for (let i = 1; i <= n; i++) {
            this.particles.push({
                theta: 0,
                r: 25*i,
                x: 25*i,
                y: 0,
                centerX: this.centerX,
                centerY: this.centerY, 
                dTheta: Math.random()*4,
                size: size
            });
        }
        this._initStyles();
    }

    _initStyles() {
        this.context.fillStyle = 'rgba(255, 255, 255, 0.8)';
        this.context.strokeStyle = 'rgba(0, 153, 255, 0.4)';
    }
    
    _startAnimation() { 
        var time = new Date();
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach(p => {
            this.context.fillRect(p.centerX + p.x, p.centerY + p.y, p.size, p.size);
            p.theta += p.dTheta;
            p.x = p.r*Math.cos(d2r(p.theta));
            p.y = p.r*Math.sin(d2r(p.theta));

            // outline
            this.context.beginPath();
            this.context.arc(this.canvas.width/2, this.canvas.height/2, p.r, 0, Math.PI * 2, false); 
            this.context.stroke();

            this.particles.forEach(p2 => {
                if (dist2(p, p2) < this.threshold*this.threshold) {
                    this._drawLine(p, p2);
                }
            });
        });
        
        
        if (this.isAnimating) {
            window.requestAnimationFrame(this._startAnimation);
        }
    }

    /*
     * Draw a line between two objects p1 and p2. 
     * p1 and p2 must have properties x and y where: 
     * x and y are numbers.
     */
    _drawLine(p1, p2) {        
        this.context.beginPath();
        this.context.moveTo(p1.x + this.centerX, p1.y + this.centerY);
        this.context.lineTo(p2.x + this.centerX, p2.y + this.centerY);
        this.context.stroke();
    }
}