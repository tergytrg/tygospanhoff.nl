function startGame() {
    map = new component(5000, 5000, "images/map.png", 1133, -1323, "image");
    car = new component(60, 30, "images/auto.png", 360, 240, "image");
    gameArea.start();
}

var gameArea = {
    canvas : document.getElementById("myCanvas"),
    start : function() {
        this.canvas.width = 720;
        this.canvas.height = 480;
        this.context = this.canvas.getContext("2d");
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            gameArea.keys = (gameArea.keys || []);
            gameArea.keys[e.key] = true;
          })
          window.addEventListener('keyup', function (e) {
            gameArea.keys[e.key] = false;
          })
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}

function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speed = 0;   
    this.rot = 0;  
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = gameArea.context;
        ctx.translate( this.x, this.y );
        ctx.rotate( this.rot/20 );
        ctx.drawImage(this.image, 
            width/-2, 
            height/-2,
            this.width, this.height);
        ctx.rotate( -this.rot/20 );
        ctx.translate( -this.x, -this.y );
    }
    this.newPos = function() {
        this.x += this.speed * Math.cos(car.rot/20);
        this.y += this.speed * Math.sin(car.rot/20);        
    }
}

function updateGameArea() {
    gameArea.clear();
    map.speed = map.speed/1.05;
    if (gameArea.keys && gameArea.keys['s']) {
        map.speed += 0.2; 
    }
    if (gameArea.keys && gameArea.keys['w']) {
        map.speed += -0.5; 
    }
    if (gameArea.keys && gameArea.keys['a']) {
        car.rot += -(Math.sqrt(Math.abs(map.speed)))/4; 
    }
    if (gameArea.keys && gameArea.keys['d']) {
        car.rot += (Math.sqrt(Math.abs(map.speed)))/4; 
    }
    map.newPos();
    map.update();
    car.newPos();
    car.update();
}