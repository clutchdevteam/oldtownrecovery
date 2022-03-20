export default {
  title: 'Blocks/Interior Title',
}

export const Default = (args) => ({
  props: Object.keys(args),
  template: `
    <InteriorTitle v-bind="$props" />
  `,
})

Default.argTypes = {
  block: {
    control: 'object,',
  },
}

Default.args = {
  block: {
    title: 'Contact Us',
  },
}

export const WithKicker = (args) => ({
  props: Object.keys(args),
  template: `
    <InteriorTitle v-bind="$props" />
  `,
})

WithKicker.argTypes = {
  block: {
    control: 'object',
  },
}

WithKicker.args = {
  block: {
    title: 'Admissions',
    kicker: 'Take the first step.',
  },
}
