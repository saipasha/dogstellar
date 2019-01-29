
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
  mannPlanetFlip: "../images/mann-planet-pixel-flip.png",
  edmundPlanet: "../images/edmunds-planet-pixel.gif",
  edmundPlanetFlip: "../images/edmunds-planet-pixel-flip.gif",
  edmundFloor: "../images/edmunds-planet-floor-pixel.gif",
}
let sounds = {

}
let gravityMann = .28
let gravityEdmund = .80
let frictionMann = .3
let frictionEdmund = .8
let keys = {}


// VARIABLES P1
let p1 = ""
let enemiesP1 = []


// VARIABLES P2
let p2 = ""
let enemiesP2 = []


// CLASSES

class FloorP1 {
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
  
class FloorP2 {
  constructor () {
    this.x = 0
    this.y = 302
    this.width = canvasP1.width
    this.height = 50
    this.image = new Image()
    this.image.src = images.edmundFloor
    this.image.onload = this.draw()
  }
  
    draw() {
      ctxP2.drawImage(this.image, this.x, this.y, this.width, this.height)
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

  class Planet2 {
    constructor () {
      this.x = 0
      this.y = 0
      this.width = canvasP2.width
      this.height = canvasP2.height
      this.imageP2 = new Image()
      this.imageP2.src = images.edmundPlanet
      // this.imageP2.onload = this.draw()
      this.imageP22 = new Image()
      this.imageP22.src = images.edmundPlanetFlip
      this.imageP2.onload = this.draw()
    }
  
    draw () {
      ctxP2.drawImage(this.imageP2, this.x, this.y, this.width, this.height)    
      ctxP2.drawImage(this.imageP22, this.x - this.width, this.y, this.width, this.height)
      ctxP2.drawImage(this.imageP22, this.x + this.width, this.y, this.width, this.height)
  
      if (this.x < -canvasP2.width) {
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

class Farah {
  constructor () {
    this.x = 270
    this.y = 233
    this.width = 90
    this.height = 90
    this.image = new Image()
    this.image.src = images.farahWalk1
    this.image.onload = this.draw()
    // vertical physics
    this.velY = 2
    this.grounded = true
    this.jumping = false
    this.jumpStrength = 2
    //horizontal
    this.velX = 0
  }

  draw () {
    ctxP1.drawImage(this.image, this.x, this.y, this.width, this.height)
  }
}


class Tomasa {
  constructor () {
    this.x = 180
    this.y = 223
    this.width = 100
    this.height = 110
    this.image = new Image()
    this.image.src = images.tomasaChoose
    this.image.onload = this.draw()
    // vertical physics
    this.velY = 2
    this.grounded = true
    this.jumping = false
    this.jumpStrength = 9
    //horizontal
    this.velX = 0
  }

  draw() {
    ctxP2.drawImage(this.image, this.x, this.y, this.width, this.height)
  }
}

// class Bisketo {
//   constructor () {
//     this.x = 0
//     this.y = Math.floor(Math.random()*100) + 100
//     this.width = 100
//     this.height = 40
//     this.image = new Image()
//     this.image.src = "../images/bisketo.png"
//     this.image.onload = draw()
//   }

//   draw() {
//     this.x++
//     ctxP1.drawImage(this.image, this.x, this.y, this.width, this.height)
//   }
// }


// class Alien {
//   constructor () {
//     this.x = 40
//     this.y = 230
//     this.width = 80
//     this.height = 80
//     this.image = new Image()
//     this.image.src = images.bisketo
//     this.image.onload = image.draw()
//   }

//   draw() {
//     x++
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
    floorP1.draw()
    planet2.draw()
    floorP2.draw()
    player1.draw()
    // enemy.draw()
    drawTime()
    moveP1()
    // bisketo.draw()
    player2.draw()
    moveP2()
  }

  function gameOver () {
    if (drawTime.time === 0) {
      ctxP1.clearRect(0, 0, canvasP1.width, canvasP1.height)
      // return
    }
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


function moveP1 () {
  if(!player1.grounded){
    player1.y += player1.velY
    player1.velY += gravityMann
  }
  if(player1.y>floorP1.y){
    player1.grounded = true
    player1.jumping = false
    player1.y = floorP1.y - player1.height+20
  }
  player1.x += player1.velX
  player1.velX *= frictionMann
  //horizontal

  if(keys[68]){
    player1.velX++
  }
  if(keys[65]){
    player1.velX--
  }
  if(keys[87]){
    if(!player1.jumping){
      player1.velY = 0
      player1.grounded = false
      player1.jumping = true
      player1.velY += -player1.jumpStrength
      
    } 
  }
}

function moveP2 () {
  if(!player2.grounded){
    player2.y += player2.velY
    player2.velY += gravityEdmund
  }
  if(player2.y>floorP2.y){
    player2.grounded = true
    player2.jumping = false
    player2.y = floorP2.y - player2.height+25
  }
  player2.x += player2.velX
  player2.velX *= frictionEdmund
  //horizontal

  if(keys[39]){
    player2.velX++
  }
  if(keys[37]){
    player2.velX--
  }
  if(keys[38]){
    if(!player2.jumping){
      player2.velY = 0
      player2.grounded = false
      player2.jumping = true
      player2.velY += -player2.jumpStrength
      
    } 
  }
}


// INSTANCES 

let planet1 = new Planet1()
let planet2 = new Planet2()
let floorP1 = new FloorP1()
let floorP2 = new FloorP2()
let player1 = new Farah()
// let enemy = new Alien()
// let bisketo = new Bisketo()
let player2 = new Tomasa()


// LISTENERS


addEventListener('keydown', e=>{
  if(e.keyCode === 87){
    player1.y = 0
    player1.grounded = false
    player1.velY = 0
  }

  keys[e.keyCode] = true
})

addEventListener('keydown', e => {
  if (e.keyCode === 87) {
    document.getElementById('w-key').classList.add('key-press')
  }
  if (e.keyCode === 68) {
    document.getElementById("d-key").classList.add("key-press")
  }
  if (e.keyCode === 65) {
    document.getElementById('a-key').classList.add('key-press')
  }
  if (e.keyCode === 83) {
    document.getElementById('s-key').classList.add('key-press')
  }
})

addEventListener('keyup', e => {
  if (e.keyCode === 87) {
    document.getElementById('w-key').classList.remove('key-press')
  }
  if (e.keyCode === 68) {
    document.getElementById("d-key").classList.remove("key-press")
  }
  if (e.keyCode === 65) {
    document.getElementById('a-key').classList.remove('key-press')
  }
  if (e.keyCode === 83) {
    document.getElementById('s-key').classList.remove('key-press')
  }
})

addEventListener('keyup', e=>{
  keys[e.keyCode] = false
})


// ACTIONS 

startGame()