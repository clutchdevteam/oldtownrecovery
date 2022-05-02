<template>
  <div class="my-20 lg:my-28 py-10 custom-desktop-container">
    <div class="relative z-10">
      <div :class="`lg:absolute ${block.imageRight ? 'lg:right-0' : ''}`">
        <BaseImage :src="block.image.filename" :alt="block.image.alt" />
      </div>
    </div>

    <div
      :class="`flex px-4 lg:px-0 -mt-4 lg:mt-6 z-0 ${
        block.imageRight ? '' : 'lg:place-content-end'
      }`"
    >
      <div
        :class="`px-6 lg:w-3/5 rounded-xl border-2 ${
          block.darkBackground ? 'border-primary-dark bg-primary-dark' : 'border-secondary'
        }`"
      >
        <div :class="`lg:w-2/3 ${block.imageRight ? '' : 'lg:pl-20 lg:w-auto'} z-0`">
          <BaseHeading
            size="h3"
            :class="`pt-10 lg:pt-4 -mb-4 ${block.darkBackground ? 'text-white' : ''}`"
          >
            {{ block.title }}
          </BaseHeading>

          <BaseText :class="`pt-10 pb-6 ${block.darkBackground ? 'text-white opacity-90' : ''}`">
            {{ block.text }}
          </BaseText>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      block: {
        type: Object,
        required: true,
      },
    },
  }
</script>

<style lang="postcss" scoped>
  .custom-desktop-container {
    @apply mx-auto;
    max-width: 960px;
  }
</style>
