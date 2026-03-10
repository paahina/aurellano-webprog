import { renderStudentList } from "./studentList.js";
import { students, Student } from "./student.js";

const input = document.getElementById("studentName");
export function addStudent() {
  if (input.value.length === 0) {
    return alert("Please enter a student name.");
  }

  students.push(new Student(students.length + 1, input.value));
  renderStudentList();

  input.value = "";
}
