module.exports = {
  parser: '@typescript-eslint/parser',  // Usar el parser de TypeScript
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['react', '@typescript-eslint'],
  env: {
    browser: true,
    es2021: true,
    jest: true,  // Habilitar el entorno de pruebas Jest
  },
  rules: {
    'react/prop-types': 'off',  // Desactivar la verificación de prop-types (usualmente no necesaria en TypeScript)
    '@typescript-eslint/no-unused-vars': ['warn'],  // Cambiar el error de variables no utilizadas a advertencia
  },
};
