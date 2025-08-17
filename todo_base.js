const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let todos = [];

function showMenu() {
  console.log("\n--- Todo Menu ---");
  console.log("1. Add Task");
  console.log("2. View Tasks");
  console.log("3. Delete Task");
  console.log("4. Exit");
}

function handleChoice(choice) {
  switch (choice.trim()) {
    case "1":
      rl.question("\nEnter task: ", (task) => {
        todos.push(task.trim());
        console.log(`Task Added: "${task.trim()}"`);
        mainMenu();
      });
      break;

      case "2":
        console.log("\nYour Tasks:");
        if (todos.length === 0) {
          console.log("No tasks yet!");
        } else {
          todos.forEach((task, i) => {
            console.log(`${i + 1}. ${task}`);
          });
        }
        mainMenu(); // call mainMenu AFTER the loop
        break;
      

    case "3":
      if (todos.length === 0) {
        console.log("\nNo tasks to delete!");
        mainMenu();
        break;
      }
      rl.question("\nEnter task number to delete: ", (num) => {
        let index = parseInt(num) - 1;
        if (!isNaN(index) && index >= 0 && index < todos.length) {
          console.log(`Task Deleted: "${todos[index]}"`);
          todos.splice(index, 1);
        } else {
          console.log("Invalid number!");
        }
        mainMenu();
      });
      break;

    case "4":
      console.log("Goodbye!");
      rl.close();
      break;

    default:
      console.log("Invalid choice!");
      mainMenu();
  }
}

function mainMenu() {
  showMenu();
  rl.question("Choose option: ", handleChoice);
}

mainMenu();
