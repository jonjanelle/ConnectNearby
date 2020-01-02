class DefaultAnimator { 
    constructor() {
        this.isAnimating = true;
        this.container = document.getElementById('canvas-container');
        this.canvas = document.getElementById('canvas');
        this.context = canvas.getContext('2d');
        
        this.canvas.height = this.container.offsetHeight;
        this.canvas.width = this.container.offsetWidth;

        this.particleSize = 3;
        this.maxParticles = 100;
        this.threshold = 80;
        
        this._startAnimation = this._startAnimation.bind(this);  
        this._drawLine = this._drawLine.bind(this);
        this._setVelocity = this._setVelocity.bind(this);
        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);

        this._init();
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
        this._init();
    }
    
    _init() {
        this.particles = this._initParticles();      
    }

    _initParticles() {
        let particles = [];
        for (let i = 0; i < this.maxParticles; i++) {
            let particle = {
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: Math.floor(Math.random() + 1.3),
                vy: Math.floor(Math.random() + 1.3)
            }
            particles.push(particle);
        }

        return particles;
    }


    
    _drawLine(particle, particle2) {        
        this.context.beginPath();
        this.context.moveTo(particle.x, particle.y);
        this.context.lineTo(particle2.x, particle2.y);
        this.context.stroke();
    }

    _startAnimation() {
       this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
       for (let i = 0; i < this.maxParticles; i++) {
           let particle = this.particles[i];
           this.context.fillStyle = "white";
           this.context.fillRect(particle.x - this.particleSize / 2, particle.y - this.particleSize / 2, this.particleSize, this.particleSize);
            for (let j = i+1; j < this.maxParticles; j++) {
                let particle2 = this.particles[j];
                
                let dx = Math.abs(particle.x - particle2.x);
                let dy = Math.abs(particle.y - particle2.y);
                
                if (dx < this.threshold && dy < this.threshold) {
                    this.context.lineWidth = ((this.threshold * 2) - (dx + dy)) / 50;
                    let red = Math.max(255 - Math.floor(dx/20 + dy/2), 0);
                    let green = Math.min(Math.floor(dx/2 + dy/2), 255);
                    let blue = Math.max(255 - Math.floor(dx/2 + dy/2), 0)
                    this.context.strokeStyle = `rgb(${red}, ${green}, ${blue})`;
                    this._drawLine(particle, particle2);
                }
            }
    
            this._setVelocity(particle);
        }

        if (this.isAnimating) {
            window.requestAnimationFrame(this._startAnimation);
        }
    }
    
    _setVelocity(particle) {
        particle.x = particle.x + particle.vx;
        particle.y = particle.y + particle.vy;
        if (particle.x > this.canvas.width - this.particleSize || particle.x < this.particleSize)
            particle.vx = -particle.vx;
        if (particle.y > this.canvas.height - this.particleSize || particle.y < this.particleSize)
            particle.vy = -particle.vy;
    }
}