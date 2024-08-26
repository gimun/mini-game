import {useCallback, useState, useEffect} from 'react';
import DataDisplay from '../components/DataDisplay.jsx';
import {COLUMNS, LABELS, SORT} from '../constants/Keys.js';
import historyData from '../mock-data/clan_war_20240819.json';
import {getMemberName} from '../utils/memberHelper.js';

const BattleJsonModule = () => {
    const [data, setData] = useState(historyData);
    const [config, setConfig] = useState({
        sort: {key: COLUMNS.SCORE, direction: SORT.DESC},
        search: {term: '', placeholder: LABELS[COLUMNS.NAME] || 'Name'}
    });

    // UseEffect to set the name value based on member_id when the component mounts
    useEffect(() => {
        const updatedData = data.map(item => ({
            ...item,
            [COLUMNS.NAME]: getMemberName(item[COLUMNS.MEMBER_ID]) // Set the name using getMemberName
        }));
        setData(updatedData);
    }, []);  // Add an empty dependency array to run the effect only once on mount

    const columns = [
        {key: COLUMNS.MEMBER_ID, label: "", flex: 1, align: 'center', type: 'number', isKey: true},
        {key: COLUMNS.RANK, label: LABELS[COLUMNS.RANK], flex: 1, align: 'center', type: 'number'},
        {key: COLUMNS.NAME, label: LABELS[COLUMNS.NAME], flex: 4, align: 'center', type: 'string'},
        {key: COLUMNS.SCORE, label: LABELS[COLUMNS.SCORE], flex: 4, align: 'center', type: 'number'}
    ];

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

    const sortedDataList = [...data].sort((a, b) => {
        if (config.sort.key) {
            const aValue = a[config.sort.key];
            const bValue = b[config.sort.key];

            if (aValue < bValue) return config.sort.direction === SORT.ASC ? -1 : 1;
            if (aValue > bValue) return config.sort.direction === SORT.ASC ? 1 : -1;
        }
        return 0;
    });

    const filteredData = sortedDataList.filter(item =>
        item[COLUMNS.NAME]?.toString().toLowerCase().includes(config.search.term.toLowerCase())
    );

    return (
        <>
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

export default BattleJsonModule;
