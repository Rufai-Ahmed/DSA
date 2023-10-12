//Reverse
const arr: number[] = [];
const Reverse = (n: number) => {
  for (let i = 1; i < n; i++) {
    arr.push(i);
  }
  console.log(arr.reverse());
};

console.time("1");
Reverse(10000000);
console.timeEnd("1");
console.log("");

//2+

const arr2: number[] = [];
const Reverse2 = (n: number) => {
  for (let i = 1; i < n; i++) {
    arr2.push(i);
  }
  console.log(
    arr2.sort((a, b) => {
      return b - a;
    })
  );
};
console.time("2");
Reverse2(10000000);
console.timeEnd("2");
console.log("");

//3

const arr3: number[] = [];
const Reverse3 = (n: number) => {
  for (let i = n; i > 1; i--) {
    arr3.push(i);
  }
  console.log(arr3);
};
console.time("3");
Reverse3(10000000);
console.timeEnd("3");
console.log("");

//4

const Reverse4 = (n: number) => {
  return Array.from({ length: n }, (_, index) => n - index);
};

console.time("4");
console.log(Reverse4(10000000));
console.timeEnd("4");
console.log("");
