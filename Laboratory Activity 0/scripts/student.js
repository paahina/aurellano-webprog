export class Student {
  #id;
  #name;
  #isPresent;
  constructor(id, name) {
    this.#id = id;
    this.#name = name;
    this.#isPresent = "unchecked";
  }
  get name() {
    return this.#name;
  }
  get isPresent() {
    return this.#isPresent;
  }
  set isPresent(isPresent) {
    this.#isPresent = isPresent;
  }
  get id() {
    return this.#id;
  }
}

export const students = [
  new Student(1, "Cyrus Robles"),
  new Student(2, "Page Aurellano"),
  new Student(3, "Gabriel Josh Eugenio"),
  new Student(4, "Joshua Maquilan"),
  new Student(5, "Kristine Navarro"),
];
