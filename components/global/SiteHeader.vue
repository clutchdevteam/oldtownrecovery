<template>
  <header class="flex items-center justify-between height-limit">
    <div class="w-28 bg-primary-light rounded-br-md p-3">
      <BaseLink href="/" :inert="isMobileMenuOpen">
        <BaseImage v-if="logo" :src="logo.filename" :alt="logo.alt" />
      </BaseLink>
    </div>

    <!-- this style may have to go back on the ul class after this comment: space-x-6 -->

    <nav>
      <ul class="desktop hidden lg:flex mr-2">
        <li
          v-for="menu in nav"
          :key="menu.id"
          class="text-black font-semibold opacity-75 flex justify-center content-center border-t-2 border-transparent hover:opacity-100 hover:border-accent text-sm"
        >
          <BaseMenu :menu="menu" :depth="0" />
        </li>
      </ul>

      <div class="mobile lg:hidden">
        <button
          ref="openButtonRef"
          @click="toggleMobileMenu"
          type="button"
          :inert="isMobileMenuOpen"
        >
          <span class="sr-only">Open main menu</span>
          <div class="p-4">
            <BaseIcon class="w-8 h-8 text-primary-light" file="menu-icon" alt="Open Menu" />
          </div>

          <Portal to="mobile-menu">
            <div
              :class="`fixed inset-0 bg-black transition duration-150 ${
                isMobileMenuOpen ? 'bg-opacity-75' : 'bg-opacity-0 pointer-events-none'
              }`"
              :inert="!isMobileMenuOpen"
              @keydown.esc="closeMenu"
            >
              <div
                :class="`flex transform transition-transform duration-150 ease-in-out ${
                  isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                }`"
              >
                <div>
                  <button
                    class="flex justify-center items-center bg-white rounded-full ml-4 mr-4 mt-4 h-12 w-12"
                    ref="closeButtonRef"
                    @click="closeMenu"
                    type="button"
                  >
                    <span class="sr-only">Close menu</span>
                    <BaseIcon
                      class="w-6 h-6 text-primary-light"
                      file="close-icon"
                      alt="Close Menu"
                    />
                  </button>
                </div>

                <div class="flex flex-col justify-between h-screen w-full bg-white">
                  <nav role="navigation">
                    <ul>
                      <li
                        class="py-3 px-4 border-b border-gray-300"
                        v-for="menu in nav"
                        :key="menu.id"
                      >
                        <BaseMenu :menu="menu" :depth="0" />
                      </li>
                    </ul>
                  </nav>

                  <div class="px-3 py-6">
                    <BaseLink href="/">
                      <BaseImage v-if="logo" :src="logo.filename" :alt="logo.alt" />
                    </BaseLink>
                  </div>
                </div>
              </div>
            </div>
          </Portal>
        </button>
      </div>
    </nav>
  </header>
</template>

<script>
  import { mapState } from 'vuex'
  import { Portal } from 'portal-vue'

  export default {
    components: {
      Portal,
    },
    props: {
      nav: {
        type: Array,
        required: true,
      },
      logo: {
        type: Object,
        required: true,
      },
    },
    computed: {
      ...mapState('global', ['isMobileMenuOpen', 'pageHasModalOpen']),
    },
    methods: {
      async toggleMobileMenu() {
        await this.$store.commit('global/isMobileMenuOpen', !this.isMobileMenuOpen)
        await this.$nextTick()
        await this.$nextTick()

        this.$refs.closeButtonRef?.focus()
      },
      async closeMenu() {
        await this.$store.commit('global/isMobileMenuOpen', false)
        await this.$nextTick()
        await this.$nextTick()

        this.$refs.openButtonRef?.focus()
      },
    },
  }
</script>

<style lang="postcss">
  nav ul li a {
    @apply p-6;
  }

  .nuxt-link-extact-active {
    @apply border-accent opacity-100 text-primary-light font-semibold;
  }
</style>
