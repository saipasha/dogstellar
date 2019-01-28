
// GET CANVAS

const canvasP1 = document.getElementById('player1')
const ctxP1 = canvasP1.getContext('2d')
// ctxP1.fillRect(0,0,600,400)

const canvasP2 = document.getElementById('player2')
const ctxP2 = canvasP2.getContext('2d')
ctxP2.fillStyle = "grey"
ctxP2.fillRect(0,0,600,400)

// ON LOAD



// VARIABLES
let interval
let frames = 0
let p1 = ""
let p2 = ""
let enemiesP1 = []
let enemiesP2 = []
let enemyGenerator = ['generateEnemy', 'generateBisketo']
let images = {
  bisketo: "../images/bisketo.png",
  farahWalk1: "../images/farah-choose.png",
  tomasaChoose: "../images/tomasa-choose.png",
  planet1Bg:"../images/planet1Bg.png",
  alien: "../images/alien.png",
}
let sounds = {

}

// CLASSES

class Farah {
  constructor () {
    this.name = name
    this.x = 270
    this.y = 230
    this.width = 100
    this.height = 100
    this.image = new Image()
    this.image.src = images.farahWalk1
    this.image.onload = this.draw()
  }

  draw () {
    ctxP1.drawImage(this.image, this.x, this.y, this.width, this.height)
  }

  jump() {
      this.y -= 100;
  }
}

class Planet1 {
  constructor () {
    this.x = 0
    this.y = 0
    this.width = canvasP1.width
    this.height = canvasP1.height
    this.image = new Image()
    this.image.src = images.planet1Bg
    this.image.onload = this.draw()
  }

  draw () {
    // if (this.x < -canvasP1.width) {
    //   this.x = 0
    // }
    // this.x--
    ctxP1.drawImage(this.image, this.x, this.y, this.width, this.height)
    // ctxP1.drawImage(this.image, this.x + this.width, this.y, this.width, this.height)
    ctxP1.fillStyle = "skyblue"
    ctxP1.fillRect(0,300,600,100)
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
    console.log("hi")
    setInterval(update, 1000/60)
  }

  function update () {
    console.log("hiii")
    ctxP1.clearRect(0, 0, canvasP1.width, canvasP1.height)
    frames++
    planet1.draw()
    player1.draw()
    // enemy.draw()
  }

  function gameOver () {

  }


// AUX FUNCTIONS



// INSTANCES 

let planet1 = new Planet1()
let player1 = new Farah()
// let enemy = new Alien()

// LISTENERS


addEventListener('keydown', (e) => {
  if (e.keyCode == "87") {
    clearInterval(interval);
    console.log(e)
    player1.jump()
  }
})

// addEventListener('keypress', e => {
//   if (e.keyCode === 65) {
//     clearInterval(interval);
//   }
// })

// ACTIONS 

startGame()