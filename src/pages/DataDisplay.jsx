import PropTypes from 'prop-types';
import {COLUMNS, LABELS, SORT} from '../constants/Keys.js';
import {
    Container,
    TableWrapper,
    Table,
    TableHeader,
    TableData,
    TableRow,
    SortIcon,
    SearchContainer
} from '../styles/CommonStyles';
import {FaSortUp, FaSortDown, FaSort} from 'react-icons/fa';

const DataDisplay = (
    {
        data,
        onSort,
        config,
        onSearchChange
    }) => {
    const columns = [
        {key: COLUMNS.RANK, label: LABELS[COLUMNS.RANK], flex: 1, align: 'center'},
        {key: COLUMNS.NAME, label: LABELS[COLUMNS.NAME], flex: 4, align: 'center'},
        {key: COLUMNS.ROLE, label: LABELS[COLUMNS.ROLE], flex: 2, align: 'center'},
        {key: COLUMNS.TOTAL_SCORE, label: LABELS[COLUMNS.TOTAL_SCORE], flex: 3, align: 'center'}
    ];

    const getSortIcon = (columnKey) => {
        if (config.sort.key !== columnKey) {
            return <SortIcon active={false}><FaSort/></SortIcon>;
        }

        return config.sort.direction === SORT.ASC
            ? <SortIcon active><FaSortUp/></SortIcon>
            : <SortIcon active><FaSortDown/></SortIcon>;
    };

    const formatNumber = (number) => {
        const safeNumber = (number != null && !isNaN(number)) ? number : 0;
        return new Intl.NumberFormat().format(safeNumber);
    };

    return (
        <Container>
            <TableWrapper>
                <SearchContainer>
                    <input
                        type="text"
                        value={config.search.term}
                        onChange={onSearchChange}
                        placeholder={`Search by ${LABELS[COLUMNS.NAME]}`}
                    />
                </SearchContainer>
                <Table>
                    <thead>
                    <tr>
                        {columns.map(col => (
                            <TableHeader
                                key={col.key}
                                onClick={() => onSort(col.key)}
                                flex={col.flex}  /* flex 비율을 설정 */
                            >
                                {col.label}
                                {getSortIcon(col.key)}
                            </TableHeader>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {data.map(item => (
                        <TableRow key={item[COLUMNS.ID]}>
                            {columns.map(col => (
                                <TableData key={col.key} align={col.align}>
                                    {col.key === COLUMNS.TOTAL_SCORE
                                        ? formatNumber(item[col.key])
                                        : item[col.key]}
                                </TableData>
                            ))}
                        </TableRow>
                    ))}
                    </tbody>
                </Table>
            </TableWrapper>
        </Container>
    );
};

// PropTypes validation
DataDisplay.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            [COLUMNS.ID]: PropTypes.string.isRequired,
            [COLUMNS.NAME]: PropTypes.string.isRequired,
            [COLUMNS.ROLE]: PropTypes.string.isRequired,
            [COLUMNS.TOTAL_SCORE]: PropTypes.number.isRequired,
            [COLUMNS.RANK]: PropTypes.number
        })
    ).isRequired,
    onSort: PropTypes.func.isRequired,
    config: PropTypes.shape({
        sort: PropTypes.shape({
            key: PropTypes.string.isRequired,
            direction: PropTypes.string.isRequired
        }).isRequired,
        search: PropTypes.shape({
            term: PropTypes.string.isRequired
        }).isRequired
    }).isRequired,
    onSearchChange: PropTypes.func.isRequired
};

export default DataDisplay;
