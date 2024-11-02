import { atom } from "recoil";

export const wantToVisitState = atom<string[]>({
  key: "wantToVisitState",
  default: JSON.parse(localStorage.getItem("wantToVisit") || "[]"),
});

export const visitedState = atom<string[]>({
  key: "visitedState",
  default: JSON.parse(localStorage.getItem("visited") || "[]"),
});

export const favoriteState = atom<string[]>({
  key: "favoriteState",
  default: JSON.parse(localStorage.getItem("favorite") || "[]"),
});
