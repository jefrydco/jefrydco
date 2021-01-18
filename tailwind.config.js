module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true
  },
  theme: {
    // compatible with @nuxtjs/color-mode
    darkSelector: '.dark-mode',
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
            },
            '.shiki .dim': {
              opacity: 0.5,
              transition: `opacity 0.3s cubic-bezier(0.55, 0, 0.1, 1)`
            },
            '.shiki:hover .dim': {
              opacity: 1
            },
            '.shiki .data-err .data-lsp': {
              borderBottom: `.1rem solid var(--error)`
            },
            // TODO: Add better solution
            '.shiki:hover .data-err .data-lsp': {
              borderBottom: `.1rem solid var(--error)`
            },
            '.shiki:hover .data-lsp': {
              borderBottom: '.1rem dotted #e2e8f0'
            },
            '.shiki__meta': {
              display: 'flex',
              justifyContent: 'space-between',
              padding: `${theme('spacing.2')} ${theme('spacing.4')}`
            },
            '.shiki__code code': {
              borderRadius: 'unset',
              backgroundColor: '#1a202c',
              borderColor: '#2d3748',
              padding: `${theme('spacing.2')} ${theme('spacing.4')}`
            },
            '.shiki__code .highlight, .shiki__code .error': {
              position: 'relative',
              opacity: 1
            },
            '.shiki__code .highlight::before, .shiki__code .error::before': {
              position: 'absolute',
              content: '""',
              height: theme('height.full'),
              backgroundColor: 'rgba(203, 213, 224, .1)',
              backgroundImage:
                'linear-gradient(to right, rgba(203, 213, 224, .1) 50%, rgba(203, 213, 224, 0))',
              left: '-1.1rem',
              right: '-1.1rem',
              zIndex: theme('zIndex.0')
            },
            '.shiki__code .highlight::before': {
              borderLeft: '.3rem solid var(--text-link)'
            },
            '.shiki__code .error::before': {
              borderLeft: '.3rem solid var(--error)'
            },
            '.shiki__code .highlight span, .shiki__code .error span': {
              position: 'relative',
              zIndex: theme('zIndex.10')
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
  variants: {
    backgroundColor: [
      'dark',
      'dark-hover',
      'dark-group-hover',
      'dark-even',
      'dark-odd'
    ],
    borderColor: ['dark', 'dark-focus', 'dark-focus-within'],
    textColor: ['dark', 'dark-hover', 'dark-active']
  },
  plugins: [
    require('tailwindcss-dark-mode')(),
    require('@tailwindcss/custom-forms'),
    require('@tailwindcss/typography')
  ],
  purge: {
    content(contentDefaults) {
      return contentDefaults.map((file) => file.replace('.js', '.ts'))
    },
    options: {
      whitelist: ['dark-mode']
    }
  }
}
