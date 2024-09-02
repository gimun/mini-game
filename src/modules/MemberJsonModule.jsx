import {useCallback, useEffect, useState, useMemo} from 'react';
import DataDisplay from '../components/DataDisplay.jsx';
import {calculateRankings} from '../utils/dataUtils.js';
import memberData from '../../public/mock-data/member/member_20240902.json';
import {COLUMNS, LABELS, SORT} from '../constants/Keys.js';
import {getMemberName} from '../utils/memberHelper.js';

const MemberModule = () => {
    const [data, setData] = useState([]);
    const [config, setConfig] = useState({
        sort: {key: COLUMNS.TOTAL_SCORE, direction: SORT.DESC},
        search: {term: '', placeholder: LABELS[COLUMNS.NAME] || 'Name'}
    });

    const columns = useMemo(() => [
        {key: COLUMNS.MEMBER_ID, label: '', flex: 1, align: 'center', type: 'string', isKey: true},
        {key: COLUMNS.RANK, label: LABELS[COLUMNS.RANK], flex: 1, align: 'center', type: 'number'},
        {key: COLUMNS.NAME, label: LABELS[COLUMNS.NAME], flex: 4, align: 'center', type: 'string'},
        {key: COLUMNS.ROLE, label: LABELS[COLUMNS.ROLE], flex: 3, align: 'center', type: 'string'},
        {key: COLUMNS.TOTAL_SCORE, label: LABELS[COLUMNS.TOTAL_SCORE], flex: 4, align: 'center', type: 'number'}
    ], []);

    useEffect(() => {
        const enrichedData = memberData.map(item => ({
            ...item,
            [COLUMNS.NAME]: getMemberName(item[COLUMNS.MEMBER_ID])
        }));

        const rankedData = calculateRankings(enrichedData, COLUMNS.TOTAL_SCORE);
        setData(rankedData);
    }, []);

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

    const filteredAndSortedData = useMemo(() => {

        return data
            .filter(item => item[COLUMNS.NAME]?.toString().toLowerCase().includes(config.search.term.toLowerCase()))
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

export default MemberModule;
