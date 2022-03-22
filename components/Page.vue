<template>
  <div v-editable="block" class="w-full">
    <component v-for="block in block.body" :key="block._uid" :block="block" :is="block.component" />
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
