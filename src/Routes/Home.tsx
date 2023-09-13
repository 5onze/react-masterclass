import { useQuery } from "@tanstack/react-query";
import { styled } from "styled-components";
import getMovies from "api";
import makeImagePath from "utilities";

const Wrapper = styled.div`
  background: black;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 28px;
  width: 50%;
`;

function Home() {
  const { data, isLoading } = useQuery(["movies", "nowPlaying"], getMovies);
  console.log(data, isLoading);
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner bgPhoto={makeImagePath(data?.results[5].backdrop_path || "")}>
            <Title>{data?.results[5].title}</Title>
            <Overview>{data?.results[5].overview}</Overview>
          </Banner>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
