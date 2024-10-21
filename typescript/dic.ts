class Word {
  constructor(public term: string, public definition: string) {}
}

class Dict {
  private words: { [key: string]: string } = {};

  add(word: Word): void {
    if (!this.exists(word.term)) {
      this.words[word.term] = word.definition;
    }
  }

  get(term: string): string | undefined {
    return this.words[term];
  }

  delete(term: string): void {
    if (this.exists(term)) {
      delete this.words[term];
    }
  }

  update(term: string, newDefinition: string): void {
    if (this.exists(term)) {
      this.words[term] = newDefinition;
    }
  }

  showAll(): void {
    Object.keys(this.words).forEach((term) => {
      console.log(`${term}: ${this.words[term]}`);
    });
  }

  count(): number {
    return Object.keys(this.words).length;
  }

  upsert(term: string, definition: string): void {
    this.words[term] = definition;
  }

  exists(term: string): boolean {
    return term in this.words;
  }

  bulkAdd(wordList: Word[]): void {
    wordList.forEach((word) => this.add(word));
  }

  bulkDelete(terms: string[]): void {
    terms.forEach((term) => this.delete(term));
  }
}

// 사용 예시
const dict = new Dict();

dict.add(new Word("김치", "한국의 전통 음식"));
dict.add(new Word("아파트", "주거용 건물"));

console.log(dict.get("김치")); // "한국의 전통 음식"

dict.update("아파트", "현대적인 주거 형태");
console.log(dict.get("아파트")); // "현대적인 주거 형태"

dict.showAll();

console.log(dict.count()); // 2

dict.upsert("불고기", "한국의 고기 요리");
console.log(dict.exists("불고기")); // true

dict.bulkAdd([new Word("bibimbap", "Mixed rice with vegetables"), new Word("soju", "Korean alcoholic beverage")]);

dict.bulkDelete(["아파트", "soju"]);

dict.showAll();
console.log(dict.count()); // 3
