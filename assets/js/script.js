const btn = document.getElementById('menu-btn')
const menu = document.getElementById('menu')
const algo_btn = document.getElementById('algo-menu-btn')
const algo_menu = document.getElementById('algo-nav-menu')
const algo_content = document.getElementById('algo-content')

btn.addEventListener('click', navToggle)

function navToggle() {
  btn.classList.toggle('open')
  menu.classList.toggle('flex')
  menu.classList.toggle('hidden')
}

algo_btn.addEventListener('click', algoNavToggle)
function algoNavToggle() {
  algo_menu.classList.toggle('flex')
  algo_menu.classList.toggle('hidden')
  algo_content.classList.toggle('flex')
  algo_content.classList.toggle('hidden')
}

// accordion: SVG for Minus icon
const minusSVG = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4">
    <path d="M3.75 7.25a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Z" />
  </svg>
`

// accordion: SVG for Plus icon
const plusSVG = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4">
    <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
  </svg>
`

const getAccordionStatus = () => {
  const items = sessionStorage.getItem('accordion-statuses')
  if (items) {
    return JSON.parse(items)
  } else {
    return {}
  }
}

const setAccordionStatus = (index, status) => {
  const items = sessionStorage.getItem('accordion-statuses')
  let statuses
  if (items) {
    statuses = JSON.parse(items)
  } else {
    statuses = {}
  }
  statuses[index] = status
  sessionStorage.setItem('accordion-statuses', JSON.stringify(statuses))
}

window.onload = () => {
  const accordions = getAccordionStatus()
  for (let index in accordions) {
    let content = document.getElementById(`algo-content-${index}`)
    let icon = document.getElementById(`algo-icon-${index}`)
    if (accordions[index]) {
      content.style.maxHeight = content.scrollHeight + 'px'
      icon.innerHTML = minusSVG
    } else {
      content.style.maxHeight = '0'
      icon.innerHTML = plusSVG
    }
  }
}

// accordion
function toggleAccordion(index) {
  const content = document.getElementById(`algo-content-${index}`)
  const icon = document.getElementById(`algo-icon-${index}`)

  // Toggle the content's max-height for smooth opening and closing
  if (content.style.maxHeight && content.style.maxHeight !== '0px') {
    content.style.maxHeight = '0'
    icon.innerHTML = plusSVG
    setAccordionStatus(index, false)
  } else {
    content.style.maxHeight = content.scrollHeight + 'px'
    icon.innerHTML = minusSVG
    setAccordionStatus(index, true)
  }
}
