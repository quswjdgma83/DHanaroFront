interface User {
  id: number;
  name: string;
}

interface Dept {
  id: number;
  dname: string;
  captain: string;
}

interface Ud2 {
  [temp: string]: number | string;
}

const ud2: Ud2 = { id: 1, name: "HH", addr: "Seoul" };
const ud3: Ud2 = { id: 1, name: "HH", captain: "TT", addr: "Seoul" };

console.log(ud2);
console.log(ud3);
