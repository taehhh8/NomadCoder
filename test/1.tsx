import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { fetchDisneyCharcId } from '../api';

const Container = styled.div`
  margin: 100px auto;
  display:flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  a{
    margin-bottom: 20px;
    font-size: 30px;
  }
`;

const Thumbnail = styled.img`
  width: 400px;
  height: 400px;
  margin-bottom: 50px;
`;

const Name = styled.span`
  display:block;
  font-size: 68px;
  margin-bottom: 50px;
`;

const Films = styled.ul`
 display:flex;
 justify-content: center;
 flex-wrap: wrap;
 gap:20px;
 width:600px
`;

const Film = styled.li`
  display:block;
  font-size: 32px;
  background-color:${(props) => props.theme.textColor};
  color:${(props) => props.theme.bgColor};
  padding: 10px;
  border-radius: 20px;
`;

function Detail() {
  const { id } = useParams();
  const { isLoading, data } = useQuery([id], () => fetchDisneyCharcId(id));

  return (
    <Container>
      {isLoading ? (
        'Loading...'
      ) : (
        <>
          <Link to={'/'}> &larr;</Link>
          <Thumbnail src={data.imageUrl ?? DefaultImgUrl} alt={data.name} />
          <Name>{data.name}</Name>
          <Films>
            {data?.films.map((film) => (
              <Film>{film}</Film>
            ))}
          </Films>
        </>
      )}
    </Container>
  );
}

export default Detail;
