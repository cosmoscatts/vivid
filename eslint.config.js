import antfu from '@antfu/eslint-config'
import unocss from '@unocss/eslint-plugin'

export default antfu({
  rules: {
    'curly': 'off',
    'antfu/if-newline': 'off',
    'style/brace-style': 'off',
    'max-statements-per-line': 'off',
  },
}, unocss.configs.flat)
