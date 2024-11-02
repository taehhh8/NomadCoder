import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { fetchDisneyCharc } from '../api';
import { Link } from 'react-router-dom';

const Container = styled.div`

`;

const Header = styled.header`
  margin-bottom: 80px;
`;

const CharacterList = styled.ul`
  display:flex;
  flex-wrap:wrap;
`;

const Character = styled.li`
  width:25%;
  height: 300px;
  display:flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  a{
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width:100%;
    height: 100%;
    transition: all, 0.3s;
    border-radius: 20px;
    &:hover{
      background-color:${(props) => props.theme.textColor};
      color:${(props) => props.theme.bgColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 50px;
  text-align: center;
  margin-top:80px;
`;

const Img = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 150px;
  margin-bottom: 20px;
`;

const Name = styled.span`
  display:block;
  font-size: 24px;
`;

function Main() {
  const { isLoading, data } = useQuery(
    ['allDisneyCharacters'],
    fetchDisneyCharc
  );
  return (
    <Container>
      <Header>
        <Title>Disney Characters</Title>
      </Header>
      {isLoading ? (
        'Loading...'
      ) : (
        <CharacterList>
          {data?.slice(0, 100).map((char) => (
            <Character key={char.id}>
              <Link to={`/detail/${char.id}`}>
                <Img src={char.imageUrl} alt={char.name} />
                <Name>{char.name}</Name>
              </Link>
            </Character>
          ))}
        </CharacterList>
      )}
    </Container>
  );
}

export default Main;
