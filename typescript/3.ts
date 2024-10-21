// last 함수
type Last = <T>(arr: T[]) => T;

const last: Last = (arr) => arr[arr.length - 1];

// prepend 함수
type Prepend = <T>(arr: T[], item: T) => T[];

const prepend: Prepend = (arr, item) => [item, ...arr];

// Mix 타입 정의
type Mix = <T>(arr1: T[], arr2: T[]) => T[];

// mix 함수 구현
const mix: Mix = <T>(arr1: T[], arr2: T[]) => {
  const result: T[] = [];
  const maxLength = Math.max(arr1.length, arr2.length);

  for (let i = 0; i < maxLength; i++) {
    if (i < arr1.length) {
      result.push(arr1[i]);
    }
    if (i < arr2.length) {
      result.push(arr2[i]);
    }
  }

  return result;
};

// count 함수
type Count = <T>(arr: T[]) => number;

const count: Count = (arr) => arr.length;

// findIndex 함수
type FindIndex = <T>(arr: T[], item: T) => number | null;

const findIndex: FindIndex = (arr, item) => {
  const index = arr.indexOf(item);
  return index !== -1 ? index : null;
};

// slice 함수
type Slice = <T>(arr: T[], startIndex: number, endIndex?: number) => T[];

const slice: Slice = (arr, startIndex, endIndex?) => {
  if (endIndex === undefined) {
    return arr.slice(startIndex);
  }
  return arr.slice(startIndex, endIndex);
};

// 함수 사용 예시
const numbers = [1, 2, 3, 4, 5];
const strings = ["a", "b", "c", "d"];

console.log(last(numbers)); // 5
console.log(prepend(numbers, 0)); // [0, 1, 2, 3, 4, 5]
console.log(mix(numbers, strings)); // [1, "a", 2, "b", 3, "c", 4, "d", 5]
console.log(count(numbers)); // 5
console.log(findIndex(strings, "c")); // 2
console.log(findIndex(strings, "e")); // null
console.log(slice(numbers, 1, 4)); // [2, 3, 4]
console.log(slice(numbers, 2)); // [3, 4, 5]
