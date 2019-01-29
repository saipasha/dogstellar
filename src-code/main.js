
// GET CANVAS

const canvasP1 = document.getElementById('player1')
const ctxP1 = canvasP1.getContext('2d')
// ctxP1.fillRect(0,0,600,400)

const canvasP2 = document.getElementById('player2')
const ctxP2 = canvasP2.getContext('2d')
ctxP2.fillStyle = "grey"
ctxP2.fillRect(0,0,600,400)

// ON LOAD

// window.onload(ctxP1.font = 'Avenir 50px')

// VARIABLES GRAL
let interval
let frames = 0
let enemyGenerator = ['generateEnemy', 'generateBisketo']
let images = {
  bisketo: "../images/bisketo.png",
  farahWalk1: "../images/farah-choose.png",
  tomasaChoose: "../images/tomasa-choose.png",
  planet1Bg:"../images/planet1Bg.png",
  alien: "../images/alien.png",
  mannPlanet: "../images/mann-planet-pixel.png",
  mannFloor: "../images/manns-floor-pixel.gif",
  mannPlanetFlip: "../images/mann-planet-pixel-flip.png"
}
let sounds = {

}
let gravityMann = .28
let friction = .8
let keys = {}


// VARIABLES P1
let p1 = ""
let enemiesP1 = []


// VARIABLES P2
let p2 = ""
let enemiesP2 = []


// CLASSES

class Farah {
  constructor () {
    this.name = name
    this.x = 270
    this.y = 220
    this.width = 100
    this.height = 100
    this.image = new Image()
    this.image.src = images.farahWalk1
    this.image.onload = this.draw()
    // vertical physics
    this.velY = 2
    this.grounded = true
    this.jumping = false
    this.jumpStrength = 1.2
    //horizontal
    this.velX = 0
  }

  draw () {
    ctxP1.drawImage(this.image, this.x, this.y, this.width, this.height)
  }
}

class Planet1 {
  constructor () {
    this.x = 0
    this.y = 0
    this.width = canvasP1.width
    this.height = canvasP1.height
    this.image = new Image()
    this.image.src = images.mannPlanet
    // this.image.onload = this.draw()
    this.image2 = new Image()
    this.image2.src = images.mannPlanetFlip
    this.image.onload = this.draw()
  }

  draw () {
    ctxP1.drawImage(this.image, this.x, this.y, this.width, this.height)    
    ctxP1.drawImage(this.image2, this.x - this.width, this.y, this.width, this.height)
    ctxP1.drawImage(this.image2, this.x + this.width, this.y, this.width, this.height)

    if (this.x < -canvasP1.width) {
      this.x = 0
    } 
    
    if (keys[65]) {
      this.x++
      
    }
    if (keys[68]) {
      this.x--
    }

  }
}

class Floor {
  constructor () {
    this.x = 0
    this.y = 302
    this.width = canvasP1.width
    this.height = 50
    this.image = new Image()
    this.image.src = images.mannFloor
    this.image.onload = this.draw()
  }
  
    draw() {
      ctxP1.drawImage(this.image, this.x, this.y, this.width, this.height)
    }
}

// class Alien {
//   constructor () {
//     this.x = 40
//     this.y = 230
//     this.width = 80
//     this.height = 80
//     this.image = new Image()
//     this.image.src = images.alien
//     this.image.onload = image.draw()
//   }

//   draw() {
//     // x++
//     ctxP1.drawImage(this.image, this.x, this.y, this.width, this.height)
//   }
// }



//MAIN FUNCTIONS

  function startGame () {
    setInterval(update, 1000/60)
  }

  function update () {
    ctxP1.clearRect(0, 0, canvasP1.width, canvasP1.height)
    frames++
    planet1.draw()
    player1.draw()
    floor.draw()
    // enemy.draw()
    drawTime()
    move()
  }

  function gameOver () {

  }


// AUX FUNCTIONS

function drawTime(){
  ctxP1.fillStyle = "white"
  ctxP1.fillRect(512,16,60,20)
  ctxP1.font = 'Avenir 50px'
  ctxP1.fillStyle = "black"
  let time = (180 - Math.floor(frames/60))
  let timePrint = "T-" + time + " sec"
  ctxP1.fillText(timePrint,520,30)
}

function move () {
  if(!player1.grounded){
    player1.y += player1.velY
    player1.velY += gravityMann
  }
  if(player1.y>floor.y){
    player1.grounded = true
    player1.jumping = false
    player1.y = floor.y - player1.height
  }
  player1.x += player1.velX
  player1.velX *= friction
  //horizontal

  if(keys[68]){
    player1.velX++
    // player2.velX++
  }
  if(keys[65]){
    player1.velX--
  }
  if(keys[87]){
    if(!player1.jumping){
      player1.velY = 0
      player1.grounded = false
      player1.jumping = true
      player1.velY += -player1.jumpStrength*2
      
    } 
  }
}


// INSTANCES 

let planet1 = new Planet1()
let player1 = new Farah()
// let enemy = new Alien()
let floor = new Floor()

// LISTENERS


addEventListener('keydown', e=>{
  if(e.keyCode === 87){
    player1.y = 0
    player1.grounded = false
    player1.velY = 0
    document.getElementById('w-key').classList.toggle('key-press')
  }
  if(e.keyCode === 68) {
    document.getElementById("d-key").classList.toggle("key-press")
  }
  keys[e.keyCode] = true
})



addEventListener('keyup', e=>{
  keys[e.keyCode] = false
  document.getElementById('w-key').classList.toggle('key-press')
})

// addEventListener('keypress', e => {
//   if (e.keyCode === 65) {
//     clearInterval(interval);
//   }
// })

// ACTIONS 

startGame()