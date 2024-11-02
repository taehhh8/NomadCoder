import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { wantToVisitState, visitedState, favoriteState } from "./countryState";

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 20px;
`;

const ListItem = styled.li`
  margin-bottom: 10px;
  background: linear-gradient(135deg, #333, #444);
  padding: 15px;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: transform 0.2s;
  color: #fff;

  &:hover {
    transform: scale(1.02);
  }
`;

const Button = styled.button`
  margin-left: 10px;
  padding: 5px 15px;
  border: none;
  border-radius: 6px;
  background: linear-gradient(135deg, #32cd32, #228b22);
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;

  &:hover {
    background: linear-gradient(135deg, #228b22, #006400);
    transform: scale(1.05);
  }
`;

function CountryLists() {
  const [wantToVisit, setWantToVisit] = useRecoilState(wantToVisitState);
  const [visited, setVisited] = useRecoilState(visitedState);
  const [favorite, setFavorite] = useRecoilState(favoriteState);

  const moveCountry = (fromList, toList, country) => {
    fromList((prev) => {
      const updatedList = prev.filter((c) => c !== country);
      localStorage.setItem(fromList.key, JSON.stringify(updatedList));
      return updatedList;
    });
    toList((prev) => {
      const updatedList = [...prev, country];
      localStorage.setItem(toList.key, JSON.stringify(updatedList));
      return updatedList;
    });
  };

  return (
    <div>
      <h2 style={{ color: "#ff7f50" }}>내가 가고싶은 나라들</h2>
      <List>
        {wantToVisit.map((country) => (
          <ListItem key={country}>
            {country}
            <div>
              <Button onClick={() => moveCountry(setWantToVisit, setVisited, country)}>Move to Visited</Button>
              <Button
                onClick={() =>
                  setWantToVisit((prev) => {
                    const updatedList = prev.filter((c) => c !== country);
                    localStorage.setItem("wantToVisit", JSON.stringify(updatedList));
                    return updatedList;
                  })
                }
              >
                Remove
              </Button>
            </div>
          </ListItem>
        ))}
      </List>

      <h2 style={{ color: "#32cd32" }}>내가 가본 나라들</h2>
      <List>
        {visited.map((country) => (
          <ListItem key={country}>
            {country}
            <div>
              <Button onClick={() => moveCountry(setVisited, setWantToVisit, country)}>Move to Want to Visit</Button>
              <Button onClick={() => moveCountry(setVisited, setFavorite, country)}>Move to Favorite</Button>
            </div>
          </ListItem>
        ))}
      </List>

      <h2 style={{ color: "#1e90ff" }}>내가 좋아하는 나라들</h2>
      <List>
        {favorite.map((country) => (
          <ListItem key={country}>
            {country}
            <Button onClick={() => moveCountry(setFavorite, setVisited, country)}>Move to Visited</Button>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default CountryLists;
