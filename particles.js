const canvas = document.getElementById('nebula-canvas');
const ctx = canvas.getContext('2d');

let stars = [];
const numStars = 800;
let centerX, centerY;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
centerX = canvas.width / 2;
centerY = canvas.height / 2;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    centerX = canvas.width / 2;
    centerY = canvas.height / 2;
});

class Star {
    constructor() {
        this.reset();
        // pre-warm positions so they don't all start at center
        this.z = Math.random() * canvas.width;
    }

    reset() {
        this.x = (Math.random() - 0.5) * canvas.width * 2; // wider spread
        this.y = (Math.random() - 0.5) * canvas.height * 2;
        this.z = canvas.width; // Start far away
        this.pz = this.z; // previous z
    }

    update() {
        this.z = this.z - 10; // Speed of travel (warp speed)

        if (this.z < 1) {
            this.reset();
            this.x = (Math.random() - 0.5) * canvas.width;
            this.y = (Math.random() - 0.5) * canvas.height;
            this.pz = this.z;
        }
    }

    draw() {
        // 3D projection formula
        // x' = x / z

        let sx = (this.x / this.z) * centerX + centerX;
        let sy = (this.y / this.z) * centerY + centerY;

        let r = (1 - this.z / canvas.width) * 2.5; // Size based on distance

        let px = (this.x / this.pz) * centerX + centerX;
        let py = (this.y / this.pz) * centerY + centerY;

        this.pz = this.z;

        if (sx < 0 || sx > canvas.width || sy < 0 || sy > canvas.height) {
            return;
        }

        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 255, 255, ${1 - this.z / canvas.width})`;
        ctx.lineWidth = r;
        ctx.moveTo(px, py);
        ctx.lineTo(sx, sy);
        ctx.stroke();
    }
}

function init() {
    stars = [];
    for (let i = 0; i < numStars; i++) {
        stars.push(new Star());
    }
}

function animate() {
    // Leave trails for warp effect? 
    // ctx.fillStyle = 'rgba(5, 5, 5, 0.4)'; 
    // ctx.fillRect(0, 0, canvas.width, canvas.height); 
    // Clear fully for crisp stars
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < stars.length; i++) {
        stars[i].update();
        stars[i].draw();
    }
    requestAnimationFrame(animate);
}

init();
animate();
