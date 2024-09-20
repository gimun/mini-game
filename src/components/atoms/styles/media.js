// src/atoms/styles/media.js
import { css } from 'styled-components';

const sizes = {
  mobile: 600,
  tablet: 768,
  desktop: 1024,
};

export const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label]}px) {
      ${css(...args)}
    }
  `;
  return acc;
}, {});
