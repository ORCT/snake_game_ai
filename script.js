// documnet 객체는 웹페이지 그 자체를 의미, 반드시 이거부터 시작
const canvas = document.getElementById('game-board')
// getContext는 드로잉에 필요한 속성과 함수를 가진 객체를 생성함
const ctx = canvas.getContext('2d')
const SCALE = 20
const rows = canvas.height / SCALE
const columns = canvas.width / SCALE
// var와 let의 차이 : var는 전역, let은 코드블럭단위 또 호이스팅으로 인한 원하지 않는 일이 발생할 수 있기 때문에 let을 쓰는 것을 권장
// 다른 언어에서 사용하는 느낌처럼 쓰려면 let을 써라
let score = 0

class Snake {
  constructor() {
    this.posX = Math.floor(columns / 2)
    this.posY = Math.floor(rows / 2)
    this.direction = null
  }

  changeDirection(direction) {
    if (direction === 'ArrowRight')


  }

  moveSnake() {
    currentDirection = null


  }

  
}

// window 객체에 addEventLister로 이벤트가 일어날 때 어떤 기능을 할지 콜백을 집어넣는다
// keydown은 키가 눌렸을 때 이벤트를 발생시키고 해당 이벤트에 원하는 기능을 콜백함수로 작성한다
window.addEventListener('keydown', event => {
  const key = document.getElementById(event.key)
  if (key) {
    key.classList.add('pressed')
  }
    
})

function main() {
  const snake = Snake()
}



function startGame() {
  if (!gameInterval) {
    gameInterval = setInterval(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      fruit.draw()
      snake.update()
      snake.draw()

      if (snake.eat(fruit)) {
        score++
        document.getElementById('score').textContent = score
        fruit.pickLocation()
      }
      snake.checkCollision()
    }, 250)
  }
}

function stopGame() {
  clearInterval(gameInterval)
  gameInterval = null
}

document.getElementById('start-btn').addEventListener('click', startGame)
document.getElementById('stop-btn').addEventListener('click', stopGame)

function Snake() {
  this.x = 0
  this.y = 0
  this.xSpeed = scale
  this.ySpeed = 0
  this.tail = []

  this.draw = function() {
    ctx.fillStyle = '#4c63af'
    for (let i = 0; i < this.tail.length; i++) {
      ctx.fillRect(this.tail[i].x, this.tail[i].y, scale, scale)
    }
    this.update = function() {
      for (let i = 0; i < this.tail.length - 1; i++) {
        this.tail[i] = this.tail[i + 1]
      }
      this.tail[this.tail.length - 1] = {x : this.x, y : this.y}
      this.x += this.xSpeed
      this.y += this.ySpeed
      if (this.x < 0 || this.y < 0 || this.x >= canvas.width || this.y >= canvas.height) {
        gameOver()
      }
    }
  }
  this.changeDirection = function (direction) {
    if (direction === 'Up' && this.ySpeed !== scale) {
      this.xSpeed = 0
      this.ySpeed = -scale
    } else if (direction === 'Down' && this.ySpeed !== -scale) {
      this.xSpeed = 0
      this.ySpeed = scale
    } else if (direction === 'Left' && this.xSpeed !== scale) {
      this.xSpeed = -scale
      this.ySpeed - 0
    } else if (direction === 'Right' && this.xSpeed !== -scale) {
      this.xSpeed = scale
      this.ySpeed = 0
    }
  }
  this.eat = function (fruit) {
    if (this.x === fruit.x && this.y === fruit.y) {
      this.tail.push({x : this.x - this.xSpeed, y : this.y - this.ySpeed})
      return true
    }
    return false
  }
  this.checkcollision = function() {
    this.x = 0
    this.y = 0
    this.tail = []
    this.xSpeed = scale
    this.ySpeed = 0
    score = 0
    document.getElementById('score').textContent = score
  }
  this.reset = function() {
    this.x = 0
    this.y = 0
    this.tail = []
    this.xSpeed = scale
    this.ySpeed = 0
    score = 0
    document.getElementById('score').textContent = score
  }
}

function Fruit() {
  this.x = 0
  this.y = 0
  
  this.pickLocation = function() {
    this.x = Math.floor(Math.random() * columns) * scale
    this.y = Math.floor(Math.random() * rows) * scale
  }
  this.draw = function() {
    ctx.fillStyle = '#FF4136'
    ctx.fillRect(this.x, this.y, scale, scale)
  }
}

window.addEventListener('keydown', (event) => {
  const direction = event.key.replace('Arrow', '')
  snake.changeDirection(direction)
})

function gameOver() {
  alert('Game Over! Score : ' + score)
  snake.reset()
  stopGame()
  startGame()
}

function changeRandomDirection() {
  const directions = ['Up', 'Down', 'Left', 'Right']
  const randomDirection = directions[Math.floor(Math.random() * directions.length)]
  snake.changeDirection(randomDirection)
}