// src/modules/BattleRankNewWeekly.jsx
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import DataDisplay from '../components/pages/DataDisplay.jsx';
import { COLUMNS, LABELS, SORT } from '../constants/Keys.js';
import { getMemberNameWithDefault } from '../utils/memberHelper.jsx';
import { calculateRankings } from '../utils/dataUtils.js';
import { media } from '../components/atoms/styles/media.js';

// 스타일 정의
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
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
  margin-top: 10px;
  margin-bottom: 10px;
  border: 2px solid ${({ theme }) => theme.colors.border}; // 전체 섹션 경계
  border-radius: 8px; // 부드러운 모서리
  cursor: pointer; // 클릭 가능하게 설정

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.background}; // 헤더 배경색
    padding: 5px;
    border-radius: 8px 8px 0 0; // 상단 모서리만 둥글게
  }

  .content {
    margin-top: 10px;
    padding: 5px;
    background-color: ${({ theme }) => theme.colors.background}; // 내용 배경색
    border-top: 2px solid ${({ theme }) => theme.colors.border}; // 헤더와 내용 경계
    border-radius: 0 0 8px 8px; // 하단 모서리만 둥글게
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')}; // 상태에 따라 표시
  }

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

// 테이블 컨테이너 스타일 (가로 스크롤 활성화)
const TableContainer = styled.div`
  overflow-x: auto;
  width: 100%;
`;

const BattleRankNewWeeklyComponent = ({ gameCount }) => {
  const [data, setData] = useState([]);
  const [config, setConfig] = useState({
    sort: { key: 'rank_score', direction: SORT.DESC },
    search: { term: '', placeholder: LABELS[COLUMNS.NAME] || 'Name' },
  });

  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen((prev) => !prev);

  // 월간 랭킹 전용 JSON 파일 로드
  const fileName = 'monthly_rank_score.json';

  const columns = useMemo(() => {
    const baseColumns = [
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
        label: '참여 수',
        flex: 1,
        align: 'center',
        type: 'number',
      },
      {
        key: 'rank_score',
        label: '총점',
        flex: 4,
        align: 'center',
        type: 'number',
      },
    ];

    // gameCount에 따라 동적으로 종목 컬럼 추가
    const gameColumns = Array.from({ length: gameCount }, (_, index) => [
      {
        key: `game_${index + 1}_rank_score`,
        label: `${index + 1}종목`,
        flex: 4,
        align: 'center',
        type: 'number',
      },
      {
        key: `game_${index + 1}_score`,
        label: `${index + 1}종목 상세`,
        flex: 4,
        align: 'center',
        type: 'number',
      },
    ]).flat();

    return [...baseColumns, ...gameColumns];
  }, [gameCount]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/mock-data/rank_battle/${fileName}`);
        const rankData = await response.json();

        const enrichedData = rankData
          .map((item) => ({
            ...item,
            [COLUMNS.NAME]: getMemberNameWithDefault(
              item[COLUMNS.MEMBER_ID],
              item[COLUMNS.NAME],
            ),
          }))
          .filter((item) => item !== null);

        setData(enrichedData);
      } catch (error) {
        console.error('데이터 로드 중 오류 발생:', error);
      }
    };

    fetchData();
  }, [fileName]);

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
          .includes(config.search.term.toLowerCase()),
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
        <MainTopContent isOpen={isOpen}>
          <div className="header" onClick={toggleOpen}>
            <strong>📋 점수 산정 기준</strong>
            <span>{isOpen ? '▲' : '▼'}</span> {/* 상태에 따라 아이콘 변경 */}
          </div>
          <div className="content">
            <p>
              <strong>🥇 게임 순위별 점수 부여:</strong>
            </p>
            <p>- 각 리그에서 참가자들은 순위에 따라 점수를 받습니다.</p>
            <p>
              - 1등에게는 50점을, 2등에게는 49점을, 3등에게는 48점을 부여하며,
              이후 순위에 따라 점수가 1점씩 감소합니다. 즉, 50등은 1점을
              받습니다.
            </p>
            <p>
              <strong>🏆 총점 계산:</strong>
            </p>
            <p>- 3개의 게임에서 얻은 점수를 합산하여 총점을 산출합니다.</p>
            <p>
              - 예를 들어, 3게임 모두 1등을 하면 최대 150점(50점 × 3게임)을 받을
              수 있습니다.
            </p>
            <p>
              - 이 점수는 매주 갱신되며, 각 리그의 결과에 따라 클랜원들의 총합
              점수가 재산출됩니다.
            </p>
            <p>
              <strong>🏅 동일 점수 시 동일 순위 부여:</strong>
            </p>
            <p>- 동일한 순위를 가진 클랜원들은 같은 순위를 부여받습니다.</p>
            <p>
              - 동점으로 인해 동일한 순위를 부여받은 클랜원이 있을 경우,
              그만큼의 순위를 건너뛰게 됩니다.
            </p>
          </div>
        </MainTopContent>
        <TableContainer>
          <DataDisplay
            data={filteredAndSortedData}
            columns={columns}
            onSort={handleSort}
            config={config}
            onSearchChange={handleSearchChange}
          />
        </TableContainer>
      </MainContent>
    </PageContainer>
  );
};

// PropTypes 정의
BattleRankNewWeeklyComponent.propTypes = {
  gameCount: PropTypes.number.isRequired,
};

// displayName 설정
BattleRankNewWeeklyComponent.displayName = 'BattleRankNewWeeklyComponent';

// React.memo로 최적화된 BattleRankModule 컴포넌트 생성
const BattleRankNewWeekly = React.memo(BattleRankNewWeeklyComponent);

export default BattleRankNewWeekly;
