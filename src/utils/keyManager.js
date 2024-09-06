// src/utils/keyManager.js
let globalIndex = 0;

// 전역적으로 고유한 `key`를 반환
export const getUniqueKey = () => {
    return globalIndex++;
};
