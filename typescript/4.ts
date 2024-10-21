// 추상클래스
abstract class User {
  constructor(
    // private은 말그대로 개인적인 것을 말하고, User 클래스의 인스턴스나 메소드에서 접근할수 있지만
    // Player2 클래스는 추상클래스여서 인스턴스화 할수 없다.
    // private firstName: string,
    // private lastName:string,
    // private nickname:string,
    // 추상 메소드는 네가 추상 클래스를 상속받는 모든것들이 구현해야하는 메소드를 의미한다.
    // 필드가 외부로부터는 보호되지만 다른 자식 클래스를 사용하기를 원한다면 private을 쓰면 안되고
    // protected를 써야한다..
    protected firstName: string,
    protected lastName: string,
    protected nickname: string,
    public nickname1: string // === nickname1:string
  ) {}
  // 추상 메소드는 네가 추상 클래스를 상속받는 모든것들이 구현해야하는 메소드를 의미한다.
  abstract getNickname(): void; // call signature

  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

// prope
class Player2 extends User {
  getNickname() {
    console.log(this.nickname);
  }
}

const nico3 = new Player2("nico", "las", "니꼬", "니꼬");
nico3.getFullName();
nico3.nickname1;

// nico3.getFullName();
///Typescript error

class Player {
  constructor(private firstName: string, private lastName: string, public nickname: string) {}
}

const nico = new Player("nico", "las", "니꼬");

// typescript에서는 추상클래스가 좋다.

new User("nico", "las", "니꼬", "니꼬"); // javscript에서는 되지만 typescript에서는 안된다.

//
type Words = {
  // 제한된 양의 property를 혹은 key를 가지는 타입을 정의해 주는 방법
  [whatever: string]: string; // 모든 타입의 키를 가질수 있음 Words type이 string만을 property로 가지는 오브젝트
};

let dict: Words = {
  potato: "Food",
  1: "food",
  2: "",
  3: "",
};

class Dict1 {
  private words: Words;
  constructor() {
    this.words = {};
  }
  add(word: Word) {
    if (this.words[word.term] === undefined) {
      this.words[word.term] = word.def;
    }
  }
  def(term: string) {
    return this.words[term];
  }
}

class Dict {
  private words: Words;
}

class Word {
  constructor(public term: string, public def: string) {}
}

const kimchi = new Word("kimchi", "한국의 음식");

const dict1 = new Dict1();

dict1.add(kimchi);
dict1.def("kimchi");
