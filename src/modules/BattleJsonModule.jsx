import { useCallback, useState, useEffect, useMemo } from 'react';
import Select from 'react-select';
import DataDisplay from '../components/pages/DataDisplay.jsx';
import { COLUMNS, LABELS, SORT } from '../constants/Keys.js';
import { getMemberNameWithDefault } from '../utils/memberHelper.jsx';
import {
  Container,
  FileSelectContainer,
  FileSelectLabel,
  LoadingMessage,
  ErrorMessage,
} from '../components/atoms/styles/SelectBoxStyles.jsx';
import { useTheme } from 'styled-components';

const generateFileOptions = (dates) => {
  return dates.map((date) => {
    const formattedDate = date.toISOString().slice(0, 10); // 'YYYY-MM-DD' 포맷
    const value = `battle_${formattedDate.replace(/-/g, '')}.json`; // 'battle_YYYYMMDD.json' 파일명 포맷
    return {
      label: formattedDate,
      value: value,
    };
  });
};

// 날짜 배열
const dates = [
  new Date('2024-11-17'),
  new Date('2024-11-10'),
  new Date('2024-11-03'),
  new Date('2024-10-27'),
  new Date('2024-10-20'),
  new Date('2024-10-13'),
  new Date('2024-10-06'),
  new Date('2024-09-29'),
  new Date('2024-09-22'),
  new Date('2024-09-15'),
  new Date('2024-09-08'),
  new Date('2024-09-01'),
  new Date('2024-08-25'),
  new Date('2024-08-18'),
  new Date('2024-08-11'),
  new Date('2024-08-04'),
  new Date('2024-07-28'),
  new Date('2024-07-21'),
  new Date('2024-07-14'),
];

// fileOptions 생성
const fileOptions = generateFileOptions(dates);

// JSON 데이터 로드 함수
const fetchData = async (file) => {
  const response = await fetch(`/mock-data/battle/${file}`);
  if (!response.ok) {
    throw new Error(`Failed to load file: ${file}`);
  }
  return response.json();
};

const BattleJsonModule = () => {
  const [selectedFile, setSelectedFile] = useState(fileOptions[0]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [config, setConfig] = useState({
    sort: { key: COLUMNS.SCORE, direction: SORT.DESC },
    search: { term: '', placeholder: LABELS[COLUMNS.NAME] || 'Name' },
  });

  const theme = useTheme();

  const customSelectStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: theme.colors.background,
      color: theme.colors.text,
      borderColor: theme.colors.border,
      padding: '6px 10px',
      borderRadius: '10px',
      boxShadow: 'none',
      transition: 'border-color 0.3s ease, background-color 0.3s ease, color 0.3s ease',
      '&:hover': {
        borderColor: theme.colors.primary,
      },
      '@media (max-width: 768px)': {
        fontSize: '14px',
        padding: '6px 8px',
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? theme.colors.primary : theme.colors.background,
      color: theme.colors.text,
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: theme.colors.background,
    }),
    singleValue: (provided) => ({
      ...provided,
      color: theme.colors.text,
    }),
  };

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const jsonData = await fetchData(selectedFile.value);
      const updatedData = jsonData.map((item) => ({
        ...item,
        [COLUMNS.NAME]: getMemberNameWithDefault(
          item[COLUMNS.MEMBER_ID],
          item[COLUMNS.NAME]
        ),
      }));
      setData(updatedData);
    } catch (error) {
      console.error('Error loading data:', error);
      setError(error.message);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [selectedFile]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const columns = useMemo(
    () => [
      {
        key: COLUMNS.MEMBER_ID,
        label: '',
        flex: 1,
        align: 'center',
        type: 'number',
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
        key: COLUMNS.SCORE,
        label: LABELS[COLUMNS.SCORE],
        flex: 4,
        align: 'center',
        type: 'number',
      },
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

  const filteredAndSortedData = useMemo(() => {
    return data
      .filter((item) =>
        item[COLUMNS.NAME]
          ?.toString()
          .toLowerCase()
          .includes(config.search.term.toLowerCase())
      )
      .sort((a, b) => {
        const aValue = a[config.sort.key];
        const bValue = b[config.sort.key];

        if (aValue < bValue) return config.sort.direction === SORT.ASC ? -1 : 1;
        if (aValue > bValue) return config.sort.direction === SORT.ASC ? 1 : -1;
        return 0;
      });
  }, [data, config]);

  const handleFileChange = (selectedOption) => {
    setSelectedFile(selectedOption);
  };

  return (
    <Container>
      <FileSelectContainer>
        <FileSelectLabel htmlFor="file-select"></FileSelectLabel>
        <Select
          id="file-select"
          options={fileOptions}
          value={selectedFile}
          onChange={handleFileChange}
          styles={customSelectStyles}
        />
      </FileSelectContainer>

      {loading ? (
        <LoadingMessage>Loading data...</LoadingMessage>
      ) : error ? (
        <ErrorMessage>Error: {error}</ErrorMessage>
      ) : (
        <DataDisplay
          data={filteredAndSortedData}
          columns={columns}
          onSort={handleSort}
          config={config}
          onSearchChange={handleSearchChange}
        />
      )}
    </Container>
  );
};

export default BattleJsonModule;