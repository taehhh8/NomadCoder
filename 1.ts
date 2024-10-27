type Nicname = string;
type Health = number;
type Friends = Array<string>

type Player = {
    nickname:string,
    healthBar:number
}

type Food = string ;

 const kimchi:Food = "delicious"


type Team = "red" | "blue" | "yellow"
type Health1 = 1 | 5 | 10

type Player2 = {
    nickname:string,
    team: Team
    health:Health1
}

const nico :Player2 = {
    nickname: "nico",
    team:"red",
    health: 10
}
// type , interface object를 결정하는 2가지 type키워드가 interface키워드보다 더 많이 활용할수 잇다.
// interface는 오로지 오브젝트의 모양을 Typescript에게 설명해주기 위해서만 사용되는 키워드
// Player2 나 Player3는 모두 타입스크립트에게 오브젝트모양을 설명하고 있다.
interface Player3 {
    nickname:string,
    team: Team
    health:Health1
}

const nico2 :Player3 = {
    nickname: "nico",
    team:"red",
    health: 10
}

interface User {
    name:string
}

interface Player4  extends User {
    name :string
}

type Player5 = User & {
}

const nico4 :Player4 = {
    name : "nico3"
}


// 3개의 인터페이스 객체지향 프로그램의 개념을 디자인을 활용했다. 
interface User2 {
    name:string
}

interface User2 {
    lastName:string
}

interface User2 {
    health:number
}

const nico5:User2 {
    name:"nchars",
    health:"1",
    lasName:"12312"
}