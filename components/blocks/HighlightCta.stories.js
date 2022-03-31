export default {
  title: 'Blocks/Highlight CTA',
}

export const Default = (args) => ({
  props: Object.keys(args),
  template: `
    <HighlightCta v-bind="$props" />
  `,
})

Default.argTypes = {
  block: {
    control: 'object,',
  },
}

Default.args = {
  block: {
    text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
  },
}

export const WithButton = (args) => ({
  props: Object.keys(args),
  template: `
  <div>
    <HighlightCta v-bind="$props" />
  </div>`,
})

WithButton.argTypes = {
  block: {
    control: 'object',
  },
}

WithButton.args = {
  block: {
    text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
    button: [
      {
        text: 'Click Here',
        link: {
          cached_url: '/',
        },
      },
    ],
  },
}
