function isString(str) {
    return (typeof str === "string" || str instanceof String);
}

class Main {
    constructor(type=null) {
        this.animator = null;
        this.setType(type);
    }

    start = () => {
        if (this.animator !== null && !this.animator.isAnimating) {
            this.animator.stop();
            this.animator.start();
        }
        this.animator.start();
    }
        
    stop = () => {
        if (this.animator !== null)
            this.animator.stop();
    }

    reset = () => {
        if (this.animator !== null) {
            this.animator.reset();
        }
    }

    setType = (type) => {
        if (isString(type) && this.animator !== null && this.animator.name === type) {
            return;
        }

        if (this.animator !== null) { this.animator.stop(); }

        if (DefaultAnimator.name === type && !(this.animator instanceof DefaultAnimator)) {
            this.animator = new DefaultAnimator();
        } else if (OrbitAnimator.name === type && !(this.animator instanceof OrbitAnimator)) {
            this.animator = new OrbitAnimator();        
        } else {
            console.error(`Invalid type: ${type}   Valid types: 'DefaultAnimator', 'OrbitAnimator'`);
            this.animator = null;
            return;
        }
        
        this.animator.start();
        this.animator.stop();
    }

    
}