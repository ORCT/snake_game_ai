const canvas = document.getElementById('board')
const context = canvas.getContext('2d')
const UPDATE_INTERVAL = 100
const SCALE = 25
let score = 0

class Fruit {
	constructor() {
		this.x = 750
		this.y = 500
		this.size = SCALE
	}

	setPos() {
    this.x = Math.floor(Math.random() * (canvas.width / this.size)) * this.size
    this.y = Math.floor(Math.random() * (canvas.height / this.size)) * this.size
  }

	draw() {
		context.fillStyle = '#FF9999'
		context.fillRect(this.x, this.y, this.size, this.size)
	}
}

class Snake {
	constructor() {
    this.body =[{x:200, y:500}]
		this.xSpeed = 0
		this.ySpeed = 0
		this.size = SCALE
	}
	
	draw() {
		context.fillStyle = '#60E005'
    this.body.forEach(segment => {
      context.fillRect(segment.x, segment.y, this.size, this.size)
    })
	}

	changeDirection(key) {
		if (this.xSpeed !== SCALE && key === 'ArrowLeft') {
			this.xSpeed = -SCALE
			this.ySpeed = 0
		} else if (this.ySpeed !== -SCALE && key === 'ArrowDown') {
			this.ySpeed = SCALE
			this.xSpeed = 0
		} else if (this.xSpeed !== -SCALE && key === 'ArrowRight') {
			this.xSpeed = SCALE
			this.ySpeed = 0
		} else if (this.ySpeed !== SCALE && key === 'ArrowUp') {
			this.ySpeed = -SCALE
			this.xSpeed = 0
		}
	}

	move() {
    const head = {...this.body[0]}
		head.x += this.xSpeed
		head.y += this.ySpeed
    this.body.unshift(head)
    if (head.x === fruit.x && head.y === fruit.y) {
			score++
			document.getElementById("score").textContent = score
      fruit.setPos()
    } else {
      this.body.pop()
    }
	}
}

function gameOver() {
  alert('Game Over!')
  reset()
}

function boardOut(head) {
  if (head.x >= canvas.width || head.x < 0 || head.y >= canvas.height || head.y < 0) {
    gameOver()
  }
}

function selfCollision() {
	for (let i = 1; i < snake.body.length; i++) {
		if (snake.body[0].x === snake.body[i].x && snake.body[0].y === snake.body[i].y) {
			gameOver()
		}
	}
}

function reset() {
  snake.body = [{x:200, y:500}]
	snake.xSpeed = 0
	snake.ySpeed = 0
	fruit.x = 750
	fruit.y = 500
	score = 0
	document.getElementById("score").textContent = score
}

function update() {
  context.clearRect(0, 0, canvas.width, canvas.height)
  fruit.draw()
	snake.move()
  snake.draw()
  boardOut(snake.body[0])
	selfCollision()
}

// main

const snake = new Snake()
const fruit = new Fruit()
snake.draw()
fruit.draw()

window.addEventListener('keydown', event => {
	const key = event.key
	snake.changeDirection(key)
})

setInterval(() => {
	update()
}, UPDATE_INTERVAL)