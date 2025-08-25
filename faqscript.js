    let questionCount = 5; // Keep track of the number of questions

      function editQuestion(index) {
        const questionCell = document.getElementById(`question-${index}`);
        const currentQuestion = questionCell.innerText;
        const newQuestion = prompt("Edit your question:", currentQuestion);
        if (newQuestion) {
          questionCell.innerText = newQuestion;
        }
      }

      function deleteQuestion(index) {
        const row = document.getElementById(`row-${index}`);
        if (confirm("Are you sure you want to delete this question?")) {
          row.remove();
        }
      }

      function addQuestion() {
        const newQuestion = prompt("Enter your question:");
        if (newQuestion) {
          questionCount++;
          const tableBody = document.querySelector("tbody");
          const newRow = document.createElement("tr");
          newRow.className = "border-t border-gray-200";
          newRow.id = `row-${questionCount}`;
          newRow.innerHTML = `
            <td class="py-4 pr-6">${questionCount}</td>
            <td class="py-4" id="question-${questionCount}">${newQuestion}</td>
            <td class="text-right pr-6">
              <i class="fas fa-edit text-green-600 cursor-pointer" onclick="editQuestion(${questionCount})"></i>
            </td>
            <td class="text-right">
              <i class="fas fa-trash-alt text-gray-600 cursor-pointer" onclick="deleteQuestion(${questionCount})"></i>
            </td>
          `;
          tableBody.appendChild(newRow);
        }
      }