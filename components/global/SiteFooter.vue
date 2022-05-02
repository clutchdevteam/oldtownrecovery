<template>
  <div class="flex flex-col mt-16">
    <div class="bg-primary-light">
      <div
        class="desktop-container flex flex-col lg:flex-row lg:justify-between lg:items-center py-4 lg:py-0"
      >
        <BaseText class="text-white font-display font-medium text-lg opacity-100 py-4 lg:py-3">
          {{ footerContent.preFooter.text }}
        </BaseText>

        <div class="py-4 lg:py-3">
          <BaseButton
            :href="footerContent.preFooter.button[0].link.cached_url"
            class="flex justify-center"
          >
            {{ footerContent.preFooter.button[0].btnText }}
          </BaseButton>
        </div>
      </div>
    </div>

    <footer class="bg-primary-dark">
      <div
        class="desktop-container flex flex-col items-center lg:flex-row lg:justify-between py-12 lg:py-2"
      >
        <div class="py-5">
          <BaseImage
            class="w-56 h-auto lg:w-28"
            :src="footerContent.logo.filename"
            :alt="footerContent.logo.alt"
          />
        </div>

        <nav class="w-full lg:w-auto py-5">
          <ul class="flex justify-between md:justify-around lg:space-x-12">
            <li v-for="menu in footerContent.footerNav" :key="menu.id">
              <BaseLink :href="menu.slug.cached_url" class="text-white opacity-75 border-none">{{
                menu.title
              }}</BaseLink>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  </div>
</template>

<script>
  export default {
    props: {
      footerContent: {
        type: Object,
        required: true,
      },
    },
  }
</script>

<style lang="postcss" scoped>
  .nuxt-link-exact-active {
    @apply opacity-100;
  }
</style>
