<template>
  <section class="desktop-container lg:flex justify-center">
    <div>
      <div class="bg-primary-light rounded-xl p-5 lg:max-w-min">
        <BaseHeading size="h2" class="text-white font-display font-normal !text-4xl w-1/12">
          {{ block.heading }}
        </BaseHeading>
        <div class="hidden lg:block lg:h-32"></div>
      </div>
      <!-- This button only renders above lg window width -->
      <div class="-mt-4 hidden lg:flex justify-center">
        <BaseButton class="!bg-primary-dark font-semibold text-lg !px-8 !py-0">
          {{ block.button[0].btnText }}
        </BaseButton>
      </div>
    </div>

    <div class="grid grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8 mt-10 lg:mt-2 lg:ml-10 h-1/2">
      <div
        v-for="modality in block.modalities"
        :key="modality._uid"
        :class="`max-w-min ${modality.text.length > 4 ? 'lg:order-first' : ''}`"
      >
        <BaseIcon
          class="w-8 h-8 text-primary-light opacity-75"
          file="check-icon"
          alt="Check Icon"
        />
        <div class="font-display lg:font-semibold text-lg w-1/12">
          {{ modality.text }}
        </div>
      </div>
    </div>

    <!-- This button only renders below lg window width -->
    <div class="flex float-right -mt-12 lg:hidden">
      <BaseButton class="!bg-primary-dark font-semibold text-lg !py-0">
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

<style lang="postcss" scoped></style>
