// .eslintrc.cjs
module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
        'plugin:prettier/recommended', // Prettier 통합
    ],
    ignorePatterns: [
        'dist',
        'node_modules',
        '.eslintrc.cjs',
        '.prettierrc.cjs',
        'vite.config.js',
        'firebase.js',
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true, // JSX 지원
        },
    },
    settings: {
        react: { version: '18.3.1' }, // React 버전 일치
    },
    plugins: ['react-refresh', 'prettier'], // 필요한 플러그인 포함
    rules: {
        // 중요한 규칙을 오류로 설정
        'prettier/prettier': 'error', // Prettier 이슈를 오류로 처리
        'react/prop-types': 'error', // PropTypes 강제
        'react/jsx-no-target-blank': 'error', // 보안 위험 방지
        'react-refresh/only-export-components': [
            'error',
            { allowConstantExport: true },
        ],

        // 덜 중요한 규칙 비활성화 또는 경고로 설정
        'no-console': 'off',
        'no-unused-vars': 'off',
    },
};
