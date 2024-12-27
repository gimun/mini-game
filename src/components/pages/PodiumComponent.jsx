import styled from 'styled-components';
import cat1 from '../../assets/images/podium/cat-1.webp';
import cat2 from '../../assets/images/podium/cat-2.webp';
import cat3 from '../../assets/images/podium/cat-3.webp';

const Podium = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 500px;
  width: 100%;
  margin-top: 100px;
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 10px;
`;

const PodiumStep = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  margin: 0 10px;
  background-color: ${({ color }) => color || '#ddd'};
  width: ${({ width }) => width || '80px'};
  height: ${({ height }) => height || '150px'};
  border-radius: 10px;
  text-align: center;
  border: 3px solid #ffffff;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  padding-top: 50px; /* 이미지와 시상대 간 여백 */
`;

const Name = styled.div`
  position: absolute;
  top: -40px; /* 이름이 이미지 위로 올라오도록 설정 */
  font-size: 14px;
  font-weight: bold;
  color: #333;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 5px 10px;
  border-radius: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const Image = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 3px solid #fff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: -30px; /* 이미지를 시상대 위로 올림 */
`;

const RankBadge = styled.div`
  position: absolute;
  top: 10px; /* 배지가 시상대 상단에 표시되도록 조정 */
  background-color: ${({ badgeColor }) => badgeColor || '#000'};
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 15px;
  border: 2px solid #fff;
`;

// eslint-disable-next-line react/prop-types
const PodiumComponent = ({ podiumData }) => {
  return (
    <Podium>
      {/* eslint-disable-next-line react/prop-types */}
      {podiumData.map((step, index) => (
        <PodiumStep
          key={index}
          color={step.color}
          height={step.height}
          width={step.width}
        >
          <Image src={step.image} alt={`${step.name}'s avatar`} />
          <Name>{step.name}</Name>
          <RankBadge badgeColor={step.color}>{index + 1}등</RankBadge>
        </PodiumStep>
      ))}
    </Podium>
  );
};

export default function App() {
  const podiumData = [
    {
      name: '왕떡이는 야옹',
      image: cat2,
      color: '#c0c0c0',
      height: '200px',
      width: '100px',
    },
    {
      name: '무니는 야옹',
      image: cat1,
      color: '#ffd700',
      height: '250px',
      width: '120px',
    },
    {
      name: '유디는 야옹',
      image: cat3,
      color: '#cd7f32',
      height: '180px',
      width: '80px',
    },
  ];

  // 2등, 1등, 3등 순서로 정렬
  const sortedPodiumData = [podiumData[0], podiumData[1], podiumData[2]];

  return <PodiumComponent podiumData={sortedPodiumData} />;
}
