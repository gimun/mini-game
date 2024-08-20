import {useCallback, useEffect, useState} from 'react';
import DataFetcher from '../components/DataFetcher.jsx';
import DataDisplay from './DataDisplay.jsx';
import {calculateRankings} from '../utils/dataUtils.js';
import {COLLECTIONS, COLUMNS, SORT} from '../constants/Keys.js';

const UserManager = () => {
    const [data, setData] = useState([]);
    const [sortedData, setSortedData] = useState([]);
    const [config, setConfig] = useState({
        sort: {key: COLUMNS.TOTAL_SCORE, direction: SORT.DESC},
        search: {term: ''}
    });

    // Add ranking to the data when it is first fetched
    useEffect(() => {
        if (data.length > 0) {
            const rankedData = calculateRankings(data, COLUMNS.TOTAL_SCORE);
            setSortedData(rankedData);
        }
    }, [data]);

    // Sorting function
    const handleSort = useCallback((key) => {
        setConfig(prevConfig => {
            if (!prevConfig) {
                return {
                    sort: {key, direction: SORT.ASC},
                    search: {term: ''}
                };
            }

            const newDirection = prevConfig.sort.key === key && prevConfig.sort.direction === SORT.ASC ? SORT.DESC : SORT.ASC;
            return {
                ...prevConfig,
                sort: {key, direction: newDirection}
            };
        });
    }, []);

    // Search Change Handler
    const handleSearchChange = useCallback((e) => {
        setConfig(prevConfig => {
            if (!prevConfig) {
                return {
                    sort: {key: COLUMNS.TOTAL_SCORE, direction: SORT.DESC},
                    search: {term: e.target.value}
                };
            }

            return {
                ...prevConfig,
                search: {...prevConfig.search, term: e.target.value}
            };
        });
    }, []);

    // Sorting and Filtering
    const sortedDataList = [...sortedData].sort((a, b) => {
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
            <DataFetcher collectionName={COLLECTIONS.MEMBER} onDataFetched={setData}/>
            <DataDisplay
                data={filteredData}
                onSort={handleSort}
                config={config}
                onSearchChange={handleSearchChange}
            />
        </>
    );
};

export default UserManager;
