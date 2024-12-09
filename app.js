
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDG3jlAYXa6A1VYGwmg_VESPgyxNwP7fWk",
  authDomain: "to-do-list-78613.firebaseapp.com",
  databaseURL: "https://to-do-list-78613-default-rtdb.firebaseio.com",
  projectId: "to-do-list-78613",
  storageBucket: "to-do-list-78613.firebasestorage.app",
  messagingSenderId: "770170760313",
  appId: "1:770170760313:web:1cae8a9a79aeccdc01f8a8",
  measurementId: "G-CES37GXLP0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// العناصر في واجهة المستخدم
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const tasksList = document.getElementById("tasksList");

// وظيفة إضافة مهمة جديدة
async function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText) {
        try {
            await addDoc(collection(db, "tasks"), { text: taskText });
            taskInput.value = "";
            loadTasks();
        } catch (error) {
            console.error("Error adding task: ", error);
        }
    }
}

// وظيفة حذف مهمة
async function deleteTask(taskId) {
    try {
        await deleteDoc(doc(db, "tasks", taskId));
        loadTasks();
    } catch (error) {
        console.error("Error deleting task: ", error);
    }
}

// وظيفة جلب المهام وعرضها
async function loadTasks() {
    tasksList.innerHTML = "";
    try {
        const querySnapshot = await getDocs(collection(db, "tasks"));
        querySnapshot.forEach((doc) => {
            const task = doc.data();
            const listItem = document.createElement("li");
            listItem.className = "list-group-item d-flex justify-content-between align-items-center";
            listItem.innerHTML = `
                ${task.text}
                <button class="btn btn-danger btn-sm" onclick="deleteTask('${doc.id}')">Delete</button>
            `;
            tasksList.appendChild(listItem);
        });
    } catch (error) {
        console.error("Error fetching tasks: ", error);
    }
}

// إضافة حدث للنقر على زر إضافة مهمة
addTaskBtn.addEventListener("click", addTask);

// تحميل المهام عند فتح الصفحة
loadTasks();
