

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
let images = {
  bisketo: "../images/bisketo.png",
  farahChoose: "../images/farah-choose.png",
  tomasaChoose: "../images/tomasa-choose.png",
  planet1Bg:"../images/planet1Bg.png",
  alien: "../images/alien.png",
  mannPlanet: "../images/mann-planet-pixel.png",
  mannFloor: "../images/manns-floor-pixel.gif",
  mannPlanetFlip: "../images/mann-planet-pixel-flip.png",
  edmundPlanet: "../images/edmunds-planet-pixel.gif",
  edmundPlanetFlip: "../images/edmunds-planet-pixel-flip.png",
  edmundFloor: "../images/edmunds-planet-floor-pixel.gif",
}
let sounds = {

}
let gravityMann = .162
let gravityEdmund = .981
let frictionMann = .8
let frictionEdmund = .42
let secMann = 40
let secEdmund = 70
let keys = {}
let bisketoCounter = 0


// VARIABLES P1
let p1 = ""
let enemiesP1 = []
let bisketosP1 = []


// VARIABLES P2
let p2 = ""
let enemiesP2 = []
let bisketosP2 = []


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
      
      if (keys[39]) {
        this.x--
        
      }
      if (keys[37]) {
        this.x++
      }
  
    }
  }

class BisketoP1 {
  constructor () {
    this.x = Math.floor(Math.random() * canvasP1.width-100)
    this.y = -20
    this.width = 40
    this.height = 40
    this.imageBisketo = new Image()
    this.imageBisketo.src = "../images/bisketo.png"
    this.imageBisketo.onload = this.draw.bind(this)
  }

  draw () {
    this.y += 5
    ctxP1.drawImage(this.imageBisketo, this.x, this.y, this.width, this.height)
  }
}

class AlienP1 {
  constructor () {
    this.x = -30
    this.y = 252
    this.width = 60
    this.height = 60
    this.imageAlien = new Image()
    this.imageAlien.src = "../images/alien.png"
    this.imageAlien.onload = this.draw.bind(this)
  }

  draw () {
    this.x += 3
    ctxP1.drawImage(this.imageAlien, this.x, this.y, this.width, this.height)
  }
}

class Farah {
  constructor () {
    this.x = 180
    this.y = 223
    this.width = 100
    this.height = 110
    this.image = new Image()
    this.image.src = images.farahChoose
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

  checkIfTouch(obstacle) { //A clase's method can receive another object
    return (
      this.x < obstacle.x + obstacle.width &&
      this.x + this.width > obstacle.x &&
      this.y < obstacle.y + obstacle.height &&
      this.y + this.height > obstacle.y
      )
  }
}

//TOMASA'S MISSING CHECK IF TOUCH W/ BISKETO P2
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

  checkIfTouch(obstacle) { //A clase's method can receive another object
    return (
      this.x < obstacle.x + obstacle.width &&
      this.x + this.width > obstacle.x &&
      this.y < obstacle.y + obstacle.height &&
      this.y + this.height > obstacle.y
      )
  }
}


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
    ctxP2.clearRect(0, 0, canvasP2.width, canvasP2.height)
    frames++
    planet1.draw()
    floorP1.draw()
    planet2.draw()
    floorP2.draw()
    player1.draw()
    moveP1()
    player2.draw()
    moveP2()
    drawTimeP1()
    drawTimeP2()
    generateBisketoP1()
    drawBisketosP1()
    bisketoCollitionP1()
    generateAlienP1()
    drawAlienP1()
    alienCollitionP1()
    // enemy.draw()
  }

  function gameOverP1 () {
    if (drawTimeP1.timeP1 === 0) {
      // youWinP2() CREATE A FUNCTION FOR THE WINNER
      // ctxP1.clearRect(0, 0, canvasP1.width, canvasP1.height)
      // clearInterval(interval);
    }
    console.log("lol")
  }


// AUX FUNCTIONS

