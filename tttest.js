const canvas = document.getElementById('board')
const context = canvas.getContext('2d')
const UPDATE_INTERVAL = 250

class Fruit {
	constructor() {
		this.x = 750
		this.y = 500
		this.size = 25
	}

	setPos() {
		this.x = Math.floor(Math.random() * 1001)
		this.y = Math.floor(Math.random() * 1001)
	}

	draw() {
		context.fillStyle = '#77BBBB'
		context.fillRect(this.x, this.y, this.size, this.size)
	}
}

class Square {
	constructor() {
		this.x = 200
		this.y = 500
		this.size = 25
		this.speed = 25
		this.direction = 'ArrowRight'
	}
	
	setPos() {
		this.x = Math.floor(Math.random() * 1001)
		this.y = Math.floor(Math.random() * 1001)
	}
	
	draw() {
		context.fillStyle = '#EE9977'
		context.fillRect(this.x, this.y, this.size, this.size)
	}
}

function moveSquare(direction) {
	if (direction === 'ArrowLeft') {
		square.x -= square.speed
	} else if (direction === 'ArrowUp') {
		square.y -= square.speed
	} else if (direction === 'ArrowRight') {
		square.x += square.speed
	} else if (direction === 'ArrowDown') {
		square.y += square.speed
	}
	drawSquare(square)
}

function eatFruit() {
	if (square.x === fruit.x && square.y === fruit.y) {
		context.clearRect(fruit.x, fruit.y, fruit.size, fruit.size)
		randomFruitPos()
		context.fillStyle = '#009977'
		context.fillRect(fruit.x, fruit.y, fruit.size, fruit.size)
	}
}

function update() {
	context = clearRect(0, 0, canvas.width, canvas.height)
	fruit.draw()
	square.draw()
	moveSquare(square.direction)
	boardOut()
}

function reset() {
	square.x = 200
	square.y = 500
	square.direction = 'ArrowRight'
	fruit.x = 750
	fruit.y = 500
}

function gameOver() {
	alert('Game Over!')
	reset()
}

function boardOut() {
	if (square.x >= canvas.width || square.x < 0 || square.y >= canvas.height || square.y < 0) {
		gameOver()
	}
}

const square = new Square()
const fruit = new Fruit()
square.draw()
fruit.draw()

window.addEventListener('keydown', event => {
	const key = event.key
	square.direction = key
})

setInterval(() => {
	update()
}, UPDATE_INTERVAL)