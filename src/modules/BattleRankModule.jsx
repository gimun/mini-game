// src/modules/BattleRankModule.jsx
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import DataDisplay from '../components/pages/DataDisplay.jsx';
import { COLUMNS, LABELS, SORT } from '../constants/Keys.js';
import { getMember } from '../utils/memberHelper.jsx';
import { calculateRankings } from '../utils/dataUtils.js';
import { media } from '../components/atoms/styles/media.js'; // 미디어 헬퍼 임포트

// 전체 레이아웃 스타일 정의 (flexbox)
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; // 페이지 전체 높이 설정
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  transition:
    background-color 0.3s ease,
    color 0.3s ease;

  ${media.mobile`
    padding: 1px;
  `}
`;

const MainContent = styled.main`
  flex: 1; // 남은 공간을 모두 차지
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.background};

  ${media.mobile`
    padding: 1px;
  `}
`;

const MainTopContent = styled.section`
  padding: 10px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.primary};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};

  span {
    color: ${({ theme }) => theme.colors.primary};
    margin-right: 5px;
  }

  p {
    margin: 10px 15px; /* 각 문단의 상하 여백 */
    line-height: 1.6; /* 문장 간격 */
  }

  strong {
    font-weight: bold;
  }

  ${media.mobile`
    font-size: 12px; // 모바일에서 폰트 크기 줄임
    padding: 5px; /* 모바일에서 패딩 줄임 */
  `}
`;

const fileName = 'grouped_rank_score.json';

const BattleRankModuleComponent = () => {
  const [data, setData] = useState([]);
  const [config, setConfig] = useState({
    sort: { key: 'rank_score', direction: SORT.DESC },
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
        key: 'play_count',
        label: '참여 횟수',
        flex: 1,
        align: 'center',
        type: 'number',
      },
      {
        key: 'rank_score',
        label: '종합 점수',
        flex: 4,
        align: 'center',
        type: 'number',
      },
    ],
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/mock-data/rank/${fileName}`);
        const rankData = await response.json();

        // 데이터에서 멤버 정보를 가져오고, status가 1인 멤버만 포함
        const enrichedData = rankData
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
          .filter((item) => item !== null);

        // 점수에 따라 랭킹을 계산한 데이터
        const rankedData = calculateRankings(enrichedData, 'rank_score');
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
    <PageContainer>
      <MainContent>
        <MainTopContent>
          <p>
            <strong>🏆 합산된 점수의 산출 기준은 다음과 같습니다:</strong>
          </p>
          <p>- 각 리그에서 참가자들은 순위에 따라 점수를 받습니다.</p>
          <p>
            - 1등에게는 50점을, 2등에게는 49점을, 3등에게는 48점을 부여하며,
            이후 순위에 따라 점수가 1점씩 감소합니다. 즉, 50등은 1점을 받습니다.
          </p>
          <p>
            - 이 점수는 매주 갱신되며, 각 리그의 결과에 따라 클랜원들의 총합
            점수가 재산출됩니다.
          </p>
        </MainTopContent>

        <DataDisplay
          data={filteredAndSortedData}
          columns={columns}
          onSort={handleSort}
          config={config}
          onSearchChange={handleSearchChange}
        />
      </MainContent>
    </PageContainer>
  );
};

// PropTypes 정의
BattleRankModuleComponent.propTypes = {};

// displayName 설정
BattleRankModuleComponent.displayName = 'BattleRankModuleComponent';

// React.memo로 최적화된 BattleRankModule 컴포넌트 생성
const BattleRankModule = React.memo(BattleRankModuleComponent);

export default BattleRankModule;
