var balls = [];
var ball_cnt = 3;
var radius = 400 / 100;
var points = 0;
    
function ball(index){
    this.x = getRandom(radius, 400 - radius);
    this.y = getRandom(radius, 400 - radius);
    this.color = "#FF0000";
    this.speedx = Math.random();
    this.speedy = Math.random();
    this.radius = radius;
    this.name = "ball"+index;
    this.ball = document.createElement("div");
}

function move(){
    for(var key in balls)
    {
        balls[key].x += balls[key].speedx;
        balls[key].y += balls[key].speedy;
        //if ball hits bottom or top side of screen
        if(balls[key].y + radius >= 400 || balls[key].y - radius <= 0)
        {
            balls[key].speedy *= -1;
        }
        
        //if ball hits right or left side of screen
        if(balls[key].x + radius >= 400 || balls[key].x - radius <= 0)
        {
            balls[key].speedx *= -1;
        }
        
        balls[key].ball.style.left = balls[key].x+"px";
        balls[key].ball.style.top = balls[key].y+"px";
    }
} 

function getRandom (min, max) {
    return Math.random() * (max - min) + min;
}

function canvasOnClick(e){ 
    for(var key in balls)
    {
        //check if click is in rect of ball
        if(e.clientX >= (balls[key].x - radius) && e.clientX <= (balls[key].x + (radius*2)) &&
            e.clientY >= balls[key].y && e.clientY <= (balls[key].y + (radius*2)))
        {
            console.log("Ball min",(balls[key].x - radius),":", balls[key].y, "ball max",
            (balls[key].x + (radius * 2)),":",(balls[key].y + (radius * 2)),
            "mouseClick", e.clientX, ":", e.clientY);
            delete(balls[key]);
            points++;
        }
    }
}

$(document).ready(function(){
    $("#info").text(screen.availHeight+"x"+screen.availWidth);
    for(var i = ball_cnt; i > 0; i--)
    {
        balls.push(new ball(ball_cnt - i));
        $("#app").append(balls[balls.length - 1].ball);
        var img = document.createElement("img");
            img.src = "./images/ballon.png";
        balls[balls.length - 1].ball.style.position = "absolute";
        balls[balls.length - 1].ball.appendChild(img);
        
        balls[balls.length - 1].ball.style.left = balls[balls.length - 1].x+"px";
        balls[balls.length - 1].ball.style.top = balls[balls.length - 1].y+"px";
    }
    setInterval(move,10);
});
