// polymorphism 다형성 여러가지 구조들 여러가지 모양
// 타입스크립트에서 함수들은 2~3개의 parameter를 가질 수 있음
//concrete type - number, boolean, string, void, undefined, null, ...
// generic type - placeholder type

//call signature
type SuperPrint = {
  (arr: number[]): void; // call signature
  (arr: boolean[]): void; // call signature
  (arr: string[]): void; // call signature
  (arr: (number | boolean | string)[]): void; // call signature
};

// 첫번째 조건인 배열을 받아서 그배열의 요소를 썻다.
const superPrint: SuperPrint = (arr) => {
  arr.forEach((i) => console.log(i));
};

superPrint([1, 2, 3, 4]);
superPrint([true, false, true]);
superPrint(["a", "b", "c"]);
superPrint([1, 2, true, "a"]);

//generic type
// generic은 내가 요구한대로 call signature를 만들어줌
type SuperPrint1 = {
  <TypePlaceholder>(arr: TypePlaceholder[]): TypePlaceholder;
};

//T는 타입스크립트가 알아서 타입을 추론해줌 module이 많음 T
type SuperPrint2 = {
  <T>(arr: T[]): T;
};

const superPrint1: SuperPrint1 = (arr) => arr[0];

const a2 = superPrint1([1, 2, 3, 4]);
const b3 = superPrint1([true, false, true]);
const c4 = superPrint1(["a", "b", "c"]);
const d5 = superPrint1([1, 2, true, "a"]);

type SuperPrint3 = <T, M>(a: T[], b: M) => T;

const superPrint3: SuperPrint3 = (arr) => arr[0];

const a1 = superPrint3([1, 2, 3, 4], 1);
const b1 = superPrint3([true, false, true], "b");
const c1 = superPrint3(["a", "b", "c"], true);
const d1 = superPrint3([1, 2, true, "a"], []);

function superPrint4<T>(a: T[]) {
  return a[0];
}

const a4 = superPrint4<boolean>([1, 2, 3, 4]); // 에러이유 타입이 맞지 않음
const a3 = superPrint4<number>([1, 2, 3, 4]);
const b5 = superPrint4([true, false, true]);
const c6 = superPrint4(["a", "b", "c"]);
const d7 = superPrint4([1, 2, true, "a"]);

type Player4<E> = {
  name: string;
  extraInfo: E;
};

type NicoExtra = { favFood: string };

type NicoPlayer2 = Player4<NicoExtra>;

const nico2: Player4<{ favFood: string }> = {
  name: "nico",
  extraInfo: {
    favFood: "kimchi",
  },
};

const lynn2 : Player4<null> = {
    name:"lynn",
    extraInfo:null
}


type A = Array<number>

let a34:A = [1,2,3,4]

function printAllNumbers(arr:Array<number>) {
    
}
