const canvas = document.getElementById('board')
const context = canvas.getContext('2d')
const UPDATE_INTERVAL = 100
const SCALE = 25

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
		context.fillStyle = '#77BBBB'
		context.fillRect(this.x, this.y, this.size, this.size)
	}
}

class Snake {
	constructor() {
    this.body =[{x:200, y:500}]
		this.size = SCALE
		this.speed = 25
		this.direction = null
	}
	
	draw() {
		context.fillStyle = '#60E005'
    this.body.forEach(segment => {
      context.fillRect(segment.x, segment.y, this.size, this.size)
    })
	}

	move() {
    const head = {...this.body[0]}
		if (this.direction === 'ArrowLeft') {
			head.x -= this.speed
		} else if (this.direction === 'ArrowUp') {
			head.y -= this.speed
		} else if (this.direction === 'ArrowRight') {
			head.x += this.speed
		} else if (this.direction === 'ArrowDown') {
			head.y += this.speed
		}
    this.body.unshift(head)
    if (head.x === fruit.x && head.y === fruit.y) {
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
  if (head.x > canvas.width || head.x < -SCALE || head.y > canvas.height || head.y < -SCALE) {
    gameOver()
  }
}

function reset() {
  snake.body = [{x:200, y:500}]
	snake.direction = null
	fruit.x = 750
	fruit.y = 500
}

function update() {
  context.clearRect(0, 0, canvas.width, canvas.height)
  fruit.draw()
  snake.draw()
  snake.move()
  boardOut(snake.body[0])
}

// main

const snake = new Snake()
const fruit = new Fruit()
snake.draw()
fruit.draw()

window.addEventListener('keydown', event => {
	const key = event.key
	snake.direction = key
})

setInterval(() => {
	update()
}, UPDATE_INTERVAL)