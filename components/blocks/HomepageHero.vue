<template>
  <div>
    <section class="relative h-screen flex justify-center items-center">
      <BaseImage
        class="absolute z-[-1] object-cover h-full w-full"
        :src="block.backgroundImage.filename"
        :alt="block.backgroundImage.alt"
      />

      <div class="base-wrapper z-10 flex flex-col lg:justify-center lg:items-center">
        <BaseHeading
          size="h1"
          class="text-white w-3/4 text-left md:w-2/5 lg:w-1/3 2xl:w-80 lg:text-center mb-16"
        >
          {{ block.title }}
        </BaseHeading>

        <div>
          <BaseButton :href="block.button[0].link.cached_url" class="inline">
            {{ block.button[0].btnText }}
          </BaseButton>
        </div>
      </div>
    </section>
    <div v-if="block.callToAction.length" class="-mt-20">
      <TwoColImageRightCta :block="block.callToAction[0]" />
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
