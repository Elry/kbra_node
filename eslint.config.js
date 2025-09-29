import js from '@eslint/js'
import globals from 'globals'
import importPlugin from 'eslint-plugin-import'
import jestPlugin from 'eslint-plugin-jest'

export default [
{
    ignores: [
      '**/node_modules/**',
      '**/coverage/**',
      '**/dist/**',
      '**/build/**',
      '*.env*',
      '.husky',
      '!.env.example'
    ]
  },

  // Base recommended configuration
  js.configs.recommended,
  {
    plugins: {
        import: importPlugin
    },
  },
  // Main source files configuration
  {
    files: ['src/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.es2022
      }
    }
  },

  // Test files configuration with Jest plugin
  {
    files: [
      '**/__tests__/**',
      'test/**',
      '**/*.test.js',
      '**/*.spec.js'
    ],
    plugins: {
      jest: jestPlugin
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.es2022,
        ...globals.jest
      }
    },
    rules: {
      ...jestPlugin.configs.recommended.rules,
      'no-console': 'off',
      'no-await-in-loop': 'off',
      'import/no-unresolved': 'off',
      'no-restricted-imports': 'off',
      'import/order': 'off',
      // Additional Jest-specific rules
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/prefer-to-have-length': 'warn',
      'jest/valid-expect': 'error'
    }
  },

  // Configuration files
  {
    files: ['*.config.js', 'eslint.config.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node
      }
    },
    rules: {
      'no-undef': 'off',
      'import/no-unresolved': 'off',
      'no-restricted-imports': 'off',
      'import/order': 'off'
    }
  },

  // Root JavaScript files (like server.js)
  {
    files: ['*.js'],
    ignores: ['src/**', 'test/**'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.es2022
      }
    },
    rules: {
      'import/no-unresolved': 'off',
      'no-restricted-imports': 'off',
      'import/order': 'off'
    }
  }
]