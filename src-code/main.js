

// GET CANVAS

const canvasP1 = document.getElementById('player1')
const ctxP1 = canvasP1.getContext('2d')
// ctxP1.fillRect(0,0,600,400)

const canvasP2 = document.getElementById('player2')
const ctxP2 = canvasP2.getContext('2d')
// ctxP2.fillStyle = "grey"
// ctxP2.fillRect(0,0,600,400)

// ON LOAD


// window.onload(ctxP1.font = 'Avenir 50px')

// VARIABLES GRAL
let gameStarted = false
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
  gargantua: "../images/Gargantua.gif",
  snowball8bit: "../images/Snowball-8.png",
}
let sounds = {

}
let gravityMann = .981
let gravityEdmund = .981
let frictionMann = .8
let frictionEdmund = .8
let secMann = 60
let secEdmund = 60
let keys = {}
let bisketoP1Counter = 0
let bisketoP2Counter = 0

// VARIABLES P1
let p1 = ""
let enemiesP1 = []
let bisketosP1 = []


// VARIABLES P2
let p2 = ""
let enemiesP2 = []
let bisketosP2 = []


// CLASSES

// class Cover {
//   contructor () {
//     this.x = 0
//     this.y = 0
//     this.width = canvasP1.width
//     this.height = canvasP1.height
//     this.gargantuaP1 = new Image()
//     this.gargantuaP1.src = images.gargantua
//     this.gargantuaP1.onload = this.draw.bind(this)

//   }
  
//   draw() {
//     ctxP1.drawImage(this.gargantuaP1, 0, 0, canvasP1.width, canvasP1.height)
//     ctxP1.font = "40px 'Major Mono Display'"
//     ctxP1.fillText("Press S to start",200,200)
//   }
// }

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
      this.image2 = new Image()
      this.image2.src = images.mannPlanetFlip
      this.image.onload = this.draw.bind(this)
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

    drawScore () {
      this.bisketoP1 = new Image()
      this.bisketoP1.src = images.bisketo
      this.image.onload = this.draw.bind(this)  
      ctxP1.drawImage(this.bisketoP1, 500, 20, 30, 30)
      ctxP1.font = "20px 'Major Mono Display'"
      ctxP1.fillStyle = "khaki"  
      ctxP1.fillText(bisketoP1Counter, 540, 42)
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

    drawScore () {
      this.bisketoP2 = new Image()
      this.bisketoP2.src = images.bisketo
      this.image.onload = this.draw.bind(this)  
      ctxP1.drawImage(this.bisketoP2, 500, 20, 30, 30)
      ctxP1.font = "20px 'Major Mono Display'"
      ctxP1.fillStyle = "khaki"  
      ctxP1.fillText(bisketoP2Counter, 540, 42)
    }
  }

class BisketoP1 {
  constructor () {
    this.x = Math.floor(Math.random() * canvasP1.width)
    this.y = -40
    this.width = 40
    this.height = 40
    this.imageBisketo = new Image()
    this.imageBisketo.src = "../images/bisketo.png"
    this.imageBisketo.onload = this.draw.bind(this)
  }

  draw () {
    this.y += 3
    ctxP1.drawImage(this.imageBisketo, this.x, this.y, this.width, this.height)
  }
}

class BisketoP2 {
  constructor () {
    this.x = Math.floor(Math.random() * canvasP2.width-100)
    this.y = -40
    this.width = 40
    this.height = 40
    this.imageBisketo = new Image()
    this.imageBisketo.src = "../images/bisketo.png"
    this.imageBisketo.onload = this.draw.bind(this)
  }

  draw () {
    this.y += 5
    ctxP2.drawImage(this.imageBisketo, this.x, this.y, this.width, this.height)
  }
}

class Snowball {
  constructor () {
    this.x = -20
    this.y = 230
    this.width = 20
    this.height = 20
    this.imageSnowball = new Image()
    this.imageSnowball.src = images.snowball8bit
    this.imageSnowball.onload = this.draw.bind(this)
  }
  draw () {
    this.x += 3
    ctxP1.drawImage(this.imageSnowball, this.x, this.y, this.width, this.height)
    // if (frames % 50 === 0) this.sx = 0
    // else if (frames % 100 === 0)this.sx = 1069
  }  
}


