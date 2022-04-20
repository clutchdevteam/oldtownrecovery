<template>
  <section class="base-wrapper desktop-container grid grid-cols-1 gap-8 lg:grid-cols-3 pt-14">
    <BaseHeading size="h3" tag="h2" class="text-primary-dark font-display">
      {{ block.heading }}
    </BaseHeading>

    <BaseText class="font-body opacity-75"> {{ block.column_1 }} </BaseText>

    <BaseText class="font-body opacity-75"> {{ block.column_2 }} </BaseText>
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
