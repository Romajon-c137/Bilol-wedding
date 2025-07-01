// Подключаем плагины
gsap.registerPlugin(ScrollTrigger, SplitText)

function setupSplits() {
	const quotes = document.querySelectorAll('.quote')
	const baseDelay = 0.1
	const baseDuration = 0.7
	const baseEase = 'sine.out'

	quotes.forEach((quote, index) => {
		if (quote.anim) {
			quote.anim.progress(1).kill()
			quote.split.revert()
		}

		quote.split = SplitText.create(quote, {
			type: 'words',
			linesClass: 'split-line',
		})

		quote.anim = gsap.fromTo(
			quote.split.words,
			{
				opacity: 0,
				scale: 0.95,
				y: 10,
				filter: 'blur(6px)',
			},
			{
				opacity: 1,
				scale: 1,
				y: 0,
				filter: 'blur(0px)',
				duration: baseDuration,
				stagger: 0.08,
				ease: baseEase,
				delay: index * baseDelay,
			},
		)
	})
}

// 🍃 4. Анимация цветов и листьев
function animateFlowers() {
	const flowers = ['.flower-1', '.flower-2', '.flower-3', '.flower-4', '.flower-5', '.flower-22']

	const leaves = ['.leaf-1', '.leaf-2', '.leaf-3', '.leaf-4', '.leaf-5']

	const tl = gsap.timeline({ defaults: { duration: 0.8, ease: 'power2.out' } })

	flowers.forEach((selector, index) => {
		tl.fromTo(
			selector,
			{ scale: 0, rotate: -45 },
			{ scale: 1, rotate: 0 },
			index === 0 ? '+=0' : '-=0.4',
		)
	})

	leaves.forEach(selector => {
		tl.fromTo(selector, { scale: 0 }, { scale: 1 }, '-=0.4')
	})

	tl.fromTo('.svg-line', { y: 40, opacity: 0 }, { y: 0, opacity: 1 }, '-=0.8')

	tl.fromTo('.svg_line_1', { y: 40, opacity: 0 }, { y: 0, opacity: 1 }, '-=1')
}

// 👋 5. Подсказка скролла
function initScrollHint() {
	let hasScrolled = false
	const hint = document.getElementById('scroll-hint')

	window.addEventListener('scroll', () => {
		hasScrolled = true
		hint.style.opacity = 0
	})

	setTimeout(() => {
		if (!hasScrolled) {
			hint.style.opacity = 1
		}
	}, 10000)
}

// 🧠 6. Главный запуск — через 3 сек после loader
window.addEventListener('load', () => {
	setTimeout(() => {
		document.getElementById('loader-wrapper').classList.add('hidden')
		animateFlowers()
		initScrollHint()
		setupSplits()
		ScrollTrigger.refresh()
		document.getElementById('loader-wrapper').classList.add('hidden')
		document.body.classList.remove('loading') // 🔥 Вернули скролл
	}, 3000) // ⏱️ Задержка на loader
})
