// src/modules/HiddenJsonModule.jsx
import { useCallback, useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import { FaTimes, FaSync } from 'react-icons/fa';
import DataFilteredDisplay from '../components/pages/DataFilteredDisplay.jsx';
import missionData from '../assets/data/mission_data.json'; // JSON 데이터 import
import { SORT } from '../constants/Keys.js';
import { getAllGameNames } from '../utils/gameNameHelper';
import { media } from '../components/atoms/styles/media.js';

// 전체 레이아웃 스타일 정의 (flexbox)
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* 페이지 전체 높이 설정 */
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
`;

// 메인 콘텐츠 스타일
const MainContent = styled.main`
  flex: 1; /* 남은 공간을 모두 차지 */
  padding: ${({ theme }) => theme.spacing.medium};
  background-color: ${({ theme }) => theme.colors.background};
  transition: padding 0.3s ease;

  ${media.mobile`
    padding: ${({ theme }) => theme.spacing.small};
  `}
`;

// 푸터 스타일
const Footer = styled.footer`
  background-color: ${({ theme }) => theme.colors.footerBackground};
  text-align: center;
  padding: ${({ theme }) => theme.spacing.medium} 0;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.footerText};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1); /* 약간의 그림자 효과 추가 */
  transition:
    background-color 0.3s ease,
    color 0.3s ease;

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none; /* 기본 밑줄 제거 */
    font-weight: bold; /* 링크를 강조 */

    &:hover {
      text-decoration: underline; /* 링크에 마우스를 올렸을 때 밑줄 표시 */
    }
  }

  p {
    margin: 10px 0; /* 각 문단의 상하 여백 */
    line-height: 1.6; /* 문장 간격 */
  }

  strong {
    color: ${({ theme }) => theme.colors.primary}; /* 강조된 텍스트 색상 */
    font-weight: bold;
  }

  ${media.mobile`
    font-size: 12px; /* 모바일에서 폰트 크기 줄임 */
    padding: ${({ theme }) => theme.spacing.small}; /* 모바일에서 패딩 줄임 */
  `}
`;

// 필터 필드셋 스타일
const FilterFieldset = styled.fieldset`
  margin-bottom: ${({ theme }) => theme.spacing.small};
  padding: ${({ theme }) => theme.spacing.small};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;

  legend {
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
  }

  ${media.mobile`
    legend {
      font-size: 14px;
    }
  `}
`;

// 선택된 필터 스타일
const SelectedFilters = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.small};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};

  span {
    color: ${({ theme }) => theme.colors.primary};
    margin-right: 5px;
  }

  ${media.mobile`
    font-size: 12px; /* 모바일에서 폰트 크기 줄임 */
  `}
`;

// 필터 태그 스타일
const FilterTag = styled.span`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};

  svg {
    margin-left: 5px;
    font-size: 12px; /* 아이콘 크기를 작게 설정 */
    color: ${({ theme }) => theme.colors.error}; /* 오류 색상으로 설정 */
    cursor: pointer;
  }

  ${media.mobile`
    font-size: 12px; /* 모바일에서 텍스트 크기 줄임 */
  `}
`;

// 모든 필터 초기화 버튼 스타일
const AllClearButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  font-size: 15px;
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.medium};

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }

  svg {
    margin-left: 5px;
  }

  ${media.mobile`
    font-size: 13px; /* 모바일에서 폰트 크기 줄임 */
  `}
`;

// 개별 필터 초기화 버튼 스타일
const ClearButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  font-size: 15px;
  display: flex;
  align-items: center;

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }

  svg {
    margin-left: 5px;
  }

  ${media.mobile`
    font-size: 13px; /* 모바일에서 폰트 크기 줄임 */
  `}
`;

// 체크박스 레이블 스타일
const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  margin-right: 15px;
  margin-bottom: 10px;

  input {
    margin-right: 5px;
  }

  ${media.mobile`
    margin-right: 10px;
    font-size: 12px;

    input {
      width: 15px;
      height: 15px;
    }
  `}
`;

// 체크박스 그룹 스타일
const CheckboxGroup = styled.div`
  display: ${({ $isVisible }) => ($isVisible ? 'flex' : 'none')};
  flex-wrap: wrap;
