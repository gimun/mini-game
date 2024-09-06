import {useCallback, useState, useMemo} from 'react';
import DataFilteredDisplay from '../components/DataFilteredDisplay.jsx';
import missionData from '../../public/mock-data/hidden/mission_data.json';
import {SORT} from '../constants/Keys.js';
import {getAllGameNames} from '../utils/gameNameHelper';
import styled from 'styled-components';
import {FaTimes, FaSync} from 'react-icons/fa'; // 새로운 아이콘 가져오기

// 스타일 정의
const FilterFieldset = styled.fieldset`
    margin-bottom: 10px;
    margin-left: 10px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;

    legend {
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
    }

    @media (max-width: 600px) {
        legend {
            font-size: 14px;
        }
    }
`;

const SelectedFilters = styled.div`
    margin-bottom: 10px;
    font-size: 14px;
    color: #333;

    span {
        color: #6591bf;
        margin-right: 5px;
    }
`;

const FilterTag = styled.span`
    display: inline-flex;
    align-items: center;
    margin-right: 10px;
    cursor: pointer;
    color: #333;

    svg {
        margin-left: 5px;
        font-size: 12px; /* 아이콘 크기를 작게 설정 */
        color: #e14444; /* 빨간색 설정 */
        cursor: pointer;
    }
`;

const AllClearButton = styled.button`
    background: none;
    border: none;
    color: #0d52ac;
    cursor: pointer;
    font-size: 14px;
    display: flex;
    align-items: center;

    &:focus {
        outline: none;
    }

    svg {
        margin-left: 5px;
    }
`;

const ClearButton = styled.button`
    background: none;
    border: none;
    color: #0d52ac;
    cursor: pointer;
    font-size: 15px;
    margin-bottom: 10px; /* Clear 버튼을 상단에 배치하고 아래 여백 추가 */
    display: flex;
    align-items: center;

    &:focus {
        outline: none;
    }

    svg {
        margin-left: 5px;
    }
`;

const CheckboxLabel = styled.label`
    display: flex;
    align-items: center;
    margin-right: 15px;
    margin-bottom: 10px;

    input {
        margin-right: 5px;
    }

    @media (max-width: 600px) {
        margin-right: 10px;
        font-size: 14px;

        input {
            width: 20px;
            height: 20px;
        }
    }
`;

const CheckboxGroup = styled.div`
    display: ${({$isVisible}) => ($isVisible ? 'flex' : 'none')};
    flex-wrap: wrap;
`;

