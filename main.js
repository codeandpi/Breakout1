var canvas = document.getElementById("playArea");
var ctx = canvas.getContext("2d");
var bar = document.getElementById("dvGameBar");
var score = document.getElementById("lblScore");
var hScore = document.getElementById("lblHighScore");
var mess = document.getElementById("lblMessage");
var ball = {
    x: 0,
    y: 0,
    moveX: 3,
    moveY: -2,
    radius: 12
};
var paddle = {
    x: 0,
    height: 10,
    width: 70,
    moveX: 3,
    moveBy: 0
};
var game = {
    lives: 3,
    playing: false,
    score: 0,
    highScore: 0
};


function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = "darkblue";
    ctx.fill();
    ctx.closePath();
    if ((ball.x + ball.moveX + ball.radius) > canvas.width ||
        ball.x + ball.moveX < ball.radius) {
        ball.moveX = -ball.moveX;
    }

    if ((ball.y + ball.moveY + ball.radius) > canvas.height ||
        ball.y + ball.moveY < ball.radius) {
        ball.moveY = -ball.moveY;
    }
    ball.x += ball.moveX;
    ball.y += ball.moveY;
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x, canvas.height - paddle.height,
        paddle.width, paddle.height);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
}

function mouseHasMoved(event) {
    let mouseRelX = event.clientX - canvas.offsetLeft;
    if (mouseRelX > 0 && mouseRelX < canvas.width - paddle.width) {
        paddle.x = mouseRelX;
    }
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - bar.clientHeight;
    if (ball.x > canvas.width) {
        ball.x = canvas.width;
    }
    if (ball.y > canvas.height) {
        ball.y = canvas.height;
    }

}

function redraw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
}

function initialise() {
    window.addEventListener('resize', resizeCanvas);
    ball.x = window.innerWidth / 4;
    ball.y = window.innerHeight - ball.radius - bar.clientHeight;
    paddle.x = (window.innerWidth - paddle.width) / 2;
    resizeCanvas();
    setInterval(redraw, 10);
}

initialise();