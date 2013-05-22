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

function ballClick(e){
    var index = e.target.parentNode.id.split("_");
    $(e.target).remove();
    delete(balls[index[1]]);
}

$(document).ready(function(){
    $("#info").text(screen.availHeight+"x"+screen.availWidth);
    for(var i = ball_cnt; i > 0; i--)
    {
        balls.push(new ball());
        $("#app").append(balls[balls.length - 1].ball);
        var img = document.createElement("img");
            img.src = "./images/ballon.png";
        balls[balls.length - 1].ball.id = "ball_"+(balls.length - 1);
        balls[balls.length - 1].ball.style.position = "absolute";
        balls[balls.length - 1].ball.appendChild(img);
        balls[balls.length - 1].ball.style.left = balls[balls.length - 1].x+"px";
        balls[balls.length - 1].ball.style.top = balls[balls.length - 1].y+"px";
        balls[balls.length - 1].ball.onclick = ballClick;
    }
    setInterval(move,10);
});