class Farah {
  constructor () {
    this.x = 180
    this.y = 250
    this.width = 40
    this.height = 60
    this.image = new Image()
    this.image.src = images.farahChoose
    this.image.onload = this.draw()
    // vertical physics
    this.velY = 0
    this.grounded = true
    this.jumping = false
    this.jumpStrength = 9
    //horizontal
    this.velX = 0
    this.hp = 100
  }

  drawHP() {
    ctxP1.fillStyle = "darkred"
    ctxP1.fillRect(20, 20, this.hp * 2, 20)
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
    this.velY = 0
    this.grounded = true
    this.jumping = false
    this.jumpStrength = 15
    //horizontal
    this.velX = 0
    this.hp = 100
  }

  drawHP() {
    ctxP2.fillStyle = "darkred"
    ctxP2.fillRect(20, 20, this.hp * 2, 20)
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


//MAIN FUNCTIONS
  // window.onload(gameCover())

  function startGame () {
    gameStarted = true
    clearCanvas()
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
    player1.drawHP()
    planet1.drawScore()
    player2.draw()
    player2.drawHP()
    moveP1()
    moveP2()
    drawTimeP1()
    drawTimeP2()
    generateBisketoP1()
    generateBisketoP2()
    drawBisketosP1()
    drawBisketosP2()
    // bisketoCollitionP1()
    // bisketoCollitionP2()
    if (frames % Math.floor(Math.random() * 10) === 0) {
      generateSnowball()
    }
    drawSnowball()
    snowballCollitionP1()
    // enemy.draw()
  }

  function gameOverP1 () {
    if (drawTimeP1.timeP1 === 0) {
      // youWinP2() CREATE A FUNCTION FOR THE WINNER
      // ctxP1.clearRect(0, 0, canvasP1.width, canvasP1.height)
      // clearInterval(interval);
    }
  }


// AUX FUNCTIONS

function clearCanvas () {
  ctxP1.clearRect(0, 0, canvasP1.width, canvasP1.height)
  ctxP2.clearRect(0, 0, canvasP2.width, canvasP2.height)
}

function intro_screen() {
  ctxP1.font = "40px 'Major Mono Display'"
  ctxP1.fillStyle = "#fff"
  ctxP1.textAlign = "center"
  ctxP1.fillText("Press S to start",200,200)
  // ctxP2.fillText("Press &#9660 to start",200,200)
}

// function drawCoverMultiplayer () {
//   ctxP1.clearRect(0, 0, canvasP1.width, canvasP1.height)
//   ctxP2.clearRect(0, 0, canvasP2.width, canvasP2.height)
//   ctxP1.drawImage("../images/Gargantua.gif", 0, 0, canvasP1.width, canvasP1.height)
//   ctxP2.drawImage("../images/Gargantua.gif", 0, 0, canvasP2.width, canvasP2.height)
//   ctxP1.font = "40px 'Major Mono Display'"
//   ctxP1.fillText("Press S to start",200,200)
//   ctxP2.fillText("Press &#9660 to start",200,200)
// }

function generateBisketoP1 () {
  if (frames % 100 !== 0) return
  let bisketo = new BisketoP1()
  bisketosP1.push(bisketo)
}

function generateBisketoP2 () {
  if (frames % 100 !== 0) return
  let bisketoP2 = new BisketoP2()
  bisketosP2.push(bisketoP2)
}

function generateSnowball () {
  // let alienTime = [100,400,300,200]
  // let randomAlien = Math.floor(Math.random()*alienTime[Math.floor(Math.random()*i.length)])
  if (frames % 100 !== 0) return
  let oneSnowball = new Snowball()
  enemiesP1.push(oneSnowball)
  
}

function drawBisketosP1 () {
  bisketosP1.forEach((bisketo, index) => {
    if (bisketo.y > 352) {
      bisketosP1.splice(index,1)
    }
    bisketo.draw()
  })
}

function drawBisketosP2 () {
  bisketosP2.forEach((bisketoP2, index) => {
    if (bisketoP2.y > 352) {
      bisketosP2.splice(index,1)
    }
    bisketoP2.draw()
  })
}

function drawSnowball () {
  enemiesP1.forEach((oneSnowball, index) => {
    if (oneSnowball.x > 700) {
      enemiesP1.splice(index,1)
    }
    oneSnowball.draw()
  })
}

function bisketoCollitionP1() {
  bisketosP1.forEach((bisketo, index) => {
    if (player1.checkIfTouch(bisketo)) {
      bisketoP1Counter++
      bisketosP1.splice(index, 1)
    }
  })
}

function bisketoCollitionP2() {
  bisketosP2.forEach((bisketoP2, index) => {
    if (player1.checkIfTouch(bisketoP2)) {
      bisketoP2Counter++
      bisketosP2.splice(index, 1)
    }
  })
}

function snowballCollitionP1 () {
  enemiesP1.forEach((oneSnowball, index) => {
    if (player1.checkIfTouch(oneSnowball)) {
      enemiesP1.splice(index, 1)
      player1.hp -= 20
    }
  })
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

function moveP1() {
  if (!player1.grounded) {
    player1.y += player1.velY
    player1.velY += gravityMann
  }
  if (player1.y > floorP1.y - player1.height) {
    player1.grounded = true
    player1.jumping = false
    player1.y = floorP1.y - player1.height
  }
  player1.x += player1.velX
  player1.velX *= frictionMann
  if (keys[68]) {
    if (player1.x >= canvasP1.width - 40) {
      player1.velX--
    }
    else player1.velX++
  }
  if (keys[65]) {
    if (player1.x < 40) {
      player1.velX++
    }
    else player1.velX--
  }
  if (keys[87]) {
    if (!player1.jumping) {
      player1.velY = 0
      player1.grounded = false
      player1.jumping = true
      player1.velY += -player1.jumpStrength * 2
    }
  }
}

function moveP2 () {
  if(!player2.grounded){
    player2.y += player2.velY
    player2.velY += gravityEdmund
  }
  if(player2.y > 300 ){
    player2.grounded = true
    player2.jumping = false
    player2.y = floorP2.y - player2.height + 20
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
let player2 = new Tomasa()
// let gameCover = new Cover()  


// LISTENERS


addEventListener('keydown', e => {
  
  keys[e.keyCode] = true
  if (e.keyCode === 83) { bisketoCollitionP1() }
  if (e.keyCode === 40) { bisketoCollitionP2() }

  if (e.keyCode === 71) { startGame() }

  //DOM
  if (e.keyCode === 49) {
    document.getElementById('player1').classList.remove('off')
    document.getElementById('onePlayer').classList.add('off')
    document.getElementById('twoPlayer').classList.add('off')
    document.getElementById('keys-left').classList.remove('off')
    document.getElementById('keys-left').classList.add('on')
    intro_screen()
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

  //DOM 2
  if (e.keyCode === 87) { document.getElementById('w-key').classList.add('key-press') }
  if (e.keyCode === 68) { document.getElementById("d-key").classList.add("key-press") }
  if (e.keyCode === 65) { document.getElementById('a-key').classList.add('key-press') }
  if (e.keyCode === 83) { document.getElementById('s-key').classList.add('key-press') }
  if (e.keyCode === 38) { document.getElementById('up-key').classList.add('key-press') }
  if (e.keyCode === 37) { document.getElementById('left-key').classList.add('key-press') }
  if (e.keyCode === 40) { document.getElementById('down-key').classList.add('key-press') }
  if (e.keyCode === 39) { document.getElementById('right-key').classList.add('key-press') }
})

addEventListener('keyup', e=>{
  keys[e.keyCode] = false
  if (e.keyCode === 87) { document.getElementById('w-key').classList.remove('key-press') }
  if (e.keyCode === 68) { document.getElementById("d-key").classList.remove("key-press") }
  if (e.keyCode === 65) { document.getElementById('a-key').classList.remove('key-press') }
  if (e.keyCode === 83) { document.getElementById('s-key').classList.remove('key-press') }
  if (e.keyCode === 38) { document.getElementById('up-key').classList.remove('key-press') }
  if (e.keyCode === 37) { document.getElementById('left-key').classList.remove('key-press') }
  if (e.keyCode === 40) { document.getElementById('down-key').classList.remove('key-press') }
  if (e.keyCode === 39) { document.getElementById('right-key').classList.remove('key-press') }
})


// ACTIONS 




