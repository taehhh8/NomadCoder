type PlayerA = {
    name: string
}

type PlayerAA = PlayerA & {
    lastName:string
}

// PlayerAA 타입이 이미 정의 되어 중독 되기 때문에 또 PlayerAA를 쓸수는 없다
// type PlayerAA = {
//     health:number
// }
const playerA: PlayerA = {
    name:"nico"
}

const playerAA: PlayerAA = {
    name:"nico",
    lastName:"xxx"
}

// 각각의 인터페이스를 만들어도 동일하게 작동한다.
interface PlayerB {
    name: string
}
interface PlayerB{
    lastName :string
}

interface PlayerB {
    health:number
}

const playerB: PlayerB = {
    name:"nico",
    lastName:"asdaw",
    health:1
}


type PlayerC = {
firstName:string
}

interface PlayerD {
    firstName:string
}

// PlayerC PlayerD 둘다 상속가능하다. 
class User2 implements PlayerD {
    constructor(
        public firstName:string
    ){}
}

// interface 대부분의 기능은 type에도 있다. 
// interface
interface Animal {
    name:string
}

interface Bear extends Animal {
    honey:boolean
}

const bear = getBear()
bear.name
bear.honey

//Type
type Animal1{
    name:string
}

type Bear1 = Animal1 & {
    honey:boolean
}

const bear1 = getBear();
bear1.name;
bear1.honey;