function generateBisketoP1 () {
  if (frames % 100 !== 0) return
  let aBisketo = new BisketoP1
  bisketosP1.push(aBisketo)
  console.log(bisketosP1)
}


function generateAlienP1 () {
  let alienTime = [100,400,300,200]
  // let randomAlien = Math.floor(Math.random()*alienTime[Math.floor(Math.random()*i.length)])
  if (frames % alienTime !== 0) return
  let anAlien = new AlienP1
  enemiesP1.push(anAlien)
  console.log(enemiesP1)
}

function drawBisketosP1 () {
  bisketosP1.forEach((aBisketo, index) => {
    if (aBisketo.y > 302) {
      bisketosP1.splice(index,1)
    }
    aBisketo.draw()
  })
}

function drawAlienP1 () {
  enemiesP1.forEach((anAlien, index) => {
    if (anAlien.y > 302) {
      enemiesP1.splice(index,1)
    }
    anAlien.draw()
  })
}

function bisketoCollitionP1 () {
  bisketosP1.forEach (aBisketo => {
    addEventListener('keydown', e => {
      if (e === 83) {
        if (player1.checkIfTouch(aBisketo)) {
          bisketosP1.splice(index,1)
          console.log("lol")
          bisketoCounter++
        }
      }
    })
  })
}

function alienCollitionP1 () {
  enemiesP1.forEach (anAlien => {
    addEventListener('keydown', e => {
        if (player1.checkIfTouch(anAlien)) {
          enemiesP1.splice(index,1)
          console.log("lolazo")
          ///// TAKE OXYGEN FROM THE BAR!
        }
    })
  })
}

function showCounter () {
  /////////
}

function lessOxygen () {
  /////////
}

function drawTimeP1(){
  let timeP1 = 180 - Math.floor(frames/secMann)
  let timePrintP1 = "T-" + timeP1 + " sec"
  document.getElementById('timeP1').textContent = timePrintP1
}

function drawTimeP2(){
  let timeP2 = 180 - Math.floor(frames/secEdmund)
  let timePrintP2 = "T-" + timeP2 + " sec"
  document.getElementById('timeP2').textContent = timePrintP2
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
      player1.velY -= player1.jumpStrength
      
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
    player2.y = floorP2.y - player2.height+20
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
  if (e.keyCode === 49) {
    document.getElementById('player1').classList.remove('off')
    document.getElementById('onePlayer').classList.add('off')
    document.getElementById('twoPlayer').classList.add('off')
    document.getElementById('keys-left').classList.remove('off')
    document.getElementById('keys-left').classList.add('on')
  }

  if (e.keyCode === 50) {
    document.getElementById('player1').classList.remove('off')
    document.getElementById('player2').classList.remove('off')
    document.getElementById('onePlayer').classList.add('off')
    document.getElementById('twoPlayer').classList.add('off')
    document.getElementById('keys-left').classList.remove('off')
    document.getElementById('keys-left').classList.add('on')
    document.getElementById('keys-right').classList.remove('off')
    document.getElementById('keys-right').classList.add('on')
  }
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
  if (e.keyCode === 38) {
    document.getElementById('up-key').classList.add('key-press')
  }
  if (e.keyCode === 37) {
    document.getElementById('left-key').classList.add('key-press')
  }
  if (e.keyCode === 40) {
    document.getElementById('down-key').classList.add('key-press')
  }
  if (e.keyCode === 39) {
    document.getElementById('right-key').classList.add('key-press')
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
  if (e.keyCode === 38) {
    document.getElementById('up-key').classList.remove('key-press')
  }
  if (e.keyCode === 37) {
    document.getElementById('left-key').classList.remove('key-press')
  }
  if (e.keyCode === 40) {
    document.getElementById('down-key').classList.remove('key-press')
  }
  if (e.keyCode === 39) {
    document.getElementById('right-key').classList.remove('key-press')
  }
})

addEventListener('keyup', e=>{
  keys[e.keyCode] = false
})


// ACTIONS 

startGame()