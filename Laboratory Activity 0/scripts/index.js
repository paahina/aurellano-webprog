import { renderStudentList } from "./studentList.js";
import { addStudent } from "./inputStudent.js";

renderStudentList();
document.getElementById("add-student").addEventListener("click", addStudent);
