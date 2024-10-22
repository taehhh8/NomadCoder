const plus = (a, b) => a + b;

plus(2, 2);
//  result 4

plus(2, "hi");
// result 2hi

const user = {
  firstName: "Angela",
  lastName: "Davis",
  role: "Professor",
};

console.log(user.name);
// result undefined
// javascript undefiend  typescript error

const plus1 = (a: number, b: number) => a + b; // browser don't understand typescript -> complie javascript
plus1(1, 1);
plus1("a", 1); // only number type

// npx create-react-app react-masterclass-typescript --template typescript
