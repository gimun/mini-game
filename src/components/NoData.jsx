import styled from 'styled-components';
import PropTypes from 'prop-types';

// 재사용 가능한 NoData 컴포넌트
const NoDataContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: ${({height}) => height || '50vh'}; /* 기본적으로 50vh 사용 */
    text-align: center;
    font-size: ${({fontSize}) => fontSize || '18px'};
    color: ${({color}) => color || '#666'};
    font-weight: bold;

    @media (max-width: 600px) {
        font-size: ${({mobileFontSize}) => mobileFontSize || '16px'}; /* 모바일에서 폰트 크기 조정 */
        height: ${({mobileHeight}) => mobileHeight || '40vh'}; /* 모바일에서 높이 조정 */
    }
`;

const NoData = ({
                    message = '조회된 데이터가 없습니다.',
                    height,
                    fontSize,
                    color,
                    mobileHeight,
                    mobileFontSize
                }) => {
    return (
        <NoDataContainer
            height={height}
            fontSize={fontSize}
            color={color}
            mobileHeight={mobileHeight}
            mobileFontSize={mobileFontSize}
        >
            {message}
        </NoDataContainer>
    );
};

// PropTypes 설정
NoData.propTypes = {
    message: PropTypes.string,
    height: PropTypes.string,
    fontSize: PropTypes.string,
    color: PropTypes.string,
    mobileHeight: PropTypes.string,
    mobileFontSize: PropTypes.string,
};

export default NoData;
