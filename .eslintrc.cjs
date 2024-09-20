module.exports = {
    root: true,
    env: {browser: true, es2020: true},
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
        'plugin:prettier/recommended', // Prettier 추가
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true, // JSX 지원 명시
        },
    },
    settings: {
        react: {version: '18.3.1'}, // package.json과 일치시키기
    },
    plugins: ['react-refresh', 'prettier'], // Prettier 플러그인 추가
    rules: {
        'react/jsx-no-target-blank': 'off',
        'react-refresh/only-export-components': [
            'warn',
            {allowConstantExport: true},
        ],
        'react/prop-types': 'warn', // PropTypes 경고 활성화
        'prettier/prettier': 'warn', // Prettier 경고 활성화
    },
};
