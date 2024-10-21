let a: number[] = [1, 2];
let b: string[] = ["i1", "1"];
let c: boolean[] = [true];

const player = {
  name: "nico",
};

player.name = "123";

type Player = {
  readonly name: string; // 읽기 전용 속성
  age?: number; // 선택적 속성
};

const player2Nico: Player = {
  name: "nico",
  age: 12,
};

const playerLynn: Player = {
  name: "lynn",
  age: 12,
};

function playerMaker(name: string, age?: number): Player {
  return {
    name,
    age,
  };
}

const playerMaker2 = (name: string): Player => ({ name });
const nico = playerMaker("nico");
nico.age = 12;
nico.name = "las"; // 읽기 전용 속성이므로 할당할 수 없습니다.
// 선택적 타입 , Alias 타입 , arugments 타입 함수 return값을 지정하는 타입

const names: readonly string[] = ["1", "2"];

["nico", 12, false];

const player3: readonly [string, number, boolean] = ["nico", 12, false];
player3[0] = "hi"; //읽기 전용 속성이므로 [0]에 할당할수 없습니다.

let e: undefined = undefined;
let f: null = null;

type Player2 = {
  age?: number;
};

// any

const g: any = [1, 2, 3, 4];
const h: any = true;

g + h; // any 타입은 모든 타입을 포함하므로 더하기 연산이 가능합니다.

let i: unknown;

if (typeof i === "number") {
  let j = i + 1;
}

i.toUpperCase(); // 오류: 'number' 형식에 'toUpperCase' 속성이 없습니다.

if (typeof i === "string") {
  let j = i.toUpperCase();
}

function hello(): void {
  console.log("x");
}

const k = hello();
k.toUpperCase(); // 오류: 'void' 형식에 'toUpperCase' 속성이 없습니다.

function hello2(name: string | number) {
  if (typeof name === "string") {
    name;
  } else if (typeof name === "number") {
    name;
  } else {
    name;
  }
}

const add = (a: number, b: number) => a + b; // 함수 선언식

// call signature
type Add = (a: number, b: number) => number; // 함수 타입 별칭

const add2: Add = (a, b) => a + b; // 함수 표현식

type Add2 = {
  (a: number, b: number): number;
  (a: number, b: string): number;
};

// overloading
const add3: Add2 = (a, b) => {
  if (typeof b === "string") return a; // 오버로딩 1
  return a + b; // 오버로딩 2
};

//nextjs
Router.push({
  pathname: "/",
  state: 1,
}).push("/home");

type Config = {
  path: string;
  state: object;
};

type push = {
  (path: string): void;
  (config: Config): void;
};

const push: push = (config) => {
  if (typeof config === "string") console.log(config); // 오버로딩 1
  else {
    console.log(config.path); // 오버로딩 2
  }
};

type Add3 = {
  (a: number, b: number): number;
  (a: number, b: number, c?: number): number;
};

// parameter 개수가 다르면 오버로딩 가능
const add4: Add3 = (a, b, c?: number) => {
  if (c) return a + b + c;
  return a + b;
};

add4(1, 2);
add4(1, 2, 3);