const HiddenJsonModule = () => {
    const [data] = useState(missionData);
    const [config, setConfig] = useState({
        sort: {key: 'mission_id', direction: SORT.DESC},
        search: {term: '', placeholder: '보상'}
    });

    const [filters, setFilters] = useState({
        reward_type: [],
        game_name: []
    });

    const [isRewardFilterVisible, setIsRewardFilterVisible] = useState(true);
    const [isGameNameFilterVisible, setIsGameNameFilterVisible] = useState(true);

    const rewardTypes = ['스킨', '코스튬', '캐릭터'];
    const gameNames = getAllGameNames();

    const columns = useMemo(() => [
        {key: 'mission_id', label: 'No.', flex: 1, align: 'center', type: 'number', isKey: true},
        {key: 'reward_type', label: '분류', flex: 1, align: 'center', type: 'string'},
        {key: 'game_name', label: '게임', flex: 1, align: 'center', type: 'string'},
        {key: 'emblem', label: '칭호', flex: 1, align: 'left', type: 'string'},
        {key: 'reward', label: '보상', flex: 1, align: 'left', type: 'string'},
        {key: 'mission', label: '미션', flex: 1, align: 'left', type: 'string'},
    ], []);

    const handleSort = useCallback((key) => {
        setConfig(prevConfig => {
            const newDirection = prevConfig.sort.key === key && prevConfig.sort.direction === SORT.ASC ? SORT.DESC : SORT.ASC;
            return {
                ...prevConfig,
                sort: {key, direction: newDirection}
            };
        });
    }, []);

    const handleSearchChange = useCallback((e) => {
        setConfig(prevConfig => ({
            ...prevConfig,
            search: {...prevConfig.search, term: e.target.value}
        }));
    }, []);

    const handleCheckboxChange = useCallback((e) => {
        const {name, value} = e.target;
        setFilters(prevFilters => {
            const isChecked = e.target.checked;
            const currentValues = prevFilters[name];

            const newValues = isChecked
                ? [...currentValues, value]
                : currentValues.filter(val => val !== value);

            return {
                ...prevFilters,
                [name]: newValues
            };
        });
    }, []);

    const clearSingleFilter = useCallback((name, value) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: prevFilters[name].filter(val => val !== value)
        }));
    }, []);

    const clearAllFilters = useCallback(() => {
        setFilters({
            reward_type: [],
            game_name: []
        });
    }, []);

    const filteredAndSortedData = useMemo(() => {
        return data
            .filter(item => item['reward']?.toString().toLowerCase().includes(config.search.term.toLowerCase()))
            .filter(item => (filters.reward_type.length === 0 || filters.reward_type.includes(item.reward_type)))
            .filter(item => (filters.game_name.length === 0 || filters.game_name.includes(item.game_name)))
            .sort((a, b) => {
                const aValue = a[config.sort.key];
                const bValue = b[config.sort.key];

                if (aValue < bValue) return config.sort.direction === SORT.ASC ? -1 : 1;
                if (aValue > bValue) return config.sort.direction === SORT.ASC ? 1 : -1;
                return 0;
            });
    }, [data, config, filters]);

    return (
        <>
            <div>
                <FilterFieldset>
                    <legend onClick={() => setIsRewardFilterVisible(!isRewardFilterVisible)}>
                        <ClearButton>
                            보상 분류 {isRewardFilterVisible ? ' ▲' : ' ▼'}
                        </ClearButton>
                    </legend>
                    {filters.reward_type.length > 0 && (
                        <SelectedFilters>
                            {filters.reward_type.map(type => (
                                <FilterTag key={type}>
                                    {type}
                                    <FaTimes onClick={() => clearSingleFilter('reward_type', type)}/>
                                </FilterTag>
                            ))}
                        </SelectedFilters>
                    )}
                    <CheckboxGroup $isVisible={isRewardFilterVisible}>
                        {rewardTypes.map(type => (
                            <CheckboxLabel key={type}>
                                <input
                                    type="checkbox"
                                    name="reward_type"
                                    value={type}
                                    checked={filters.reward_type.includes(type)}
                                    onChange={handleCheckboxChange}
                                />
                                {type}
                            </CheckboxLabel>
                        ))}
                    </CheckboxGroup>
                </FilterFieldset>

                <FilterFieldset>
                    <legend onClick={() => setIsGameNameFilterVisible(!isGameNameFilterVisible)}>

                        <ClearButton>
                            게임 이름 {isGameNameFilterVisible ? ' ▲' : ' ▼'}
                        </ClearButton>
                    </legend>
                    {filters.game_name.length > 0 && (
                        <SelectedFilters>
                            {filters.game_name.map(name => (
                                <FilterTag key={name}>
                                    {name}
                                    <FaTimes onClick={() => clearSingleFilter('game_name', name)}/>
                                </FilterTag>
                            ))}
                        </SelectedFilters>
                    )}
                    <CheckboxGroup $isVisible={isGameNameFilterVisible}>
                        {gameNames.map(name => (
                            <CheckboxLabel key={name}>
                                <input
                                    type="checkbox"
                                    name="game_name"
                                    value={name}
                                    checked={filters.game_name.includes(name)}
                                    onChange={handleCheckboxChange}
                                />
                                {name}
                            </CheckboxLabel>
                        ))}
                    </CheckboxGroup>
                </FilterFieldset>

                <AllClearButton onClick={clearAllFilters}>
                    모든 필터 초기화 <FaSync/>
                </AllClearButton>
            </div>

            <DataFilteredDisplay
                data={filteredAndSortedData}
                columns={columns}
                onSort={handleSort}
                config={config}
                onSearchChange={handleSearchChange}
            />
        </>
    );
};

export default HiddenJsonModule;
