

// ==========colors===========
//const colorRed = 'rgba(255,26,104,1)'
// const colorBlue ='rgba(54,162,235,1)'
// const colorYellow = 'rgba(255,206,86,1)'
// const colorGreen = 'rgba(75,192,192,1)'

// ================ creating Pacman =================
// const radius = 50;
// const angle = Math.PI/180;
// ctx.beginPath();
// ctx.strokeStyle = colorYellow;
// ctx.fillStyle = colorYellow;

// ctx.lineWidth = 3;
// ctx.arc(350, 300, 25, angle*30, angle* 330, false)
// ctx.lineTo(350,300)
// ctx.closePath()
// ctx.stroke()
// ctx.fill()=colorYellow

//================== creating Pinky===============
// pinky.beginPath();
// pinky.strokeStyle = colorBlue;
// pinky.linewidth=3;
// pinky.moveTo(400,200)
// pinky.lineTo(400,200);
// pinky.stroke();
// pinky.beginPath();
// pinky.strokeStyle=(colorRed);
// pinky.lineWidth = 3;
// pinky.arc(350,200,30, angle*180 , angle * 0, false)
// pinky.lineTo(380,210)
// pinky.lineTo(380,240);
// pinky.lineTo(380,240);
// pinky.lineTo(370,240);
// pinky.lineTo(360,260);
// pinky.lineTo(350,240);
// pinky.lineTo(340,250);
// pinky.lineTo(330,250);
// pinky.lineTo(330,240);
// pinky.lineTo(310,250);
// pinky.lineTo(310,250);
// pinky.closePath()
// pinky.stroke();
// //=============creating eyes=========
// pinky.beginPath();
// pinky.strokeStyle=colorRed;
// pinky.lineWidth=3;
// pinky.arc(330, 200, 5, angle*0, angle*360 ,false)
// pinky.arc(370, 200, 5, angle*0, angle*360 ,false)
// pinky.stroke();
// pinky.fill();


const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const scores = document.querySelector('#sEl')
let score = 0;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight


class Square {
    static width = 40
    static height = 40
    constructor({ position }) {
        this.position = position
        this.width = 40
        this.height = 40
    }
    draw() {
        ctx.fillStyle = 'blue'
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
        ctx.fill()
    }
}



//======================= Ghost Class ==================
class Ghost {
    constructor({ position, velocity, color }) {
        this.position = position
        this.velocity = velocity
        this.radius = 13
        this.color = color
        this.prevCollisions = []
    }
    draw() {
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        ctx.fill()
        ctx.closePath()
    }
    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

    }
}
//================================ creating white pellets class======================
class Pellete {
    constructor({ position }) {
        this.position = position
        this.radius = 8
    }
    draw() {
        ctx.beginPath()
        ctx.fillStyle = 'white'
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        ctx.fill()
        ctx.closePath()
    }
}
const Squares = [['1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1'],
['1', '.', '.', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '1'],
['1', ' ', ' ', '1', '1', '1', '1', '1', ' ', '1', '1', ' ', '1'],
['1', ' ', ' ', ' ', ' ', ' ', '1', ' ', ' ', ' ', ' ', ' ', '1'],
['1', ' ', '1', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '1'],
['1', ' ', ' ', '1', ' ', ' ', '1', ' ', ' ', '1', '1', ' ', '1'],
['1', ' ', ' ', ' ', ' ', '1', '1', '1', ' ', ' ', ' ', ' ', '1'],
['1', ' ', '1', '1', ' ', ' ', '1', ' ', ' ', '1', '1', ' ', '1'],
['1', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '', ' ', ' ', ' ', '1'],
['1', ' ', '1', ' ', '1', ' ', ' ', '1', '1', ' ', ' ', ' ', '1'],
['1', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '1'],
['1', ' ', '1', '1', ' ', '1', '1', ' ', ' ', '1', '1', ' ', '1'],
['1', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '1'],
['1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1']]
const alotOfSquares = [] // array of squares
const pelletes = []       // array of white balls   
const ghosts = [new Ghost({ position: { x: Square.width * 7 + Square.width / 2, y: Square.height + Square.height / 2 }, velocity: { x: 0, y: 0 }, color: 'red' }),
new Ghost({ position: { x: Square.width * 2 + Square.width / 2, y: Square.height * 2 + Square.height / 2 }, velocity: { x: 1, y: 1 }, color: 'green' })]


//=============== creating the squares  and the pellets on the canavas
Squares.forEach((row, index1) => {
    row.forEach((symbol, index2) => {
        switch (symbol) {
            case '1':
                alotOfSquares.push(new Square({
                    position: {
                        x: Square.width * index2,
                        y: Square.height * index1
                    }
                })
                )
                break
            case ' ':
                pelletes.push(new Pellete({
                    position: {
                        x: Square.width * index2 + Square.width / 2,
                        y: Square.height * index1 + Square.height / 2
                    }
                })
                )
                break
        }
    })
})

