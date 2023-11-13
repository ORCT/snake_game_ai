const canvas = document.getElementById('board')
const context = canvas.getContext('2d')
const square = {
	x : 50,
	y : 50,
	size : 50,
	speed : 50
}

function drawSquare() {
	context.clearRect(0, 0, canvas.width, canvas.height)
	context.fillStyle = '#EE9977'
	context.fillRect(square.x, square.y, square.size, square.speed)
}

function moveSquare(direction) {
	switch (direction) {
		case 'ArrowLeft':
			square.x -= square.speed
			break
		case 'ArrowUp':
			square.y -= square.speed
			break
		case 'ArrowRight':
			square.x += square.speed
			break
		case 'ArrowDown':
			square.y += square.speed
			break
	}
	drawSquare()
}

function printKey(key) {
	console.log(key)

}

window.addEventListener('keydown', event => {
	const key = event.key
	printKey(key)
	moveSquare(key)
})

drawSquare()