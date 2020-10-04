// mencari variable UI
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// load all event listener
LoadEventListener();

// function load all event listener
function LoadEventListener() {
    form.addEventListener('submit', addTask);
    taskList.addEventListener('click', deleteTask);
    clearBtn.addEventListener('click', clearTask);
    filter.addEventListener('keyup', filterTask);
    document.addEventListener('DOMContentLoaded', getTask)
}

// function get all task in local
function getTask() {
    let array;
    if (localStorage.getItem('tasks') === null) {
        console.log('kosong')
    }
    else {
        array = JSON.parse(localStorage.getItem('tasks'));
        console.log(array);
        array.forEach(function (task) {
            // membuat element li baru
            const li = document.createElement('li');
            // menambah class name Materialize
            li.className = 'collection-item';
            // membuat text kedalam li dengan apendChild sehingga text tadi menjadi child li
            li.appendChild(document.createTextNode(task));
            // membuat button baru buat delete
            const link = document.createElement('a');
            // menambah class name Materialize
            link.className = 'delete-item secondary-content';
            // menambahkan icon 
            link.innerHTML = '<i class="fa fa-remove"></i>';
            // manjadikan link sebagai child nya li
            li.appendChild(link);
            // menambahkan li ke html dengan menjadikannya child kedalam taskList
            taskList.appendChild(li);
        })
    }
}

// function addTask
function addTask(e) {
    // mengecek ada value apa gk
    if (taskInput.value === '') {
        alert("Masukkan Input Dahulu");
    }
    else {
        // membuat element li baru
        const li = document.createElement('li');
        // menambah class name Materialize
        li.className = 'collection-item';
        // membuat text kedalam li dengan apendChild sehingga text tadi menjadi child li
        li.appendChild(document.createTextNode(taskInput.value));
        // membuat button baru buat delete
        const link = document.createElement('a');
        // menambah class name Materialize
        link.className = 'delete-item secondary-content';
        // menambahkan icon 
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // manjadikan link sebagai child nya li
        li.appendChild(link);
        // menambahkan li ke html dengan menjadikannya child kedalam taskList
        taskList.appendChild(li);

        // menambahkan ke local storage
        addLocalStorage(taskInput.value);

        // mereset value input
        taskInput.value = '';

        // console.log(li)
    }

    e.preventDefault();
}
// function add local storage
function addLocalStorage(task) {
    let array;
    // console.log(task);
    if (localStorage.getItem('tasks') === null) {
        array = [task];
    }
    else {
        array = JSON.parse(localStorage.getItem('tasks'));
        array.push(task);
    }
    // console.log(array);
    localStorage.setItem('tasks', JSON.stringify(array));
    // console.log( JSON.parse(localStorage.getItem('tasks')));
}

// function delete task
function deleteTask(e) {
    // mengecek kalo bener" clik icon delete
    if (e.target.parentElement.classList.contains('delete-item')) {
        // konfirmasi
        if (confirm('apakah anda yakin ?')) {
            // menghapus element
            e.target.parentElement.parentElement.remove();

            // menghapus data local storage
            removeLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

// function remove local storage
function removeLocalStorage(task) {
    let text = task.textContent;
    let array = JSON.parse(localStorage.getItem('tasks'));

    array.forEach(function (arr, index) {
        if (text === arr) {
            array.splice(index, 1);
        }
    })
    localStorage.setItem('tasks',JSON.stringify(array));

    // console.log(text);
}

// function clear task
function clearTask() {
    // konfirmasi
    if (confirm('apakah anda yakin untuk mereset ?')) {
        // lopping ketika ada task 
        while (taskList.firstChild) {
            // menghapus task
            taskList.removeChild(taskList.firstChild);
        }
        clearLocalStorage();
    }
}

// function clear local storage
function clearLocalStorage(){
    localStorage.clear();
}

// function filter
function filterTask(e) {
    // mengambil value input
    const text = e.target.value.toLowerCase();
    // console.log(text);

    // mengambil setiap task
    document.querySelectorAll('.collection-item').forEach(function (task) {
        // mengambil text task
        const item = task.firstChild.textContent.toLowerCase();
        // mengecek apakah ada yg sama
        if (item.indexOf(text) != -1) {
            // menampilkan
            task.style.display = 'block';
        }
        else {
            // menghide
            task.style.display = 'none';
        }
    })

}