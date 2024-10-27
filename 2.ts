abstract class User {
    constructor(
        protected firstName:string,
        protected lastName:string,
        // private firstName:string,
        // private lastName:string,
    ) {}
    abstract sayHi(name:string):string
    abstract fullName():string
}

// new User  not work
// 추상화를 원할때 클래스와 인터페이스를 사용 할떄의 차이점을 알아보기 위해서이다.
class Player extends User {
    fullName(){
        return `${this.firstName} ${this.lastName}` 
    }
    sayHi(name:string){
        return `Hello ${name}. My name is ${this.fullName}`
    }
}

// 인터페이스는 가벼워서 인터페이스로 컴파일하면 JS로 바끼지 않고 사라진다.
// 추상클래스 -> 인터페이스는
interface User2 {
    firstName:string,
    lastName :string,
    sayHi(name:string):string
    fullName():string
}

interface Human {
    health:number
}

// 2개의 인터페이스도 상속가능하다.
class Player2 implements User2, Human{
    constructor(
        // 인터페이스를 상속할 때에는 property를 private으로 만들지 못한다. protected도 불가능 public은 가능하다.
        public firstName:string,
        public lastName:string,
        public health:number
    ){}
      fullName(){
        return `${this.firstName} ${this.lastName}` 
    }
    sayHi(name:string){
        return `Hello ${name}. My name is ${this.fullName}`
    }
}

function makeUser(user:User2){
    return"hi"
}

makeUser({
    firstName:"nico",
    lastName:"las",
    fullName:()=> "xx",
    sayHi:(name)=> "string"
})