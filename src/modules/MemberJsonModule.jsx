import { useCallback, useEffect, useState, useMemo } from 'react';
import DataDisplay from '../components/pages/DataDisplay.jsx';
import { calculateRankings } from '../utils/dataUtils.js';
import { COLUMNS, LABELS, SORT } from '../constants/Keys.js';
import { getMember } from '../utils/memberHelper.jsx'; // getMember로 변경

const fileName = 'member_data.json';

const MemberJsonModule = () => {
  const [data, setData] = useState([]);
  const [config, setConfig] = useState({
    sort: { key: COLUMNS.TOTAL_SCORE, direction: SORT.DESC },
    search: { term: '', placeholder: LABELS[COLUMNS.NAME] || 'Name' },
  });

  // 테이블 컬럼 정의
  const columns = useMemo(
    () => [
      {
        key: COLUMNS.MEMBER_ID,
        label: '',
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
    ],
    []
  );

  useEffect(() => {
    // fetch로 JSON 데이터 가져오기
    const fetchData = async () => {
      try {
        const response = await fetch(`/mock-data/member/${fileName}`); // public 폴더에서 가져오는 경로
        const memberData = await response.json();

        // 데이터에서 멤버 정보를 가져오고, status가 0이거나 멤버가 없는 경우 제외
        const enrichedData = memberData
          .map((item) => {
            const member = getMember(item[COLUMNS.MEMBER_ID]);
            if (member && member.status === 1) {
              return {
                ...item,
                [COLUMNS.NAME]: member.name,
              };
            }
            return null;
          })
          .filter((item) => item !== null); // null인 항목 제외

        // 점수에 따라 랭킹을 계산한 데이터
        const rankedData = calculateRankings(enrichedData, COLUMNS.TOTAL_SCORE);
        setData(rankedData);
      } catch (error) {
        console.error('데이터를 가져오는 중 에러가 발생했습니다:', error);
      }
    };

    fetchData();
  }, []);

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

  // 필터링 및 정렬된 데이터 계산
  const filteredAndSortedData = useMemo(() => {
    return data
      .filter((item) =>
        item[COLUMNS.NAME]
          ?.toString()
          .toLowerCase()
          .includes(config.search.term.toLowerCase())
      )
      .sort((a, b) => {
        const aValue = a[config.sort.key];
        const bValue = b[config.sort.key];

        if (aValue < bValue) return config.sort.direction === SORT.ASC ? -1 : 1;
        if (aValue > bValue) return config.sort.direction === SORT.ASC ? 1 : -1;
        return 0;
      });
  }, [data, config]);

  return (
    <>
      <DataDisplay
        data={filteredAndSortedData}
        columns={columns}
        onSort={handleSort}
        config={config}
        onSearchChange={handleSearchChange}
      />
    </>
  );
};

export default MemberJsonModule;
