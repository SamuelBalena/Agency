// Animação scroll
function initAnimacaoScroll() {
    const sections = document.querySelectorAll('.js-scroll')
    if(sections.length) {
      const windowMetade = window.innerHeight * 0.6
  
      function animaScroll() {
        sections.forEach((section) => {
          const sectionTop = section.getBoundingClientRect().top
          const isSectionVisible = (sectionTop - windowMetade) < 0
          if(isSectionVisible)
            section.classList.add('ativo')
          else 
            section.classList.remove('ativo')
        })
      }
  
      animaScroll();
  
      window.addEventListener('scroll', animaScroll)
    }
}

initAnimacaoScroll();

// Menu Burguer
const btnMobile = document.getElementById('btn-mobile')

function toggleMenu(event) {
  if (event.type === 'touchstart') event.preventDefault()
  const nav = document.getElementById('nav')
  nav.classList.toggle('active')
  const active = nav.classList.contains('active')
  event.currentTarget.setAttribute('aria-expanded', active)
  if (active) {
    event.currentTarget.setAttribute('aria-label', 'Fechar Menu')
  } else {
    event.currentTarget.setAttribute('aria-label', 'Abrir Menu')
  }
}

btnMobile.addEventListener('click', toggleMenu)
btnMobile.addEventListener('touchstart', toggleMenu)

// Scroll Suave
const menuItems = document.querySelectorAll('.menu a[href^="#"]')

menuItems.forEach(item => {
  item.addEventListener('click', scrollToIdOnClick)
})

function getScrollTopByHref(element) {
  const id = element.getAttribute('href')
  return document.querySelector(id).offsetTop
}

function scrollToIdOnClick(event) {
  event.preventDefault()
  const to = getScrollTopByHref(event.target) - 80
  scrollToPosition(to)
}

function scrollToPosition(to) {
  // window.scroll({
  //   top: to,
  //   behavior: "smooth",
  // })
  smoothScrollTo(0, to)
}

/**
 * Animação Scroll
 * @param {int} endX: coordenada x
 * @param {int} endY: coordenada y
 * @param {int} duration: duração da animação em ms
 */
function smoothScrollTo(endX, endY, duration) {
  const startX = window.scrollX || window.pageXOffset
  const startY = window.scrollY || window.pageYOffset
  const distanceX = endX - startX
  const distanceY = endY - startY
  const startTime = new Date().getTime()

  duration = typeof duration !== 'undefined' ? duration : 400

  // Distanciando do topo
  const easeInOutQuart = (time, from, distance, duration) => {
    if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
    return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
  }

  const timer = setInterval(() => {
    const time = new Date().getTime() - startTime;
    const newX = easeInOutQuart(time, startX, distanceX, duration);
    const newY = easeInOutQuart(time, startY, distanceY, duration);
    if (time >= duration) {
      clearInterval(timer)
    }
    window.scroll(newX, newY)
  }, 1000 / 60); // 60 fps
};