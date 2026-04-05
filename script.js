"use strict";

class Employee {
  constructor(name, age, position, salary, hasChildren) {
    this.name = name;
    this.age = age;
    this.position = position;
    this.salary = salary;
    this.hasChildren = hasChildren;
    this.type = "Employee";
  }

  getName() {
    return this.name;
  }
  getAge() {
    return this.age;
  }
  getPosition() {
    return this.position;
  }
  getSalary() {
    return this.salary;
  }
  getHasChildren() {
    return this.hasChildren;
  }
  getType() {
    return this.type;
  }

  setName(v) {
    this.name = v || "";
  }
  setAge(v) {
    this.age = Number(v) || 0;
  }
  setPosition(v) {
    this.position = v || "";
  }
  setSalary(v) {
    this.salary = Number(v) || 0;
  }
  setHasChildren(v) {
    this.hasChildren = Boolean(v);
  }

  getInfo() {
    return `${this.getName()}, ${this.getAge()} лет, ${this.getPosition()}, ${this.getSalary()} руб.`;
  }
}

class Plumber extends Employee {
  constructor(name, age, position, salary, hasChildren, tools) {
    super(name, age, position, salary, hasChildren);
    this.tools = Array.isArray(tools)
      ? tools
      : typeof tools === "string"
      ? tools
          .split(",")
          .map((t) => t.trim())
          .filter((t) => t)
      : [];
    this.type = "Слесарь";
  }

  getTools() {
    return this.tools;
  }
  setTools(v) {
    this.tools = Array.isArray(v)
      ? v.map((t) => String(t).trim()).filter((t) => t)
      : [];
  }

  getInfo() {
    return super.getInfo() + `, инструменты: ${this.getTools().join(", ")}`;
  }
}

class Driver extends Employee {
  constructor(name, age, position, salary, hasChildren, carModel) {
    super(name, age, position, salary, hasChildren);
    this.carModel = carModel || "";
    this.type = "Водитель";
  }

  getCarModel() {
    return this.carModel;
  }
  setCarModel(v) {
    this.carModel = v || "";
  }

  getInfo() {
    return super.getInfo() + `, авто: ${this.getCarModel()}`;
  }
}

let employees = JSON.parse(localStorage.getItem("employees")) || [];

employees = employees
  .map((empData) => {
    if (!empData || typeof empData !== "object") return null;

    if (empData.type === "Слесарь") {
      return new Plumber(
        empData.name,
        empData.age,
        empData.position,
        empData.salary,
        empData.hasChildren,
        empData.tools
      );
    } else if (empData.type === "Водитель") {
      return new Driver(
        empData.name,
        empData.age,
        empData.position,
        empData.salary,
        empData.hasChildren,
        empData.carModel
      );
    } else {
      return new Employee(
        empData.name,
        empData.age,
        empData.position,
        empData.salary,
        empData.hasChildren
      );
    }
  })
  .filter(Boolean);

function renderTable() {
  const tbody = document.getElementById("tableBody");
  tbody.innerHTML = "";

  employees.forEach((emp, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${emp.getName() || ""}</td>
      <td>${emp.getAge() || 0}</td>
      <td>${emp.getPosition() || ""}</td>
      <td>${emp.getSalary() || 0}</td>
      <td>${emp.getHasChildren() ? "Да" : "Нет"}</td>
      <td>${emp.getType() || ""}</td>
      <td>${
        emp.getType() === "Слесарь"
          ? emp.getTools().join(", ")
          : emp.getCarModel() || ""
      }</td>
      <td><button class="delete-btn" data-index="${index}">Удалить</button></td>
    `;
    tbody.appendChild(tr);
  });

  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const i = +btn.dataset.index;
      if (i >= 0 && i < employees.length) {
        employees.splice(i, 1);
        saveAndRender();
      }
    });
  });
}

function saveAndRender() {
  const serializable = employees.map((emp) => ({
    name: emp.getName(),
    age: emp.getAge(),
    position: emp.getPosition(),
    salary: emp.getSalary(),
    hasChildren: emp.getHasChildren(),
    type: emp.getType(),
    tools: emp.getType() === "Слесарь" ? emp.getTools() : undefined,
    carModel: emp.getType() === "Водитель" ? emp.getCarModel() : undefined,
  }));
  localStorage.setItem("employees", JSON.stringify(serializable));
  renderTable();
}

document.addEventListener("DOMContentLoaded", () => {
  renderTable();

  const form = document.getElementById("employeeForm");
  const typeSelect = document.getElementById("type");
  const plumberFields = document.getElementById("plumberFields");
  const driverFields = document.getElementById("driverFields");

  typeSelect.addEventListener("change", () => {
    const val = typeSelect.value;
    plumberFields.style.display = val === "Plumber" ? "block" : "none";
    driverFields.style.display = val === "Driver" ? "block" : "none";
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const age = +document.getElementById("age").value;
    const position = document.getElementById("position").value.trim();
    const salary = +document.getElementById("salary").value;
    const hasChildren = document.getElementById("hasChildren").checked;
    const type = typeSelect.value;

    if (!name || !age || !position || !salary || !type) {
      alert("Заполните все обязательные поля!");
      return;
    }

    let newEmp;
    if (type === "Plumber") {
      const tools = document.getElementById("tools").value;
      newEmp = new Plumber(name, age, position, salary, hasChildren, tools);
    } else if (type === "Driver") {
      const carModel = document.getElementById("carModel").value;
      newEmp = new Driver(name, age, position, salary, hasChildren, carModel);
    }

    employees.push(newEmp);
    saveAndRender();

    form.reset();
    typeSelect.value = "";
    plumberFields.style.display = "none";
    driverFields.style.display = "none";
  });
});
