<template>
  <section class="max-w-screen-sm mx-auto px-4 pt-10 my-20 lg:my-28">
    <div class="p-4 border-2 border-secondary rounded-xl">
      <div class="px-2 lg:px-8 pt-4 flex flex-col items-center">
        <div class="bg-accent-light rounded-full p-5 drop-shadow-xl -mt-20">
          <BaseIcon class="text-white" file="quote-icon" alt="Quote Icon" />
        </div>

        <BaseHeading size="h3" class="py-4"> {{ block.heading }} </BaseHeading>

        <BaseText class="font-body text-lg"> <i>" </i>{{ block.quote }}<i>"</i> </BaseText>

        <BaseText class="font-display text-sm font-bold pt-2 -mr-2 place-self-end">
          - {{ block.name }}
        </BaseText>
      </div>
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
