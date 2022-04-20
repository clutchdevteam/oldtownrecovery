<template>
  <div class="flex flex-col">
    <label class="font-display mb-2 font-semibold" :for="id">
      {{ label }} <span v-if="required">*</span>
    </label>

    <input
      :id="id"
      class="border border-gray-300 rounded-md p-2"
      :type="type"
      :placeholder="placeholder"
      :required="required"
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
      type: {
        type: String,
        default: 'text',
        validator: (value) => {
          const validProps = ['text', 'email', 'tel', 'url', 'search', 'password']
          return validProps.includes(value)
        },
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
