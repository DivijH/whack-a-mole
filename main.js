const cursor = document.querySelector('.cursor')
const holes = [...document.querySelectorAll('.hole')]
const scoreElement = document.querySelector('.score span')
const livesElement = document.querySelector('.lives span')
const sound = new Audio('assets/smack.mp3')

let score = 0
let lives = 3

function gameOver() {
	document.querySelector('.modal').classList.add('show-modal')
	document.querySelector('.fin_score').textContent = score
}

function run() {
	timer = null
	const img = document.createElement('img')
	img.classList.add('mole')
	img.src = 'assets/mole.png'
	img.addEventListener('click', () => {
		sound.play()
		score++
		scoreElement.textContent = score
		img.src = 'assets/mole-whacked.png'
		img.style.pointerEvents = 'none'
		clearTimeout(timer)
		setTimeout(() => {
			hole.removeChild(img)
			run()
		}, 200)

	})
	const i = Math.floor(Math.random() * holes.length)
	const hole = holes[i]
	hole.appendChild(img)

	setTimeout(() => {
		hole.removeChild(img)
		lives--
		livesElement.textContent = lives
		if(lives == 0) {
			gameOver()
		} else {
			run()
		}
	}, 1500)
}
run()

window.addEventListener('mousemove', e => {
	cursor.style.top = e.pageY + 'px'
	cursor.style.left = e.pageX + 'px'
})

window.addEventListener('mousedown', () => {
	cursor.classList.add('active')
})

window.addEventListener('mouseup', () => {
	cursor.classList.remove('active')
})