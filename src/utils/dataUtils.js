// src/utils/dataUtils.js

/**
 * Rankings to the data based on a specific key.
 * @param {Array} data - Array of data objects to rank.
 * @param {string} key - The key to sort by.
 * @returns {Array} - Array of data objects with rank added.
 */
export const calculateRankings = (data, key) => {
  // Clone data to avoid mutating original data
  const sortedData = [...data].sort((a, b) => b[key] - a[key]);

  // Add rank to each item
  return sortedData.map((item, index) => ({
    ...item,
    rank: index + 1,
  }));
};
