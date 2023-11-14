const canvas = document.getElementById('board')
const context = canvas.getContext('2d')
const square = {
	x : 200,
	y : 500,
	size : 25,
	speed : 25,
	direction : 'ArrowRight'
}
const UPDATE_INTERVAL = 250

function drawSquare() {
	context.clearRect(0, 0, canvas.width, canvas.height)
	context.fillStyle = '#EE9977'
	context.fillRect(square.x, square.y, square.size, square.size)
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
	drawSquare()
}

function update() {
	moveSquare(square.direction)
	boardOut()
}

function reset() {
	square.x = 200
	square.y = 500
	direction = 'ArrowRight'
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

window.addEventListener('keydown', event => {
	const key = event.key
	square.direction = key
})

setInterval(() => {
	update()
}, UPDATE_INTERVAL)