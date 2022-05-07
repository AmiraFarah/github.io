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
    constructor({ position, velocity }) {
        this.position = position
        this.velocity = velocity
        this.radius = 13
        this.prevCollisions = []
    }
    draw() {
        ctx.beginPath()
        ctx.fillStyle = 'red'
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
class Pellete{
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
const Squares = [['1','1','1', '1','1','1','1','1','1','1','1', '1','1','1'],
                ['1', '.','.',' ',' ',' ',' ',' ',' ',' ',' ', ' ', ' ','1'],
                ['1', ' ', ' ','1', ' ','1','1',' ',' ','1','1',' ',' ','1'],
                ['1', ' ', ' ', ' ',' ', ' ','1',' ',' ',' ',' ',' ', ' ','1'],
                ['1', ' ', '1',' ',' ','1', '1',' ',' ',' ',' ',' ', ' ','1'],
                ['1', ' ', ' ', '1', ' ',' ',' ',' ',' ',' ', '1','1',' ' ,'1'],
                ['1', ' ', ' ', ' ', ' ',' ',' ',' ',' ',' ',' ',' ',' ','1'],
                ['1', ' ', '1', '1', ' ','1','1',' ',' ','1','1',' ',' ','1'],
                ['1', ' ', ' ', ' ',' ',' ',' ',' ','',' ',' ',' ', ' ','1'],
                ['1', ' ', '1', ' ', '1',' ',' ','1','1',' ',' ',' ', ' ','1'],
                ['1', ' ', ' ', ' ', ' ',' ',' ',' ',' ',' ',' ',' ', ' ','1'],
                ['1', ' ', '1', '1',' ','1','1',' ',' ','1','1',' ', ' ','1'],
                ['1', ' ', ' ', ' ',' ',' ',' ',' ',' ',' ',' ',' ', ' ','1'],
                ['1', '1', '1', '1','1','1','1','1','1', '1','1','1','1','1']]
const alotOfSquares = [] // array of squares
const pelletes =[]       // array of white balls   
const ghosts = [new Ghost({position:{x: Square.width*7 + Square.width / 2, y: Square.height + Square.height / 2 }, velocity:{x:5,y:0}})]


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
                        x: Square.width * index2+Square.width/2,
                       y: Square.height * index1 +Square.height/2}
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
    }
    draw() {
        ctx.beginPath()
        ctx.fillStyle = 'yellow'
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


//======================================================================
const pacman = new PacMan({
    position: { x: Square.width + Square.width / 2, y: Square.height + Square.height / 2 },
    velocity: { x: 0, y: 0 }
})
pacman.update();




//===================== moving PacMan and Eating pelletes ==============
function moving() {
    requestAnimationFrame(moving)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    pelletes.forEach((Pellete,index)=> {
        Pellete.draw()
        
        if (Math.hypot(Pellete.position.x-pacman.position.x,Pellete.position.y-pacman.position.y)< (Pellete.radius+pacman.radius )){
            pelletes.splice(index,1)
            score+=10
            scores.innerHTML=score
        }
    })
    alotOfSquares.forEach((Square) => {
        Square.draw()
  // ========= collision with squares    
       if (circleCollidesWithRectangle({circle:pacman,rectangle:Square})){
pacman.velocity.y = 0
pacman.velocity.x = 0
//           
  }
    })
    pacman.update()
    ghosts.forEach((ghost) =>{
        ghost.update()
        const collisions = []
        alotOfSquares.forEach(square=>{
            if (
                !collisions.includes('right') && circleCollidesWithRectangle({
                circle:{
                    ...ghost,
                    velocity:{
                        x:5,
                        y:0
                    }
                },
                rectangle:square
            })
            ){collisions.push('right')}

            if (
                !collisions.includes('left') && circleCollidesWithRectangle({
                circle:{
                    ...ghost,
                    velocity:{
                        x:-5,
                        y:0
                    }
                },
                rectangle:square
            })
            ){collisions.push('left')}

            if (
                !collisions.includes('down') && circleCollidesWithRectangle({
                circle:{
                    ...ghost,
                    velocity:{
                        x:0,
                        y:5
                    }
                },
                rectangle:square
            })
            ){collisions.push('down')}

            if (
                !collisions.includes('up') && circleCollidesWithRectangle({
                circle:{
                    ...ghost,
                    velocity:{
                        x:0,
                        y:-5
                    }
                },
                rectangle:square
            })
            ){collisions.push('up')
        }

        })
        if (collisions.length> ghost.prevCollisions.length)
        ghost.prevCollisions = collisions
        //if(JSON.stringifycollisions(collisions)!== JSON.stringify (ghost.prevCollisions))
        console.log('ds')
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
    console.log(pacman.velocity)
})
//=============================when we are releasing  the keys
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
    console.log(pacman.velocity)
})

function circleCollidesWithRectangle({circle,rectangle}){
    return (circle.position.y - circle.radius+circle.
        velocity.y  <= rectangle.position.y + rectangle.height
        && circle.position.x + circle.radius +circle.velocity.x>= rectangle.
        position.x 
         && circle.position.y + circle.radius+circle.velocity.y >= rectangle.
         position.y
          && circle.position.x - circle.radius+circle.velocity.x <= rectangle.position.x + rectangle.
          width) 
}


