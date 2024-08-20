import PropTypes from 'prop-types';
import {SORT} from '../constants/Keys.js';
import {FaSort, FaSortDown, FaSortUp} from 'react-icons/fa';
import {
    Container,
    HighlightValue,
    InfoContainer,
    SearchContainer,
    SortIcon,
    Table,
    TableData,
    TableHeader,
    TableRow,
    TableWrapper
} from '../styles/CommonStyles';

const DataDisplay = (props) => {
    const {data, columns, onSort, config, onSearchChange} = props;

    const keyColumn = columns.find(col => col.isKey);

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
                    <InfoContainer>
                        <HighlightValue>{data.length}</HighlightValue> / 50
                    </InfoContainer>
                    <input
                        type="text"
                        value={config.search.term}
                        onChange={onSearchChange}
                        placeholder={`Search by ${config.search.placeholder}`}
                    />
                </SearchContainer>
                <Table>
                    <thead>
                    <tr>
                        {columns.map(col => (
                            col !== keyColumn && (
                                <TableHeader
                                    key={col.key}
                                    onClick={() => onSort(col.key)}
                                    flex={col.flex}
                                >
                                    {col.label}
                                    {getSortIcon(col.key)}
                                </TableHeader>
                            )
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {data.map(item => (
                        <TableRow key={item[keyColumn.key]}>  {/* keyColumn 을 사용 */}
                            {columns.map(col => (
                                col !== keyColumn ? (
                                    <TableData key={col.key} align={col.align}>
                                        {col.type === 'number'
                                            ? formatNumber(item[col.key])
                                            : item[col.key]}
                                    </TableData>
                                ) : null
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
        PropTypes.object.isRequired
    ).isRequired,
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            flex: PropTypes.number.isRequired,
            align: PropTypes.string,
            type: PropTypes.string.isRequired,
            isKey: PropTypes.bool
        })
    ).isRequired,
    onSort: PropTypes.func.isRequired,
    config: PropTypes.shape({
        sort: PropTypes.shape({
            key: PropTypes.string.isRequired,
            direction: PropTypes.string.isRequired
        }).isRequired,
        search: PropTypes.shape({
            term: PropTypes.string,
            placeholder: PropTypes.string
        })
    }).isRequired,
    onSearchChange: PropTypes.func.isRequired
};

// 기본값 설정
DataDisplay.defaultProps = {
    config: {
        search: {
            term: '',
            placeholder: ''
        }
    }
};

export default DataDisplay;
