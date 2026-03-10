import { students } from "./student.js";

const studentList = document.querySelector(".student-lists");

export function renderStudentList() {
  studentList.innerHTML = `
    ${renderStudents()}
  `;

  document.querySelectorAll(".js-button-present").forEach((button) => {
    button.addEventListener("click", (e) => {
      students.forEach((student) => {
        if (student.id === Number(e.target.dataset.studentId)) {
          const box = document.querySelector(`.studentId-${student.id}`);
          if (box.classList.contains("mark-absent")) {
            box.classList.remove("mark-absent");
          }
          box.classList.add("mark-present");
          student.isPresent = "Present";
        }
      });
      renderStudentList();
    });
  });

  document.querySelectorAll(".js-button-absent").forEach((button) => {
    button.addEventListener("click", (e) => {
      students.forEach((student) => {
        if (student.id === Number(e.target.dataset.studentId)) {
          const box = document.querySelector(`.studentId-${student.id}`);
          if (box.classList.contains("mark-present")) {
            box.classList.remove("mark-present");
          }
          box.classList.add("mark-absent");
          student.isPresent = "Absent";
        }
      });
      renderStudentList();
    });
  });

  document.querySelectorAll(".js-button-remove").forEach((button) => {
    button.addEventListener("click", (e) => {
      const studentId = Number(e.target.dataset.studentId);
      const index = students.findIndex((student) => student.id === studentId);

      if (index !== -1) {
        students.splice(index, 1);
        renderStudentList();
      }
    });
  });

  function renderStudents() {
    let html = "";
    studentList.classList.remove("empty");

    if (students.length === 0) {
      studentList.classList.add("empty");
      return "<p>No students on the list.</p>";
    }

    students.forEach((student) => {
      const { id, isPresent, name } = student;
      html += `
      <li class="student-box studentId-${id} ${student.isPresent === "Present" ? "mark-present" : isPresent === "Absent" ? "mark-absent" : ""}">
        <div class="student-name">
          <p>${name}</p>
          ${renderStudentStatus(isPresent)}
        </div>
        <button class="button present js-button-present" data-student-id="${id}">Mark Present</button>
        <button class="button absent js-button-absent" data-student-id="${id}">Mark Absent</button>
        <button class="button remove js-button-remove" data-student-id="${id}">Remove</button>
      </li>
      `;
    });

    return html;
  }
  function renderStudentStatus(status) {
    return `<p class="student-status ${status === "unchecked" ? "hidden" : status === "Absent" ? "status-absent" : "status-present"}">(${status})</p>`;
  }
}
