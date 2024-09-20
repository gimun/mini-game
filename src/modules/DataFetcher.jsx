// src/components/DataFetcher.jsx
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase.cjs';
import PropTypes from 'prop-types';

const DataFetcher = ({ collectionName, onDataFetched }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, collectionName));
                const dataList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                onDataFetched(dataList);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData().then(() => {
            console.log('Data fetching completed');
        }).catch(err => {
            console.error('Error during fetchData:', err);
        });
    }, [collectionName, onDataFetched]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return null;
};

// PropTypes validation
DataFetcher.propTypes = {
    collectionName: PropTypes.string.isRequired,
    onDataFetched: PropTypes.func.isRequired
};

export default DataFetcher;
