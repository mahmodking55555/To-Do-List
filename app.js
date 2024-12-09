// استيراد مكتبات Firebase
// استيراد مكتبات Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

// إعداد Firebase
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// تهيئة التطبيق وقاعدة البيانات
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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
