// =======================
// CodeQuest CLI Todo App
// Dev Day 2 – Power-Up Version
// =======================

const readline = require("readline");
const fs = require("fs");

// ===== Persistent Storage =====
function loadTodos() {
  if (fs.existsSync("todos.json")) {
    const data = fs.readFileSync("todos.json", "utf8");
    return JSON.parse(data);
  }
  return [];
}

function saveTodos(todos) {
  fs.writeFileSync("todos.json", JSON.stringify(todos, null, 2));
}

function loadXP() {
  if (fs.existsSync("xp.json")) {
    XP = JSON.parse(fs.readFileSync("xp.json", "utf8")).XP;
  }
}

function saveXP() {
  fs.writeFileSync("xp.json", JSON.stringify({ XP }));
}

// ===== Game Variables =====
let todos = loadTodos();
let XP = 0;
loadXP();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// ===== XP & Achievements =====
function addXP(points) {
  XP += points;
  console.log(`✨ You earned ${points} XP! Total XP: ${XP}`);
  saveXP();
}

function checkAchievements() {
  if (todos.length >= 5) console.log("🏅 Achievement unlocked: Novice Coder Badge!");
  if (todos.length >= 10) console.log("🏆 Achievement unlocked: Task Master Medal!");
}

// ===== Menu =====
function showMenu() {
  console.log("\n--- Todo Menu --- 📝");
  console.log("1. Add Task");
  console.log("2. View Tasks");
  console.log("3. Delete Task");
  console.log("4. Exit");
  console.log(`Current XP: ${XP}`);
}

function handleChoice(choice) {
  switch (choice) {
    case "1":
      rl.question("Enter task: ", (task) => {
        todos.push(task);
        saveTodos(todos);
        console.log("Task Added!");
        addXP(10);
        checkAchievements();
        mainMenu();
      });
      break;

    case "2":
      console.log("\nYour Tasks:");
      if (todos.length === 0) {
        console.log("No tasks yet! Add some to gain XP ⚡");
      } else {
        todos.forEach((task, i) => console.log(`${i + 1}. ${task}`));
      }
      addXP(5);
      mainMenu();
      break;

    case "3":
      rl.question("Enter task number to delete: ", (num) => {
        let index = parseInt(num) - 1;
        if (index >= 0 && index < todos.length) {
          todos.splice(index, 1);
          saveTodos(todos);
          console.log("Task deleted!");
          addXP(7);
          checkAchievements();
        } else {
          console.log("Invalid number!");
        }
        mainMenu();
      });
      break;

    case "4":
      console.log("Goodbye, Chosen Coder! 🧙‍♂️");
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

// ===== Start Game =====
console.log("Welcome to CodeQuest: The Trillion-Dollar Odyssey 💎⚡");
mainMenu();
