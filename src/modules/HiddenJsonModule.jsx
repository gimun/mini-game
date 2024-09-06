import { useCallback, useState, useMemo } from 'react';
import DataFilteredDisplay from '../components/DataFilteredDisplay.jsx';
import missionData from '../../public/mock-data/hidden/mission_data.json';
import { SORT } from '../constants/Keys.js';

const HiddenJsonModule = () => {
    const [data] = useState(missionData);
    const [config, setConfig] = useState({
        sort: { key: 'mission_id', direction: SORT.DESC },
        search: { term: '', placeholder: '보상' }
    });

    // 필터 상태를 배열로 관리하여 여러 선택이 가능하게 설정
    const [filters, setFilters] = useState({
        reward_type: [],
        game_name: []
    });

    // 필터 가능한 보상 분류와 게임 이름 목록을 배열로 관리
    const rewardTypes = ['스킨', '코스튬', '캐릭터'];
    const gameNames = ['뚫어뚫어', '뿌려뿌려', '뛰어말어', '높이높이', '넘어넘어'];

    const columns = useMemo(() => [
        { key: 'mission_id', label: 'No.', flex: 1, align: 'center', type: 'number', isKey: true },
        { key: 'reward_type', label: '분류', flex: 1, align: 'center', type: 'string' },
        { key: 'game_name', label: '게임', flex: 1, align: 'center', type: 'string' },
        { key: 'emblem', label: '칭호', flex: 1, align: 'center', type: 'string' },
        { key: 'reward', label: '보상', flex: 1, align: 'center', type: 'string' },
        { key: 'mission', label: '미션', flex: 1, align: 'center', type: 'string' },
    ], []);

    const handleSort = useCallback((key) => {
        setConfig(prevConfig => {
            const newDirection = prevConfig.sort.key === key && prevConfig.sort.direction === SORT.ASC ? SORT.DESC : SORT.ASC;
            return {
                ...prevConfig,
                sort: { key, direction: newDirection }
            };
        });
    }, []);

    const handleSearchChange = useCallback((e) => {
        setConfig(prevConfig => ({
            ...prevConfig,
            search: { ...prevConfig.search, term: e.target.value }
        }));
    }, []);

    // 체크박스 변경 처리 함수
    const handleCheckboxChange = useCallback((e) => {
        const { name, value } = e.target;
        setFilters(prevFilters => {
            const isChecked = e.target.checked;
            const currentValues = prevFilters[name];

            // 체크된 경우 배열에 추가하고, 체크 해제된 경우 배열에서 제거
            const newValues = isChecked
                ? [...currentValues, value]
                : currentValues.filter(val => val !== value);

            return {
                ...prevFilters,
                [name]: newValues
            };
        });
    }, []);

    // 필터와 검색어 적용된 데이터
    const filteredAndSortedData = useMemo(() => {
        return data
            // 검색 필터링
            .filter(item => item['reward']?.toString().toLowerCase().includes(config.search.term.toLowerCase()))
            // reward_type 필터링 (선택된 것이 없으면 필터를 건너뜀)
            .filter(item => (filters.reward_type.length === 0 || filters.reward_type.includes(item.reward_type)))
            // game_name 필터링 (선택된 것이 없으면 필터를 건너뜀)
            .filter(item => (filters.game_name.length === 0 || filters.game_name.includes(item.game_name)))
            // 정렬
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
            {/* 필터 UI - 반복문을 통한 렌더링 */}
            <div>
                <fieldset>
                    <legend>보상 분류</legend>
                    {rewardTypes.map(type => (
                        <label key={type}>
                            <input
                                type="checkbox"
                                name="reward_type"
                                value={type}
                                checked={filters.reward_type.includes(type)}
                                onChange={handleCheckboxChange}
                            />
                            {type}
                        </label>
                    ))}
                </fieldset>

                <fieldset>
                    <legend>게임 이름</legend>
                    {gameNames.map(name => (
                        <label key={name}>
                            <input
                                type="checkbox"
                                name="game_name"
                                value={name}
                                checked={filters.game_name.includes(name)}
                                onChange={handleCheckboxChange}
                            />
                            {name}
                        </label>
                    ))}
                </fieldset>
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