`;

// HiddenJsonModule 컴포넌트
const HiddenJsonModule = () => {
  const [data] = useState(missionData);
  const [config, setConfig] = useState({
    sort: { key: 'mission_id', direction: SORT.DESC },
    search: { term: '', placeholder: '보상' },
  });

  const [filters, setFilters] = useState({
    reward_type: [],
    game_name: [],
  });

  const [isRewardFilterVisible, setIsRewardFilterVisible] = useState(false); // 기본적으로 닫혀 있는 상태로 설정
  const [isGameNameFilterVisible, setIsGameNameFilterVisible] = useState(false); // 기본적으로 닫혀 있는 상태로 설정

  const rewardTypes = ['캐릭터', '스킨', '코스튬', '배경음'];
  const gameNames = getAllGameNames();

  const columns = useMemo(
    () => [
      {
        key: 'mission_id',
        label: 'No.',
        flex: 1,
        align: 'center',
        type: 'number',
        isKey: true,
      },
      {
        key: 'reward_type',
        label: '분류',
        flex: 1,
        align: 'center',
        type: 'string',
      },
      {
        key: 'game_name',
        label: '게임',
        flex: 1,
        align: 'center',
        type: 'string',
      },
      { key: 'emblem', label: '칭호', flex: 1, align: 'left', type: 'string' },
      { key: 'reward', label: '보상', flex: 1, align: 'left', type: 'string' },
      { key: 'mission', label: '미션', flex: 1, align: 'left', type: 'string' },
    ],
    []
  );

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
        item['reward']
          ?.toString()
          .toLowerCase()
          .includes(config.search.term.toLowerCase())
      )
      .filter(
        (item) =>
          filters.reward_type.length === 0 ||
          filters.reward_type.includes(item.reward_type)
      )
      .filter(
        (item) =>
          filters.game_name.length === 0 ||
          filters.game_name.includes(item.game_name)
      )
      .sort((a, b) => {
        const aValue = a[config.sort.key];
        const bValue = b[config.sort.key];

        if (aValue < bValue) return config.sort.direction === SORT.ASC ? -1 : 1;
        if (aValue > bValue) return config.sort.direction === SORT.ASC ? 1 : -1;
        return 0;
      });
  }, [data, config, filters]);

  // 접근성: 키보드 포커스 관리 (필요 시 추가)
  useEffect(() => {
    // 예: 컴포넌트가 마운트될 때 특정 요소에 포커스를 맞추거나 기타 접근성 기능 추가 가능
  }, []);

  return (
    <PageContainer>
      <MainContent>
        {/* 보상 분류별 필터 */}
        <FilterFieldset>
          <legend>
            <ClearButton
              onClick={() => setIsRewardFilterVisible((prev) => !prev)}
              aria-expanded={isRewardFilterVisible}
              aria-controls="reward-filter-group"
            >
              보상 분류별 필터 {isRewardFilterVisible ? '▲' : '▼'}
            </ClearButton>
          </legend>
          {filters.reward_type.length > 0 && (
            <SelectedFilters>
              {filters.reward_type.map((type) => (
                <FilterTag key={type}>
                  {type}
                  <FaTimes
                    onClick={() => clearSingleFilter('reward_type', type)}
                    aria-label={`Remove filter ${type}`}
                  />
                </FilterTag>
              ))}
            </SelectedFilters>
          )}
          <CheckboxGroup
            id="reward-filter-group"
            $isVisible={isRewardFilterVisible}
          >
            {rewardTypes.map((type) => (
              <CheckboxLabel key={type}>
                <input
                  type="checkbox"
                  name="reward_type"
                  value={type}
                  checked={filters.reward_type.includes(type)}
                  onChange={handleCheckboxChange}
                  aria-label={`Filter by reward type ${type}`}
                />
                {type}
              </CheckboxLabel>
            ))}
          </CheckboxGroup>
        </FilterFieldset>

        {/* 게임별 필터 */}
        <FilterFieldset>
          <legend>
            <ClearButton
              onClick={() => setIsGameNameFilterVisible((prev) => !prev)}
              aria-expanded={isGameNameFilterVisible}
              aria-controls="game-name-filter-group"
            >
              게임별 필터 {isGameNameFilterVisible ? '▲' : '▼'}
            </ClearButton>
          </legend>
          {filters.game_name.length > 0 && (
            <SelectedFilters>
              {filters.game_name.map((name) => (
                <FilterTag key={name}>
                  {name}
                  <FaTimes
                    onClick={() => clearSingleFilter('game_name', name)}
                    aria-label={`Remove filter ${name}`}
                  />
                </FilterTag>
              ))}
            </SelectedFilters>
          )}
          <CheckboxGroup
            id="game-name-filter-group"
            $isVisible={isGameNameFilterVisible}
          >
            {gameNames.map((name) => (
              <CheckboxLabel key={name}>
                <input
                  type="checkbox"
                  name="game_name"
                  value={name}
                  checked={filters.game_name.includes(name)}
                  onChange={handleCheckboxChange}
                  aria-label={`Filter by game name ${name}`}
                />
                {name}
              </CheckboxLabel>
            ))}
          </CheckboxGroup>
        </FilterFieldset>

        {/* 모든 필터 초기화 버튼 */}
        <AllClearButton
          onClick={clearAllFilters}
          aria-label="Clear all filters"
        >
          필터 초기화 <FaSync />
        </AllClearButton>

        {/* 데이터 표시 */}
        <DataFilteredDisplay
          data={filteredAndSortedData}
          columns={columns}
          onSort={handleSort}
          config={config}
          onSearchChange={handleSearchChange}
        />
      </MainContent>

      <Footer>
        <p>
          이 페이지는 <strong>물베님</strong>이{' '}
          <strong>미니게임천국 공식 카페</strong>의
          <strong>공략&Tip 게시판</strong>에 게시한 자료를 기반으로 검색 기능을
          구현한 것입니다. 출처:
          <a
            href="https://cafe.naver.com/minigameparty/31951"
            target="_blank"
            rel="noopener noreferrer"
          >
            미니게임천국 공식 카페
          </a>
        </p>
        <p>&copy; 2024 고양이는야옹 - 미니게임천국</p>
      </Footer>
    </PageContainer>
  );
};

// PropTypes 정의
HiddenJsonModule.propTypes = {
  // 현재는 props를 받지 않으므로 빈 객체
};

export default HiddenJsonModule;
