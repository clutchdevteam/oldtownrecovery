<template>
  <div :id="`${menuId}-wrapper`" @keydown.stop="handleKeyPress" :data-depth="depth">
    <button
      @click.prevent="toggleMenu(menu)"
      :id="menuId"
      aria-haspopup="true"
      ref="menuButtonRef"
      :aria-expanded="isOpen.toString()"
      :aria-controls="submenuId"
    >
      {{ menu.title }}
      <BaseIcon
        file="chevron-icon"
        class="h-4 w-4 text-accent-light inline -mt-1 ml-2 transition duration-150 ease-in-out"
        :class="isOpen ? '-rotate-180' : ''"
      />
    </button>

    <ul v-if="isOpen" @keydown.esc.stop="closeMenu" :id="submenuId">
      <BaseMenu
        v-for="(menu, index) in menu.submenus"
        :key="index"
        :menu="menu"
        :depth="depth + 1"
      />
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isOpen: false,
      }
    },
    props: {
      depth: {
        type: Number,
        required: true,
      },
      menu: {
        type: Object,
        required: true,
      },
    },
    watch: {
      $route(to, from) {
        this.closeMenu()
      },
    },
    computed: {
      menuId() {
        return this.menu.title.toLowerCase().replace(' ', '-')
      },
      submenuId() {
        return `${this.menu.title.toLowerCase().replace(' ', '-')}-submenu`
      },
    },
    methods: {
      toggleMenu() {
        this.isOpen = !this.isOpen

        if (this.isOpen) {
          this.$nextTick(() => {
            const submenu = document.getElementById(this.submenuId)
            const firstItem = submenu.querySelector('a, button')
            firstItem?.focus()
          })
        }

        if (!this.isOpen) {
          this.$nextTick(() => {
            this.$refs.menuButtonRef?.focus()
          })
        }
      },
      closeMenu() {
        this.isOpen = false

        this.$refs.menuButtonRef?.focus()
      },
      handleKeyPress(e) {
        // Query to get focusable elements within the sidebar nav
        const navEl = document.getElementById(`${this.menuId}-wrapper`)
        const focusableElements = navEl.querySelectorAll(['a', 'button'])
        // Convert nodelist of elements into an array
        const focusableElementsArr = Array.from(focusableElements)

        // Grab current active element
        const activeEl = document.activeElement
        // Find current active element within the array of focusable elements
        const activeElIndex = focusableElementsArr.findIndex((f) => f.id === activeEl.id)
        const lastIdx = focusableElementsArr.length - 1
        if (e.key === 'ArrowUp') {
          activeElIndex <= 0
            ? focusableElementsArr[0].focus()
            : focusableElementsArr[activeElIndex - 1].focus()
        }
        if (e.key === 'ArrowDown') {
          activeElIndex >= lastIdx
            ? focusableElementsArr[lastIdx].focus()
            : focusableElementsArr[activeElIndex + 1].focus()
        }

        if (e.key === 'Escape') {
          this.closeMenu()
        }
      },
    },
  }
</script>
