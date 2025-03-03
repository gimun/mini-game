import { HighlightSpan } from './CommonStyles.jsx';

/**
 * 텍스트 내 검색어를 하이라이트합니다.
 * @param {string} text - 원본 텍스트.
 * @param {string} searchTerm - 하이라이트할 검색어.
 * @returns {React.ReactNode} - 하이라이트된 텍스트.
 */
export const highlightText = (text, searchTerm) => {
  if (!searchTerm) return text;

  const regex = new RegExp(`(${escapeRegExp(searchTerm)})`, 'gi');
  const parts = text.split(regex);

  return parts.map((part, index) =>
    regex.test(part) ? <HighlightSpan key={index}>{part}</HighlightSpan> : part,
  );
};

/**
 * 정규 표현식에서 사용할 수 있도록 특수 문자를 이스케이프합니다.
 * @param {string} string
 * @returns {string}
 */
const escapeRegExp = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};
