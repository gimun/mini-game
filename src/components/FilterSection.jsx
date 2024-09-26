// src/components/FilterSection.jsx
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { media } from './atoms/styles/media.js';

// 필터 필드셋 스타일 (공통)
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
    font-size: 12px;
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
    font-size: 12px;
    color: ${({ theme }) => theme.colors.error};
    cursor: pointer;
  }

  ${media.mobile`
    font-size: 12px;
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
    font-size: 13px;
  `}
`;

const FilterSection = ({
  title,
  filters,
  filterOptions,
  filterName,
  isVisible,
  toggleVisibility,
  handleCheckboxChange,
  clearSingleFilter,
}) => {
  return (
    <FilterFieldset>
      <legend>
        <ClearButton
          onClick={toggleVisibility}
          aria-expanded={isVisible}
          aria-controls={`${filterName}-filter-group`}
        >
          {title} {isVisible ? '▲' : '▼'}
        </ClearButton>
      </legend>
      {filters.length > 0 && (
        <SelectedFilters>
          {filters.map((filter) => (
            <FilterTag key={filter}>
              {filter}
              <FaTimes
                onClick={() => clearSingleFilter(filterName, filter)}
                aria-label={`Remove filter ${filter}`}
              />
            </FilterTag>
          ))}
        </SelectedFilters>
      )}
      <CheckboxGroup id={`${filterName}-filter-group`} $isVisible={isVisible}>
        {filterOptions.map((option) => (
          <CheckboxLabel key={option}>
            <input
              type="checkbox"
              name={filterName}
              value={option}
              checked={filters.includes(option)}
              onChange={handleCheckboxChange}
              aria-label={`Filter by ${filterName} ${option}`}
            />
            {option}
          </CheckboxLabel>
        ))}
      </CheckboxGroup>
    </FilterFieldset>
  );
};

FilterSection.propTypes = {
  title: PropTypes.string.isRequired,
  filters: PropTypes.arrayOf(PropTypes.string).isRequired,
  filterOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  filterName: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  toggleVisibility: PropTypes.func.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
  clearSingleFilter: PropTypes.func.isRequired,
};

export default FilterSection;
