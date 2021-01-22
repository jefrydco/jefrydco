module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true
  },
  theme: {
    extend: {
      height: {
        128: '32rem'
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            marginBottom: theme('spacing.8'),
            color: 'var(--text-normal)',
            '[class~="lead"]': {
              color: 'var(--text-normal)'
            },
            a: {
              color: 'var(--text-link)'
            },
            strong: {
              color: 'var(--text-normal)'
            },
            'ol > li::before': {
              color: 'var(--text-normal)'
            },
            'ul > li::before': {
              color: 'var(--text-normal)'
            },
            hr: {
              borderColor: 'var(--inline-code-bg)',
              borderTopWidth: theme('borderWidth.2')
            },
            blockquote: {
              color: 'var(--text-normal)',
              borderLeftColor: 'var(--inline-code-bg)'
            },
            h1: {
              color: 'var(--text-normal)'
            },
            h2: {
              color: 'var(--text-normal)'
            },
            h3: {
              color: 'var(--text-normal)'
            },
            h4: {
              color: 'var(--text-normal)'
            },
            'figure img': {
              objectFit: 'cover',
              borderRadius: theme('borderRadius.default')
            },
            'figure figcaption': {
              color: 'var(--text-normal)',
              fontSize: theme('fontSize.sm'),
              textAlign: 'center'
            },
            'figure figcaption p': {
              marginBottom: theme('spacing.0')
            },
            code: {
              color: 'var(--inline-code-text)',
              backgroundColor: 'var(--inline-code-bg)',
              borderWidth: theme('borderWidth.default'),
              borderColor: 'var(--inline-code-border)',
              fontFamily: '"Fira Code", monospace',
              borderRadius: theme('borderRadius.default'),
              padding: `${theme('spacing.0')} ${theme('spacing.2')}`,
              whiteSpace: 'pre',
              display: 'inline-block'
            },
            'code::before': {
              content: '""'
            },
            'code::after': {
              content: '""'
            },
            pre: {
              color: '#e2e8f0',
              backgroundColor: '#1a202c',
              fontFamily: '"Fira Code", monospace',
              whiteSpace: 'pre',
              borderRadius: theme('borderRadius.lg'),
              overflowY: 'auto'
            },
            'pre code': {
              borderRadius: theme('borderRadius.lg'),
              minWidth: theme('minWidth.full')
            },
            'pre code::before': {
              content: '""'
            },
            'pre code::after': {
              content: '""'
            },
            thead: {
              color: 'var(--text-normal)',
              borderBottomWidth: theme('borderWidth.2'),
              borderBottomColor: 'var(--inline-code-border)'
            },
            'tbody tr': {
              borderBottomWidth: theme('borderWidth.2'),
              borderBottomColor: 'var(--inline-code-border)'
            }
          }
        },
        lg: {
          css: {
            lineHeight: theme('lineHeight.loose'),
            'figure figcaption': {
              fontSize: theme('fontSize.sm')
            },
            p: {
              marginBottom: theme('spacing.8')
            },
            pre: {
              borderRadius: theme('borderRadius.lg')
            }
          }
        }
      })
    }
  },
  plugins: [
    require('@tailwindcss/custom-forms'),
    require('@tailwindcss/typography')
  ],
  purge: {
    content: ['contents/**/*.md', 'nuxt.config.ts'],
    options: {
      whitelistPatternsChildren: [/shiki.*/]
    }
  }
}
