// Import the necessary functions from Firebase SDK
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child, update, remove } from "firebase/database";

// Firebase configuration for your web app
const firebaseConfig = {
  apiKey: "AIzaSyDG3jlAYXa6A1VYGwmg_VESPgyxNwP7fWk",
  authDomain: "to-do-list-78613.firebaseapp.com",
  databaseURL: "https://to-do-list-78613-default-rtdb.firebaseio.com",
  projectId: "to-do-list-78613",
  storageBucket: "to-do-list-78613.appspot.com", // يجب تصحيح الرابط هنا
  messagingSenderId: "770170760313",
  appId: "1:770170760313:web:1cae8a9a79aeccdc01f8a8",
  measurementId: "G-CES37GXLP0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database
const database = getDatabase(app);

// Example: Function to add a task to the database
function addTask(taskId, taskData) {
    set(ref(database, "tasks/" + taskId), taskData)
        .then(() => {
            console.log("Task added successfully!");
        })
        .catch((error) => {
            console.error("Error adding task:", error);
        });
}

// Example: Function to retrieve tasks
function getTasks() {
    const dbRef = ref(database);
    get(child(dbRef, "tasks"))
        .then((snapshot) => {
            if (snapshot.exists()) {
                console.log("Tasks:", snapshot.val());
            } else {
                console.log("No data available");
            }
        })
        .catch((error) => {
            console.error("Error retrieving tasks:", error);
        });
}

// Example: Function to update a task
function updateTask(taskId, updatedData) {
    update(ref(database, "tasks/" + taskId), updatedData)
        .then(() => {
            console.log("Task updated successfully!");
        })
        .catch((error) => {
            console.error("Error updating task:", error);
        });
}

// Example: Function to delete a task
function deleteTask(taskId) {
    remove(ref(database, "tasks/" + taskId))
        .then(() => {
            console.log("Task deleted successfully!");
        })
        .catch((error) => {
            console.error("Error deleting task:", error);
        });
}

// Test the functions
addTask("task1", { name: "Learn Firebase", completed: false });
getTasks();
updateTask("task1", { completed: true });
deleteTask("task1");
