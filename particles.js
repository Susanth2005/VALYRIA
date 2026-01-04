const canvas = document.getElementById('nebula-canvas');
const ctx = canvas.getContext('2d');

let stars = [];
const numStars = 200; // Reduced count as per request for lightweight feel
let centerX, centerY;
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

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

// Parallax Listener
document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX - centerX) * 0.1; // Scale factor for subtlety
    mouseY = (e.clientY - centerY) * 0.1;
});

class Star {
    constructor() {
        this.reset();
        // pre-warm
        this.z = Math.random() * canvas.width;
    }

    reset() {
        this.x = (Math.random() - 0.5) * canvas.width * 2;
        this.y = (Math.random() - 0.5) * canvas.height * 2;
        this.z = canvas.width;
        this.pz = this.z;
    }

    update() {
        this.z = this.z - 5; // Drift speed

        if (this.z < 1) {
            this.reset();
            this.x = (Math.random() - 0.5) * canvas.width;
            this.y = (Math.random() - 0.5) * canvas.height;
            this.pz = this.z;
        }
    }

    draw() {
        // Apply parallax offset to the center point
        // Smooth easing for target
        targetX += (mouseX - targetX) * 0.05;
        targetY += (mouseY - targetY) * 0.05;

        // 3D projection
        let sx = (this.x / this.z) * centerX + centerX + targetX * (this.z / canvas.width); // Parallax effect inversely proportional to depth? Or just general shift.
        // Let's shift the whole perspective origin slightly
        let perspectiveOX = centerX + targetX;
        let perspectiveOY = centerY + targetY;

        sx = (this.x / this.z) * centerX + perspectiveOX;
        let sy = (this.y / this.z) * centerY + perspectiveOY;

        let r = (1 - this.z / canvas.width) * 3; // Size

        if (sx < 0 || sx > canvas.width || sy < 0 || sy > canvas.height) {
            return;
        }

        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${1 - this.z / canvas.width})`;
        ctx.arc(sx, sy, r, 0, Math.PI * 2);
        ctx.fill();
    }
}

function init() {
    stars = [];
    for (let i = 0; i < numStars; i++) {
        stars.push(new Star());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < stars.length; i++) {
        stars[i].update();
        stars[i].draw();
    }
    requestAnimationFrame(animate);
}

init();
animate();
