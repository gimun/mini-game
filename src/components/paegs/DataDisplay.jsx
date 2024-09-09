import PropTypes from 'prop-types';
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
    TableWrapper,
    SearchInput
} from '../../styles/CommonStyles.jsx';

// 수정된 TableHeader, TableData에서 $로 변경하여 transient props로 처리
const DataDisplay = (props) => {
    const {data, columns, onSort, config, onSearchChange} = props;

    const keyColumn = columns.find(col => col.isKey);

    const getSortIcon = (columnKey) => {
        if (config.sort.key !== columnKey) {
            return <SortIcon $active={false}><FaSort/></SortIcon>; // $active로 변경
        }

        return config.sort.direction === 'ASC'
            ? <SortIcon $active><FaSortUp/></SortIcon>
            : <SortIcon $active><FaSortDown/></SortIcon>;
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
                    <SearchInput
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
                                    $flex={col.flex}  // $flex로 변경
                                >
                                    {col.label}
                                    {getSortIcon(col.key)}
                                </TableHeader>
                            )
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((item, index) => (  // key에 index 추가하여 고유하게 만듦
                        <TableRow key={`${item[keyColumn.key]}-${index}`}>
                            {columns.map(col => (
                                col !== keyColumn ? (
                                    <TableData key={`${col.key}-${item[keyColumn.key]}-${index}`} $align={col.align}>
                                        {col.type === 'number' ? formatNumber(item[col.key]) : item[col.key]}
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

export default DataDisplay;
