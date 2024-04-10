let s = {
    w: window.innerWidth,
    h: window.innerHeight,
};
const canvas = document.getElementById('canvas');

canvas.width = s.w;
canvas.height = s.h;

const c = canvas.getContext('2d');

c.fillRect(0, 0, s.w, s.h);

c.fillStyle = "#ffffff80";

// Function to calculate the midpoint between two points
function midpoint(A, B) {
    return { x: (A.x + B.x) / 2, y: (A.y + B.y) / 2 };
}

// Define the vertices of the outer triangle
var A = { x: s.w / 2, y: 0 };
var B = { x: 0, y: s.h };
var C = { x: s.w, y: s.h };

// Define the starting point as a random point inside the triangle
var currentPoint = {
    x: Math.random() * s.w,
    y: Math.random() * s.h
};

animate()
// Draw a large number of points
function animate() {
    for (let i = 0; i < 1000; i++) {

        // Randomly select one of the vertices
        var randomVertex = Math.floor(Math.random() * 3);
        // Update the current point
        currentPoint = midpoint(currentPoint, [A,B,C][randomVertex]);
        // Draw a point at the current location
        c.fillRect(currentPoint.x, currentPoint.y, .25, .25);
    }
    requestAnimationFrame(animate)
}