//======================= PacMan Class ==================
class PacMan {
    constructor({ position, velocity }) {
        this.position = position
        this.velocity = velocity
        this.radius = 13
        this.radians = 0.75
        this.openRate = 0.12
    }
    draw() {
        ctx.beginPath()
        ctx.fillStyle = 'yellow'
        ctx.lineTo(this.position.x, this.position.y)
        ctx.arc(this.position.x, this.position.y, this.radius, this.radians, Math.PI * 2 - this.radians)
        ctx.fill()
        ctx.closePath()
    }
    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        if (this.radians < 0 || this.radians > .75) this.openRate = - this.openRate
        this.radians += this.openRate
    }
}


//======================================================================
const pacman = new PacMan({
    position: { x: Square.width + Square.width / 2, y: Square.height + Square.height / 2 },
    velocity: { x: 0, y: 0 }
})
pacman.update();




//===================== moving PacMan and Eating pelletes ==============
let animationId

function moving() {
    animationId = requestAnimationFrame(moving)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    pelletes.forEach((Pellete, index) => {
        Pellete.draw()

        if (Math.hypot(Pellete.position.x - pacman.position.x, Pellete.position.y - pacman.position.y) < (Pellete.radius + pacman.radius)) {
            pelletes.splice(index, 1)
            score += 10
            scores.innerHTML = score
        }
        if (score === 980) { prompt('you won') }
    })
    alotOfSquares.forEach((Square) => {
        Square.draw()
        // ========= collision with squares    
        if (circleCollidesWithRectangle({ circle: pacman, rectangle: Square })) {
            pacman.velocity.y = 0
            pacman.velocity.x = 0
            //           
        }
    })
    pacman.update()
    ghosts.forEach((ghost) => {
        ghost.update()
        if (Math.hypot(ghost.position.x - pacman.position.x, ghost.position.y - pacman.position.y) < (ghost.radius + pacman.radius)) {
            cancelAnimationFrame(animationId)
            console.log('you lose')
            const stop = prompt('Game Over')
        }
        const collisions = []
        alotOfSquares.forEach(square => {
            if (
                !collisions.includes('right') && circleCollidesWithRectangle({
                    circle: {
                        ...ghost,
                        velocity: {
                            x: 5,
                            y: 0
                        }
                    },
                    rectangle: square
                })
            ) { collisions.push('right') }

            if (
                !collisions.includes('left') && circleCollidesWithRectangle({
                    circle: {
                        ...ghost,
                        velocity: {
                            x: -5,
                            y: 0
                        }
                    },
                    rectangle: square
                })
            ) { collisions.push('left') }

            if (
                !collisions.includes('down') && circleCollidesWithRectangle({
                    circle: {
                        ...ghost,
                        velocity: {
                            x: 0,
                            y: 5
                        }
                    },
                    rectangle: square
                })
            ) { collisions.push('down') }

            if (
                !collisions.includes('up') && circleCollidesWithRectangle({
                    circle: {
                        ...ghost,
                        velocity: {
                            x: 0,
                            y: -5
                        }
                    },
                    rectangle: square
                })
            ) {
                collisions.push('up')
            }

        })
        if (collisions.length > ghost.prevCollisions.length)
            ghost.prevCollisions = collisions
        if (JSON.stringify(collisions) !== JSON.stringify(ghost.prevCollisions)) {
            if (ghost.velocity.x > 0) {
                ghost.prevCollisions.push('right')
                console.log(collisions)
            }

            const pathways = ghost.prevCollisions.filter((collision) => {
                return !collisions.includes(collision)
            })
        }
    })
}
moving()

//====================== define key pressed to move Pacman ===================
window.addEventListener('keydown', ({ key }) => {
    switch (key) {
        case 'ArrowUp':
            pacman.velocity.y = -5
            break
        case 'ArrowLeft':
            pacman.velocity.x = -5
            break
        case 'ArrowDown':
            pacman.velocity.y = 5
            break
        case 'ArrowRight':
            pacman.velocity.x = 5
            break
    }
})
//=============================when we are releasing  the keys======================
window.addEventListener('keyup', ({ key }) => {
    switch (key) {
        case 'ArrowUp':
            pacman.velocity.y = 0
            break
        case 'ArrowLeft':
            pacman.velocity.x = 0
            break
        case 'ArrowDown':
            pacman.velocity.y = 0
            break
        case 'ArrowRight':
            pacman.velocity.x = 0
            break
    }
})

function circleCollidesWithRectangle({ circle, rectangle }) {
    const padding = Square.width / 2 - circle.radius - 1
    return (circle.position.y - circle.radius + circle.
        velocity.y <= rectangle.position.y + rectangle.height + padding
        && circle.position.x + circle.radius + circle.velocity.x >= rectangle.
            position.x - padding
        && circle.position.y + circle.radius + circle.velocity.y >= rectangle.
            position.y - padding
        && circle.position.x - circle.radius + circle.velocity.x <= rectangle.position.x + rectangle.
            width + padding)
}

