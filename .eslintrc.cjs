// .eslintrc.cjs
module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
        'plugin:prettier/recommended', // Prettier 통합 (추가)
    ],
    ignorePatterns: [
        'dist',
        'node_modules',
        '.eslintrc.cjs',
        'vite.config.*',
        'firebase.*',
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true, // JSX 지원
        },
    },
    settings: {
        react: { version: 'detect' }, // 자동 감지
    },
    plugins: ['react-refresh', 'prettier'],
    rules: {
        // Prettier 설정을 `warn`으로 변경하여 ESLint 충돌 방지
        'prettier/prettier': [
            'warn',
            { endOfLine: 'lf' }, // Prettier 관련 설정 추가
        ],

        // React 관련 규칙
        'react/prop-types': 'error', // PropTypes 강제
        'react/jsx-no-target-blank': 'error', // 보안 위험 방지
        'react-refresh/only-export-components': [
            'error',
            { allowConstantExport: true },
        ],

        // 개발 중 유용한 설정
        'no-console': 'warn', // 개발 중에는 허용하되, 배포 전 경고
        'no-unused-vars': 'warn', // 사용되지 않은 변수는 경고
    },
};
