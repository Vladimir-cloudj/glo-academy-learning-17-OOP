// Базовый класс Employee
class Employee {
  constructor(name, age, position, salary, hasChildren) {
    this._name = name;
    this._age = age;
    this._position = position;
    this._salary = salary;
    this._hasChildren = hasChildren;
  }

  get name() {
    return this._name;
  }

  get age() {
    return this._age;
  }

  get position() {
    return this._position;
  }

  get salary() {
    return this._salary;
  }

  get hasChildren() {
    return this._hasChildren;
  }

  set name(value) {
    this._name = value;
  }

  set age(value) {
    if (value > 0) {
      this._age = value;
    }
  }

  set salary(value) {
    if (value >= 0) {
      this._salary = value;
    }
  }

  getInfo() {
    return `${this.name}, ${this.age} лет, должность: ${
      this.position
    }, зарплата: ${this.salary}, дети: ${this.hasChildren ? "да" : "нет"}`;
  }
}


class Driver extends Employee {
  constructor(
    name,
    age,
    position,
    salary,
    hasChildren,
    carModel,
    drivingExperience
  ) {
    super(name, age, position, salary, hasChildren);
    this._carModel = carModel;
    this._drivingExperience = drivingExperience;
  }

  get carModel() {
    return this._carModel;
  }

  get drivingExperience() {
    return this._drivingExperience;
  }

  set carModel(value) {
    this._carModel = value;
  }

  set drivingExperience(value) {
    if (value >= 0) {
      this._drivingExperience = value;
    }
  }

  getInfo() {
    return (
      super.getInfo() +
      `, модель авто: ${this.carModel}, стаж вождения: ${this.drivingExperience} лет`
    );
  }
}


const driver = new Driver(
  "Мария Сидорова",
  28,
  "Водитель",
  60000,
  false,
  "Toyota Camry",
  5
);

const output = document.getElementById("output");
output.textContent = driver.getInfo();
