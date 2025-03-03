import { useCallback, useEffect, useState } from 'react';
import DataFetcher from './DataFetcher.jsx';
import DataDisplay from '../components/pages/DataDisplay.jsx';
import { calculateRankings } from '../utils/dataUtils.js';
import { COLLECTIONS, COLUMNS, LABELS, SORT } from '../constants/Keys.js';

const MemberModule = () => {
  const [data, setData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [config, setConfig] = useState({
    sort: { key: COLUMNS.TOTAL_SCORE, direction: SORT.DESC },
    search: { term: '', placeholder: LABELS[COLUMNS.NAME] || 'Name' },
  });

  const columns = [
    {
      key: COLUMNS.ID,
      label: LABELS[COLUMNS.ID],
      flex: 1,
      align: 'center',
      type: 'string',
      isKey: true,
    },
    {
      key: COLUMNS.RANK,
      label: LABELS[COLUMNS.RANK],
      flex: 1,
      align: 'center',
      type: 'number',
    },
    {
      key: COLUMNS.NAME,
      label: LABELS[COLUMNS.NAME],
      flex: 4,
      align: 'center',
      type: 'string',
    },
    {
      key: COLUMNS.ROLE,
      label: LABELS[COLUMNS.ROLE],
      flex: 3,
      align: 'center',
      type: 'string',
    },
    {
      key: COLUMNS.TOTAL_SCORE,
      label: LABELS[COLUMNS.TOTAL_SCORE],
      flex: 4,
      align: 'center',
      type: 'number',
    },
  ];

  useEffect(() => {
    if (data.length > 0) {
      const rankedData = calculateRankings(data, COLUMNS.TOTAL_SCORE);
      setSortedData(rankedData);
    }
  }, [data]);

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

  const handleSearchChange = useCallback((e) => {
    setConfig((prevConfig) => ({
      ...prevConfig,
      search: { ...prevConfig.search, term: e.target.value },
    }));
  }, []);

  const sortedDataList = [...sortedData].sort((a, b) => {
    if (config.sort.key) {
      const aValue = a[config.sort.key];
      const bValue = b[config.sort.key];

      if (aValue < bValue) return config.sort.direction === SORT.ASC ? -1 : 1;
      if (aValue > bValue) return config.sort.direction === SORT.ASC ? 1 : -1;
    }
    return 0;
  });

  const filteredData = sortedDataList.filter((item) =>
    item[COLUMNS.NAME]
      ?.toString()
      .toLowerCase()
      .includes(config.search.term.toLowerCase()),
  );

  return (
    <>
      <DataFetcher
        collectionName={COLLECTIONS.MEMBER}
        onDataFetched={setData}
      />
      <DataDisplay
        data={filteredData}
        columns={columns}
        onSort={handleSort}
        config={config}
        onSearchChange={handleSearchChange}
      />
    </>
  );
};

export default MemberModule;
