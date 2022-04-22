<template>
  <div class="flex flex-col">
    <label class="font-display mb-2 font-semibold" :for="id">
      {{ label }} <span v-if="required">*</span>
    </label>

    <textarea
      :id="id"
      class="border border-gray-300 rounded-md p-2"
      :placeholder="placeholder"
      :required="required"
      :rows="rows"
      v-on="listeners"
      @input="$emit('input', $event.target.value)"
    />
  </div>
</template>

<script>
  export default {
    inheritAttrs: false,
    model: {
      prop: 'value',
      event: 'input',
    },
    props: {
      label: {
        type: String,
        required: true,
      },
      rows: {
        type: Number,
        default: 4,
      },
      placeholder: {
        type: String,
        default: '',
      },
      required: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      listeners() {
        const { input, ...listeners } = this.$listeners
        return listeners
      },
      id() {
        return this.label.toLowerCase().replace(' ', '-')
      },
    },
  }
</script>
