// src/modules/HiddenJsonModuleBase.jsx
import PropTypes from 'prop-types';
import { FaSync, FaSearch } from 'react-icons/fa'; // 검색 아이콘 추가
import DataFilteredDisplay from '../components/pages/DataFilteredDisplay.jsx';
import Footer from '../components/Footer.jsx';
import useFilterSort from '../hooks/useFilterSort.js';
import FilterSection from '../components/FilterSection.jsx';
import styled from 'styled-components';
import { media } from '../components/atoms/styles/media.js';
import {
  SearchButton,
  SearchContainer,
  SearchInput, // 추가된 부분
} from '../components/atoms/styles/CommonStyles.jsx'; // 스타일 컴포넌트 import

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
    font-size: 13px;
  `}
`;

const HiddenJsonModuleBase = ({ missionData, showFooter = false }) => {
  const {
    config,
    filters,
    rewardTypes,
    gameNames,
    columns,
    filteredAndSortedData,
    handleSort,
    handleSearchInputChange,
    triggerSearch,
    handleCheckboxChange,
    clearSingleFilter,
    clearAllFilters,
    isRewardFilterVisible,
    setIsRewardFilterVisible,
    isGameNameFilterVisible,
    setIsGameNameFilterVisible,
    searchInput,
  } = useFilterSort(missionData, [
    {
      key: 'mission_id',
      label: 'No.',
      align: 'center',
      type: 'number',
      isKey: true,
      minWidth: '50px',
    },
    {
      key: 'reward_type',
      label: '분류',
      align: 'center',
      type: 'string',
      minWidth: '100px',
    },
    {
      key: 'game_name',
      label: '게임',
      align: 'center',
      type: 'string',
      minWidth: '150px',
    },
    {
      key: 'emblem',
      label: '칭호',
      align: 'left',
      type: 'string',
      minWidth: '150px',
    },
    {
      key: 'reward',
      label: '보상',
      align: 'left',
      type: 'string',
      minWidth: '200px',
    },
    {
      key: 'mission',
      label: '미션',
      align: 'left',
      type: 'string',
      minWidth: '250px',
    },
  ]);

  return (
    <PageContainer>
      <MainContent>
        {/* 검색 섹션 */}
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder={config.search.placeholder}
            value={searchInput}
            onChange={handleSearchInputChange}
            onKeyDown={(e) => e.key === 'Enter' && triggerSearch()}
            aria-label="검색"
          />
          <SearchButton onClick={triggerSearch} aria-label="검색">
            <FaSearch />
          </SearchButton>
        </SearchContainer>

        {/* 보상 분류별 필터 */}
        <FilterSection
          title="보상 분류별 필터"
          filters={filters.reward_type}
          filterOptions={rewardTypes}
          filterName="reward_type"
          isVisible={isRewardFilterVisible}
          toggleVisibility={() => setIsRewardFilterVisible((prev) => !prev)}
          handleCheckboxChange={handleCheckboxChange}
          clearSingleFilter={clearSingleFilter}
        />

        {/* 게임별 필터 */}
        <FilterSection
          title="게임별 필터"
          filters={filters.game_name}
          filterOptions={gameNames}
          filterName="game_name"
          isVisible={isGameNameFilterVisible}
          toggleVisibility={() => setIsGameNameFilterVisible((prev) => !prev)}
          handleCheckboxChange={handleCheckboxChange}
          clearSingleFilter={clearSingleFilter}
        />

        {/* 모든 필터 초기화 버튼 */}
        <AllClearButton onClick={clearAllFilters} aria-label="모든 필터 초기화">
          필터 초기화 <FaSync />
        </AllClearButton>

        {/* 데이터 표시 */}
        <DataFilteredDisplay
          data={filteredAndSortedData}
          columns={columns}
          onSort={handleSort}
          config={config}
          searchTerm={config.search.term} // 검색어 전달
        />
      </MainContent>

      {/* Footer 조건부 렌더링 */}
      {showFooter && <Footer />}
    </PageContainer>
  );
};

// PropTypes 정의
HiddenJsonModuleBase.propTypes = {
  missionData: PropTypes.arrayOf(PropTypes.object).isRequired,
  showFooter: PropTypes.bool,
};

export default HiddenJsonModuleBase;
