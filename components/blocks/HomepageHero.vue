<template>
  <div>
    <section class="relative h-screen flex justify-center items-center overflow-hidden">
      <BaseImage
        class="absolute z-[-1] h-full w-full object-cover"
        :src="block.backgroundImage.filename"
        :alt="block.backgroundImage.alt"
      />

      <div class="base-wrapper z-10 flex flex-col lg:justify-center lg:items-center">
        <BaseHeading size="h1" class="text-white text-left lg:w-2/3 2xl:w-1/3 lg:text-center mb-16">
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
