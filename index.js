var gravityConstant = 0.098;

var counter = -1;
const cord = [];

var canvas = '';
var ctx = '';

class Ball {
    constructor(x, y, dy, ballRadius, damperingCoefficient, ballColor) {
        this.x = x;
        this.y = y;
        this.shiftY = dy;
        this.ballRadius = ballRadius;
        this.dampering = damperingCoefficient;
        this.ballColor = ballColor;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    canvas = document.getElementById("ballCanvas");
    ctx = canvas.getContext("2d");

    clearCanvas = document.getElementById("clearCanvasButton");

    clearCanvas.addEventListener('click', (event) => {
        cord.length = 0;
        counter = -1;
    })
    
    canvas.addEventListener('click', (event) => {
        if (counter === 14) {
            cord.shift();
        }
        else {
            counter = counter + 1;
        }
        cord[counter] = new Ball(event.pageX  - canvas.offsetLeft, 
            event.pageY - canvas.offsetTop, 
            0, 
            Number(document.getElementById("ballRadius").value), 
            Number(document.getElementById("damperingCoef").value) / 100,
            document.getElementById("ballColor").value)
    });
    setInterval(function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (var i = 0; i <= counter; i++) {
            draw(cord[i]);
        }
    }, 10);
});

function drawBall(element) {
    ctx.beginPath();
    ctx.arc(element.x, element.y, element.ballRadius, 0, Math.PI*2);
    ctx.fillStyle = element.ballColor;
    ctx.fill();
    ctx.strokeStyle = "#000000";
    ctx.stroke();
    ctx.closePath();
}

function draw(element) {
    if (element.y + element.ballRadius >= canvas.height) {
        element.shiftY = -element.shiftY * element.dampering;
        element.y = canvas.height - element.ballRadius;
    }
    else if (element.y - element.ballRadius <= 0) {
        element.shiftY = -element.shiftY * element.dampering;
        element.y = element.ballRadius;
    }
    element.shiftY += gravityConstant;
    element.y += element.shiftY;
    drawBall(element);
}