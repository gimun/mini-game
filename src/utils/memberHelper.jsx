// Enum-like object with numeric status
export const members = {
    1: {name: "기무니", status: 1},
    2: {name: "주키니콩", status: 1},
    3: {name: "유디", status: 1},
    4: {name: "우리집왕떡이", status: 1},
    5: {name: "졔타몽", status: 1},
    6: {name: "비셩이", status: 1},
    7: {name: "시간부자무직백수", status: 1},
    8: {name: "미동", status: 1},
    9: {name: "도라지공주", status: 1},
    10: {name: "보석리아", status: 1},
    11: {name: "희크리", status: 1},
    12: {name: "무명", status: 1},
    13: {name: "충주", status: 1},
    14: {name: "고구마깡", status: 1},
    15: {name: "감자깡", status: 1},
    16: {name: "행복한곰이", status: 1},
    17: {name: "먼지야", status: 1},
    18: {name: "비둘기님", status: 1},
    19: {name: "비누칠", status: 1},
    20: {name: "우당탕탕", status: 1},
    21: {name: "예슬쿵야", status: 1},
    22: {name: "디제이", status: 1},
    23: {name: "고양이랑", status: 1},
    24: {name: "룰루", status: 0},
    25: {name: "백현", status: 1},
    26: {name: "밤양갱", status: 1},
    27: {name: "큐밍", status: 1},
    28: {name: "클라우드", status: 1},
    29: {name: "치즈", status: 1},
    30: {name: "유진공주", status: 1},
    31: {name: "전애옹이다옹", status: 1},
    32: {name: "리틀띰", status: 1},
    33: {name: "경자", status: 1},
    34: {name: "252", status: 1},
    35: {name: "오농농", status: 1},
    36: {name: "고짱이", status: 1},
    37: {name: "보라너굴", status: 1},
    38: {name: "하눌", status: 1},
    39: {name: "타기", status: 1},
    40: {name: "초코칩쿠키", status: 1},
    41: {name: "티티나나", status: 1},
    42: {name: "슈퍼샤이", status: 1},
    43: {name: "이주연", status: 0},
    44: {name: "나무", status: 1},
    45: {name: "빌런즈", status: 1},
    46: {name: "아르미아", status: 1},
    47: {name: "저거저거", status: 0},
    48: {name: "문짱이", status: 1},
    49: {name: "펭도리", status: 1},
    50: {name: "SNFZO", status: 0},
    51: {name: "조니", status: 1},
    52: {name: "할매", status: 0},
    53: {name: "riguleto", status: 1},
};

// Helper function to get member names with numeric status handling
export function getMemberName(memberId, includeDeleted = false) {
    const member = members[memberId];

    if (!member) {
        console.error(`Member not found for rank: ${memberId}`);
        return "Unknown";
    }

    // 삭제된 멤버인 경우 취소선을 적용
    if (!includeDeleted && member.status === 0) {
        return <s>{member.name}</s>; // HTML <s> 태그로 취소선 적용
    }

    return member.name;
}
