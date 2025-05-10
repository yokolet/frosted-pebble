const btn = document.getElementById('menu-btn')
const menu = document.getElementById('menu')

btn.addEventListener('click', navToggle)

function navToggle() {
  btn.classList.toggle('open')
  menu.classList.toggle('flex')
  menu.classList.toggle('hidden')
}

// accordion
function toggleAccordion(index) {
  const content = document.getElementById(`algo-content-${index}`);
  const icon = document.getElementById(`algo-icon-${index}`);

  // SVG for Minus icon
  const minusSVG = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4">
        <path d="M3.75 7.25a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Z" />
      </svg>
    `;

  // SVG for Plus icon
  const plusSVG = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4">
        <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
      </svg>
    `;

  // Toggle the content's max-height for smooth opening and closing
  if (content.style.maxHeight && content.style.maxHeight !== '0px') {
    content.style.maxHeight = '0';
    icon.innerHTML = plusSVG;
  } else {
    content.style.maxHeight = content.scrollHeight + 'px';
    icon.innerHTML = minusSVG;
  }
}

// stimulus settings

(() => {
  const application = Stimulus.Application.start()
  application.register("sidebar", class extends Stimulus.Controller {
    static get targets() {
      return [ "sidebarContainer", "icon", "link" ]
    }

    toggle() {
      if (this.sidebarContainerTarget.dataset.expanded === "1") {
        this.collapse()
      } else {
        this.expand()
      }
    }

    collapse() {
      this.sidebarContainerTarget.classList.remove("sm:w-1/5")
      this.sidebarContainerTarget.dataset.expanded = "0"
      this.iconTarget.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
        </svg>
        `
      this.linkTargets.forEach(link => {
        link.classList.add("sr-only")
      })
    }

    expand() {
      this.sidebarContainerTarget.classList.add("sm:w-1/5")
      this.sidebarContainerTarget.dataset.expanded = "1"
      this.iconTarget.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        `
      this.linkTargets.forEach(link => {
        link.classList.remove("sr-only")
      })
    }
  })
})()
