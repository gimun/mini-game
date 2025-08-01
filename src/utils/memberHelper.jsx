// Enum-like object with numeric status
export const members = {
  1: { name: '무니는 야옹', status: 1 },
  2: { name: '주키니콩', status: 0 },
  3: { name: '유디는 야옹', status: 1 },
  4: { name: '왕떡이는 야옹', status: 1 },
  5: { name: '졔타몽', status: 1 },
  6: { name: '비셩이는 야옹', status: 0 },
  7: { name: '시간부자무직백수', status: 0 },
  8: { name: '미동', status: 0 },
  9: { name: '도라지공주', status: 0 },
  10: { name: '보석리아', status: 0 },
  11: { name: '희크리', status: 0 },
  12: { name: '무명이는 야옹', status: 1 },
  13: { name: '몽실이는 야옹', status: 1 },
  14: { name: '고구마깡', status: 0 },
  15: { name: '감자깡', status: 0 },
  16: { name: '행복한곰이는 야옹', status: 0 },
  17: { name: '먼지야', status: 1 },
  18: { name: '비둘기님', status: 0 },
  19: { name: '비누칠', status: 0 },
  20: { name: '당탕이는 야옹', status: 1 },
  21: { name: '쿵야는 야옹', status: 0 },
  22: { name: '디제이', status: 0 },
  23: { name: '고양이랑', status: 1 },
  24: { name: '룰루', status: 0 },
  25: { name: '백현', status: 1 },
  26: { name: '밤양갱', status: 0 },
  27: { name: '큐밍', status: 0 },
  28: { name: '클라우드', status: 1 },
  29: { name: '치즈는 야옹', status: 1 },
  30: { name: '유진공주', status: 1 },
  31: { name: '전애옹이다옹', status: 1 },
  32: { name: '리틀띰', status: 0 },
  33: { name: '경자', status: 0 },
  34: { name: '252', status: 0 },
  35: { name: '오농농은 야옹', status: 0 },
  36: { name: '고짱이는 야옹', status: 1 },
  37: { name: '보라너굴', status: 1 },
  38: { name: '하눌', status: 1 },
  39: { name: '타기는 야옹', status: 1 },
  40: { name: '초코칩쿠키', status: 1 },
  41: { name: '티티나나는 야옹', status: 1 },
  42: { name: '슈퍼샤이', status: 0 },
  43: { name: '이주연', status: 0 },
  44: { name: '나무는 야옹', status: 1 },
  45: { name: '빌런즈', status: 0 },
  46: { name: '아르미아', status: 0 },
  47: { name: '저거저거', status: 0 },
  48: { name: '문짱이는 야옹', status: 1 },
  49: { name: '펭도리', status: 0 },
  50: { name: 'SNFZO', status: 0 },
  51: { name: '조니', status: 0 },
  52: { name: '할매', status: 0 },
  53: { name: 'bashumet', status: 1 },
  54: { name: '닝곰', status: 1 },
  55: { name: '핑퐁당', status: 1 },
  56: { name: 'PerFume', status: 1 },
  57: { name: '묘연', status: 1 },
  58: { name: '수진', status: 1 },
  59: { name: '유리짱', status: 0 },
  60: { name: '윤ㅇ', status: 0 },
  61: { name: '모모토리는 야옹', status: 0 },
  62: { name: '차닝', status: 1 },
  63: { name: '듕이쓰', status: 0 },
  64: { name: '코코아', status: 1 },
  65: { name: '치즈', status: 0 },
  66: { name: '윤쫑쫑', status: 1 },
  67: { name: '포챠코', status: 0 },
  68: { name: '파랑곤듀', status: 0 },
  69: { name: 'Ellie', status: 0 },
  70: { name: '꼬꼬니는 야옹', status: 1 },
  71: { name: '뭉이완댜', status: 1 },
  72: { name: '다콩', status: 1 },
  73: { name: '뉴온', status: 1 },
  74: { name: '데스몬드', status: 1 },
  75: { name: '동동', status: 1 },
  76: { name: '제로', status: 0 },
  77: { name: '꿀상', status: 0 },
  78: { name: '부르주아', status: 1 },
  79: { name: '승찌', status: 1 },
  80: { name: '봄가을', status: 0 },
  81: { name: '제리', status: 0 },
  82: { name: '여름겨울', status: 0 },
  83: { name: '헨이', status: 1 },
  84: { name: '탱꿀', status: 0 },
  85: { name: '란계링', status: 1 },
  86: { name: '이레오캔따개', status: 1 },
  87: { name: '지우', status: 1 },
  88: { name: '지민', status: 1 },
  89: { name: '대허니', status: 1 },
  90: { name: '백호', status: 1 },
  91: { name: '다곰', status: 1 },
  92: { name: '일산슈퍼스타', status: 1 },
  93: { name: 'YuY', status: 1 },
};

// Helper function to get member names with numeric status handling
export function getMemberName(memberId, includeDeleted = false) {
  const member = members[memberId];

  if (!member) {
    return 'Unknown';
  }

  // 삭제된 멤버인 경우 취소선을 적용
  if (!includeDeleted && member.status === 0) {
    return <s>{member.name}</s>; // HTML <s> 태그로 취소선 적용
  }

  return member.name;
}

export function getMemberNameWithDefault(
  memberId,
  defaultName,
  includeDeleted = false,
) {
  const member = members[memberId];

  if (!member) {
    return <s>{defaultName}</s>;
  }

  // 삭제된 멤버인 경우 취소선을 적용
  if (!includeDeleted && member.status === 0) {
    return <s>{member.name}</s>; // HTML <s> 태그로 취소선 적용
  }

  return member.name;
}

export function getMember(memberId) {
  const member = members[memberId];

  if (!member) {
    return null;
  }

  return member;
}
