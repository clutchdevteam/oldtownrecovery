<template>
  <section class="desktop-container">
    <div class="grid lg:grid-cols-2 p-6 bg-primary-light rounded-xl drop-shadow-md gap-12">
      <div class="lg:order-last">
        <BaseImage class="pt-2" :src="block.image.filename" :alt="block.image.alt" />
      </div>
      <div>
        <BaseHeading size="h2" class="text-white font-normal mb-10 w-1/2">
          {{ block.heading }}
        </BaseHeading>
        <BaseText class="text-white opacity-90 font-body pb-12">
          {{ block.text }}
        </BaseText>
      </div>
    </div>
    <div class="p-6 -mt-11">
      <BaseButton
        :href="block.button[0].link.cached_url"
        class="relative text-center lg:px-8 lg:inline"
      >
        {{ block.button[0].btnText }}
      </BaseButton>
    </div>
  </section>
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

<style lang="postcss">
  @media (min-width: 768px) {
    .flex-half {
      width: 45%;
    }
  }
</style>
