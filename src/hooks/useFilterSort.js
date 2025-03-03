// src/hooks/useFilterSort.js
import { useCallback, useState, useMemo } from 'react';
import { SORT } from '../constants/Keys.js';
import { getAllGameNames } from '../utils/gameNameHelper';

const useFilterSort = (initialData, columns) => {
  const [data] = useState(initialData);
  const [config, setConfig] = useState({
    sort: { key: 'mission_id', direction: SORT.DESC },
    search: { term: '', placeholder: '모든 필드 검색' },
  });

  const [searchInput, setSearchInput] = useState(''); // 새로운 검색 입력 상태

  const [filters, setFilters] = useState({
    reward_type: [],
    game_name: [],
  });

  const [isRewardFilterVisible, setIsRewardFilterVisible] = useState(false);
  const [isGameNameFilterVisible, setIsGameNameFilterVisible] = useState(false);

  const rewardTypes = ['캐릭터', '스킨', '코스튬', '배경음'];
  const gameNames = getAllGameNames();

  const searchFields = useMemo(() => {
    return columns.map((col) => col.key).filter((key) => key !== 'mission');
  }, [columns]);

  const handleSort = useCallback((key) => {
    setConfig((prevConfig) => {
      const newDirection =
        prevConfig.sort.key === key && prevConfig.sort.direction === SORT.ASC
          ? SORT.DESC
          : SORT.ASC;
      return {
        ...prevConfig,
        sort: { key, direction: newDirection },
      };
    });
  }, []);

  const handleSearchInputChange = useCallback((e) => {
    setSearchInput(e.target.value);
  }, []);

  const triggerSearch = useCallback(() => {
    setConfig((prevConfig) => ({
      ...prevConfig,
      search: { ...prevConfig.search, term: searchInput },
    }));
  }, [searchInput]);

  const handleCheckboxChange = useCallback((e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => {
      const isChecked = e.target.checked;
      const currentValues = prevFilters[name];

      const newValues = isChecked
        ? [...currentValues, value]
        : currentValues.filter((val) => val !== value);

      return {
        ...prevFilters,
        [name]: newValues,
      };
    });
  }, []);

  const clearSingleFilter = useCallback((name, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: prevFilters[name].filter((val) => val !== value),
    }));
  }, []);

  const clearAllFilters = useCallback(() => {
    setFilters({
      reward_type: [],
      game_name: [],
    });
  }, []);

  const filteredAndSortedData = useMemo(() => {
    return data
      .filter((item) =>
        searchFields.some((field) =>
          item[field]
            ?.toString()
            .toLowerCase()
            .includes(config.search.term.toLowerCase()),
        ),
      )
      .filter(
        (item) =>
          filters.reward_type.length === 0 ||
          filters.reward_type.includes(item.reward_type),
      )
      .filter(
        (item) =>
          filters.game_name.length === 0 ||
          filters.game_name.includes(item.game_name),
      )
      .sort((a, b) => {
        const aValue = a[config.sort.key];
        const bValue = b[config.sort.key];

        if (aValue < bValue) return config.sort.direction === SORT.ASC ? -1 : 1;
        if (aValue > bValue) return config.sort.direction === SORT.ASC ? 1 : -1;
        return 0;
      });
  }, [data, config, filters, searchFields]);

  return {
    config,
    filters,
    rewardTypes,
    gameNames,
    columns,
    filteredAndSortedData,
    handleSort,
    handleSearchInputChange, // 업데이트된 함수 이름
    triggerSearch, // 새로운 검색 트리거 함수
    handleCheckboxChange,
    clearSingleFilter,
    clearAllFilters,
    isRewardFilterVisible,
    setIsRewardFilterVisible,
    isGameNameFilterVisible,
    setIsGameNameFilterVisible,
    searchInput, // UI 컴포넌트에서 사용할 수 있도록 노출
  };
};

export default useFilterSort;
