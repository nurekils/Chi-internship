enum Days {
  Monday = "Monday",
  Tuesday = "Tuesday",
  Wednesday = "Wednesday",
  Thursday = "Thursday",
  Friday = "Friday",
  Saturday = "Saturday",
  Sunday = "Sunday",
}

function getActivity(day: Days): string {
  switch (day) {
    case Days.Monday:
      return "Планування справ на тиждень";
    case Days.Tuesday:
      return "Навчання та практика";
    case Days.Wednesday:
      return "Робота над складними задачами";
    case Days.Thursday:
      return "Завершення основних завдань";
    case Days.Friday:
      return "Відпочинок після роботи";
    case Days.Saturday:
      return "Хобі або прогулянка";
    case Days.Sunday:
      return "Повний відпочинок";
    default:
      return "Невідомий день";
  }
}

console.log("Sunday activity:", getActivity(Days.Sunday));
console.log("Wednesday activity:", getActivity(Days.Wednesday));

class Queue<T> {
  private items: T[] = [];

  enqueue(item: T): void {
    this.items.push(item);
  }

  dequeue(): T {
    if (this.items.length === 0) {
      throw new Error("Queue is empty");
    }
    return this.items.shift() as T;
  }
}

const stringQueue = new Queue<string>();
stringQueue.enqueue("Hello");
stringQueue.enqueue("World");

console.log("String queue:", stringQueue.dequeue());
console.log("String queue:", stringQueue.dequeue());

const numberQueue = new Queue<number>();
numberQueue.enqueue(10);
numberQueue.enqueue(20);

console.log("Number queue:", numberQueue.dequeue());
console.log("Number queue:", numberQueue.dequeue());

type StringOrNumber = string | number;

function combine(
  input1: StringOrNumber,
  input2: StringOrNumber,
): StringOrNumber {
  if (typeof input1 === "string" && typeof input2 === "string") {
    return input1 + input2;
  }

  if (typeof input1 === "number" && typeof input2 === "number") {
    return input1 + input2;
  }

  throw new Error("Inputs must be of the same type");
}

console.log("Combine strings:", combine("Type", "Script"));
console.log("Combine numbers:", combine(5, 7));

interface IPerson {
  name: string;
  age: number;
}

interface IWorker extends IPerson {
  position: string;
  salary: number;
}

class EmployeeWorker implements IWorker {
  name: string;
  age: number;
  position: string;
  salary: number;

  constructor(name: string, age: number, position: string, salary: number) {
    this.name = name;
    this.age = age;
    this.position = position;
    this.salary = salary;
  }

  getSalary(): number {
    return this.salary;
  }

  setSalary(newSalary: number): void {
    this.salary = newSalary;
  }
}

const worker = new EmployeeWorker("Ivan", 25, "Developer", 1000);
console.log("Salary:", worker.getSalary());
worker.setSalary(1200);
console.log("New salary:", worker.getSalary());
