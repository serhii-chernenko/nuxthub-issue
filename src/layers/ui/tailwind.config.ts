import type { Config } from 'tailwindcss'

const sharedThemeSettings = {
  '--rounded-box': '5rem', // border radius rounded-box utility class, used in card and other large boxes
  '--rounded-btn': '5rem', // border radius rounded-btn utility class, used in buttons and similar element
  '--rounded-badge': '5rem', // border radius rounded-badge utility class, used in badges and similar
  '--animation-btn': '0.3s', // duration of animation when you click on button
  '--animation-input': '0.2s', // duration of animation for inputs like checkbox, toggle, radio, etc
  '--btn-focus-scale': '0.95', // scale transform of button when you focus on it
  '--border-btn': '1px', // border width of buttons
  '--tab-border': '1px', // border width of tabs
  '--tab-radius': '0.5rem', // border radius of tabs
}

export default <Partial<Config>>{
  daisyui: {
    logs: false,
    themes: [
      {
        light: {
          // eslint-disable-next-line @typescript-eslint/no-require-imports
          ...require('daisyui/src/theming/themes')['lofi'],
          ...sharedThemeSettings,
        },
      },
      {
        dark: {
          // eslint-disable-next-line @typescript-eslint/no-require-imports
          ...require('daisyui/src/theming/themes')['dim'],
          ...sharedThemeSettings,
        },
      },
    ],
  },
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('daisyui'),
  ],
}
