// utils/gameNameHelper.js
export const games = {
    1: {name: '뚫어뚫어'},
    2: {name: '뿌려뿌려'},
    3: {name: '무찔무찔'},
    4: {name: '뛰어말어'},
    5: {name: '높이높이'},
    6: {name: '넘어넘어'},
    7: {name: '놓아놓아'},
    8: {name: '빙글빙글'},
    9: {name: '뿌셔뿌셔'},
    10: {name: '미끌미끌'},
    11: {name: '돌아돌아'},
    12: {name: '달려달려'},
    13: {name: '올라올라'},
    14: {name: '어푸어푸'},
    15: {name: '붙어붙어'},
    16: {name: '날아날아'},
    17: {name: '날려날려'},
    18: {name: '건너건너'},
    19: {name: '폴짝폴짝'},
    20: {name: '쏘아쏘아'},
    21: {name: '오락가락'},
    22: {name: '삼단정리'},
    23: {name: '니편내편'},
    24: {name: '가둬가둬'},
};

// Helper function to get game name by ID
export function getGameName(gameId) {
    const game = games[gameId];

    if (!game) {
        console.error(`Game not found for ID: ${gameId}`);
        return "Unknown Game";
    }

    return game.name;
}

// Helper function to get all game names
export function getAllGameNames() {
    return Object.values(games).map(game => game.name);
}
