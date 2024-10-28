// ploymorphism 다형성
// 때가 되면 typescript가 placeholder type에서  conrete type으로 바꺼준다.
 
interface SStorage<T> {
    [key:string] :T //generic 
}

class LocalStorage<T> {
    private storage: SStorage<T> = {}
    set(key:string, value:T){
        this.storage[key] = value
    }
    remove(key:string){
        delete this.storage[key]
    }
    get(key:string):T {
        return this.storage[key]
    }
    clear(){
        this.storage = {}
    }
}

// 
const stringsStorage = new LocalStorage<string>()

stringsStorage.get("ket")
stringsStorage.set("hello","how are you")

const booleansStorage = new LocalStorage<boolean>()

booleansStorage.get("xxx")
booleansStorage.set("hello",true)

