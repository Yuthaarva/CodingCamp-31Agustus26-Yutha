/* =========================================
   TO-DO LIST LIFE DASHBOARD
   Vanilla JavaScript <3
========================================= */


/* =========================================
   GREETING
========================================= */

const clockElement =
    document.getElementById("clock");

const dateElement =
    document.getElementById("date");

const greetingElement =
    document.getElementById("greeting");

const nameInput =
    document.getElementById("nameInput");

const saveNameButton =
    document.getElementById("saveNameButton");


/*
    Ambil nama dari Local Storage
*/

let savedName =
    localStorage.getItem("dashboardName") || "";


/*
    Masukkan nama yang tersimpan
*/

nameInput.value = savedName;


/*
    Update greeting
*/

function updateGreeting() {

    const now = new Date();

    const hour = now.getHours();


    let greeting = "";


    if (hour >= 5 && hour < 8) {

        greeting = "Si paling Morning person!";

    } else if (hour >= 8 && hour < 12) {

        greeting = "Slamat siang kaum rebahan!";

    } else if (hour >= 12 && hour < 15) {

        greeting = "*Timothy Ronald 'Bayi lu?'";

    } else if (hour >= 15 && hour < 18) {

        greeting = "Sore si paling senja!";

    } else if (hour >= 18 && hour < 21) {

        greeting = "Santai dulu ga sih?";

    } else {

        greeting = "Tidur Jierrr >:v";

    }


    /*
        Challenge:
        Custom Name in Greeting
    */

    if (savedName) {

        greetingElement.textContent =
            `${greeting}, ${savedName}`;

    } else {

        greetingElement.textContent =
            greeting;

    }


    /*
        Jam
    */

    clockElement.textContent =
        now.toLocaleTimeString("en-GB", {
            hour12: false
        });


    /*
        Tanggal
    */

    dateElement.textContent =
        now.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric"
        });

}


updateGreeting();


/*
    Update setiap detik
*/

setInterval(updateGreeting, 1000);


/*
    Simpan nama
*/

saveNameButton.addEventListener(
    "click",
    function () {

        const name =
            nameInput.value.trim();


        savedName = name;


        localStorage.setItem(
            "dashboardName",
            savedName
        );


        updateGreeting();

    }
);


/*
    Enter untuk menyimpan nama
*/

nameInput.addEventListener(
    "keypress",
    function (event) {

        if (event.key === "Enter") {

            saveNameButton.click();

        }

    }
);




/* =========================================
   RASIS MODE >:)
========================================= */

const themeButton =
    document.getElementById("themeButton");


/*
    Cek tema yang tersimpan
*/

const savedTheme =
    localStorage.getItem("dashboardTheme");


if (savedTheme === "hytam") {

    document.body.classList.add("nigg-mode");

    themeButton.textContent = "☀️";

} else {

    themeButton.textContent = "🌙";

}


/*
    Tombol theme
*/

themeButton.addEventListener(
    "click",
    function () {

        document.body.classList.toggle(
            "nigg-mode"
        );


        const darkMode =
            document.body.classList.contains(
                "nigg-mode"
            );


        if (darkMode) {

            localStorage.setItem(
                "dashboardTheme",
                "hytam"
            );

            themeButton.textContent = "☀️";

        } else {

            localStorage.setItem(
                "dashboardTheme",
                "light"
            );

            themeButton.textContent = "🌙";

        }

    }
);




/* =========================================
   FOCUS TIMER
========================================= */

const timerElement =
    document.getElementById("timer");

const startButton =
    document.getElementById("startButton");

const stopButton =
    document.getElementById("stopButton");

const resetButton =
    document.getElementById("resetButton");


/*
    25 menit
*/

const defaultTime =
    25 * 60;


let remainingTime =
    defaultTime;


let timerInterval = null;


/*
    Tampilkan timer
*/

function updateTimerDisplay() {

    const minutes =
        Math.floor(
            remainingTime / 60
        );


    const seconds =
        remainingTime % 60;


    timerElement.textContent =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

}


/*
    START
*/

startButton.addEventListener(
    "click",
    function () {

        if (timerInterval !== null) {

            return;

        }


        timerInterval =
            setInterval(
                function () {

                    if (remainingTime > 0) {

                        remainingTime--;

                        updateTimerDisplay();

                    } else {

                        clearInterval(
                            timerInterval
                        );

                        timerInterval = null;

                        alert(
                            "Focus session selesai! 🎉"
                        );

                    }

                },
                1000
            );

    }
);


/*
    STOP
*/

stopButton.addEventListener(
    "click",
    function () {

        clearInterval(
            timerInterval
        );

        timerInterval = null;

    }
);


/*
    RESET
*/

resetButton.addEventListener(
    "click",
    function () {

        clearInterval(
            timerInterval
        );

        timerInterval = null;

        remainingTime =
            defaultTime;

        updateTimerDisplay();

    }
);


updateTimerDisplay();




/* =========================================
   TO-DO LIST
========================================= */

const taskForm =
    document.getElementById("taskForm");

const taskInput =
    document.getElementById("taskInput");

const taskList =
    document.getElementById("taskList");

const taskMessage =
    document.getElementById("taskMessage");


/*
    Ambil task dari Local Storage
*/

let tasks =
    JSON.parse(
        localStorage.getItem(
            "dashboardTasks"
        )
    ) || [];


/*
    Simpan task
*/

function saveTasks() {

    localStorage.setItem(
        "dashboardTasks",
        JSON.stringify(tasks)
    );

}


/*
    Pesan error
*/

function showTaskMessage(message) {

    taskMessage.textContent =
        message;


    setTimeout(
        function () {

            taskMessage.textContent =
                "";

        },
        2500
    );

}


/*
    Challenge:
    Prevent Duplicate Tasks
*/

function isDuplicateTask(taskName) {

    return tasks.some(
        function (task) {

            return (
                task.text.toLowerCase() ===
                taskName.toLowerCase()
            );

        }
    );

}


/*
    Tampilkan semua task
*/

function renderTasks() {

    taskList.innerHTML = "";


    tasks.forEach(
        function (task, index) {

            const listItem =
                document.createElement("li");

            listItem.className =
                "task-item";


            /*
                Bagian kiri
            */

            const left =
                document.createElement("div");

            left.className =
                "task-left";


            /*
                Checkbox
            */

            const checkbox =
                document.createElement("input");

            checkbox.type =
                "checkbox";

            checkbox.className =
                "task-checkbox";

            checkbox.checked =
                task.completed;


            /*
                Nama task
            */

            const text =
                document.createElement("span");

            text.className =
                "task-text";

            text.textContent =
                task.text;


            if (task.completed) {

                text.classList.add(
                    "completed"
                );

            }


            /*
                Checkbox event
            */

            checkbox.addEventListener(
                "change",
                function () {

                    tasks[index].completed =
                        checkbox.checked;

                    saveTasks();

                    renderTasks();

                }
            );


            left.appendChild(
                checkbox
            );

            left.appendChild(
                text
            );


            /*
                Action buttons
            */

            const actions =
                document.createElement("div");

            actions.className =
                "task-actions";


            /*
                EDIT BUTTON
            */

            const editButton =
                document.createElement("button");

            editButton.textContent =
                "Edit";

            editButton.className =
                "edit-button";


            editButton.addEventListener(
                "click",
                function () {

                    editTask(
                        index,
                        listItem
                    );

                }
            );


            /*
                DELETE BUTTON
            */

            const deleteButton =
                document.createElement("button");

            deleteButton.textContent =
                "Delete";

            deleteButton.className =
                "delete-button";


            deleteButton.addEventListener(
                "click",
                function () {

                    tasks.splice(
                        index,
                        1
                    );

                    saveTasks();

                    renderTasks();

                }
            );


            actions.appendChild(
                editButton
            );

            actions.appendChild(
                deleteButton
            );


            listItem.appendChild(
                left
            );

            listItem.appendChild(
                actions
            );


            taskList.appendChild(
                listItem
            );

        }
    );

}


/*
    Edit task
*/

function editTask(index, listItem) {

    listItem.innerHTML = "";


    const editInput =
        document.createElement("input");

    editInput.type =
        "text";

    editInput.className =
        "edit-input";

    editInput.value =
        tasks[index].text;

    editInput.maxLength =
        100;


    const saveButton =
        document.createElement("button");

    saveButton.textContent =
        "Save";

    saveButton.className =
        "primary-button";


    const cancelButton =
        document.createElement("button");

    cancelButton.textContent =
        "Cancel";


    listItem.appendChild(
        editInput
    );

    listItem.appendChild(
        saveButton
    );

    listItem.appendChild(
        cancelButton
    );


    editInput.focus();


    /*
        SAVE EDIT
    */

    saveButton.addEventListener(
        "click",
        function () {

            const newText =
                editInput.value.trim();


            if (newText === "") {

                showTaskMessage(
                    "Delete aja sekalian :')"
                );

                return;

            }


            /*
                Cek duplicate,
            */

            const duplicate =
                tasks.some(
                    function (task, taskIndex) {

                        return (
                            taskIndex !== index &&
                            task.text.toLowerCase() ===
                            newText.toLowerCase()
                        );

                    }
                );


            if (duplicate) {

                showTaskMessage(
                    "Udah ada lah tuh wehhh!"
                );

                return;

            }


            tasks[index].text =
                newText;


            saveTasks();

            renderTasks();

        }
    );


    /*
        CANCEL EDIT
    */

    cancelButton.addEventListener(
        "click",
        function () {

            renderTasks();

        }
    );


    /*
        Enter untuk save
    */

    editInput.addEventListener(
        "keypress",
        function (event) {

            if (event.key === "Enter") {

                saveButton.click();

            }

        }
    );

}


/*
    ADD TASK
*/

taskForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const taskName =
            taskInput.value.trim();


        /*
            Task kosong
        */

        if (taskName === "") {

            showTaskMessage(
                "Minimal Maximal di isi dulu la ygy."
            );

            return;

        }


        /*
            Prevent duplicate task
        */

        if (isDuplicateTask(taskName)) {

            showTaskMessage(
                "Yang lain lahh udah ada tuhh..."
            );

            return;

        }


        /*
            Tambahkan task
        */

        tasks.push({

            id: Date.now(),

            text: taskName,

            completed: false

        });


        saveTasks();

        renderTasks();


        /*
            Kosongkan input
        */

        taskInput.value = "";

        taskInput.focus();

    }
);


/*
    Tampilkan task pertama kali
*/

renderTasks();


/* =========================================
   QUICK LINKS
========================================= */

const linkForm =
    document.getElementById("linkForm");

const linkNameInput =
    document.getElementById("linkName");

const linkUrlInput =
    document.getElementById("linkUrl");

const quickLinks =
    document.getElementById("quickLinks");


/*
    Default links
*/

const defaultLinks = [

    {
        name: "Google",
        url: "https://www.google.com"
    },

    {
        name: "Gmail",
        url: "https://mail.google.com"
    },

    {
        name: "Calendar",
        url: "https://calendar.google.com"
    }

];


/*
    Ambil links dari Local Storage
*/

let links =
    JSON.parse(
        localStorage.getItem(
            "dashboardLinks"
        )
    ) || defaultLinks;


/*
    Simpan links
*/

function saveLinks() {

    localStorage.setItem(
        "dashboardLinks",
        JSON.stringify(links)
    );

}


/*
    Pastikan URL memiliki https
*/

function formatUrl(url) {

    if (
        url.startsWith("http://") ||
        url.startsWith("https://")
    ) {

        return url;

    }


    return "https://" + url;

}


/*
    Tampilkan Quick Links
*/

function renderLinks() {

    quickLinks.innerHTML = "";


    links.forEach(
        function (link, index) {

            const linkElement =
                document.createElement("a");

            linkElement.className =
                "quick-link";

            linkElement.href =
                link.url;

            linkElement.target =
                "_blank";

            linkElement.rel =
                "noopener noreferrer";


            /*
                Nama link
            */

            const name =
                document.createElement("span");

            name.textContent =
                link.name;


            /*
                Remove button
            */

            const removeButton =
                document.createElement("button");

            removeButton.textContent =
                "×";

            removeButton.className =
                "remove-link";

            removeButton.type =
                "button";


            removeButton.addEventListener(
                "click",
                function (event) {

                    /*
                        Jangan buka link
                    */

                    event.preventDefault();

                    event.stopPropagation();


                    links.splice(
                        index,
                        1
                    );


                    saveLinks();

                    renderLinks();

                }
            );


            linkElement.appendChild(
                name
            );

            linkElement.appendChild(
                removeButton
            );


            quickLinks.appendChild(
                linkElement
            );

        }
    );

}


/*
    ADD QUICK LINK
*/

linkForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const name =
            linkNameInput.value.trim();

        const url =
            linkUrlInput.value.trim();


        /*
            Validasi
        */

        if (
            name === "" ||
            url === ""
        ) {

            return;

        }


        /*
            Tambahkan link
        */

        links.push({

            name: name,

            url: formatUrl(url)

        });


        saveLinks();

        renderLinks();


        /*
            Reset input
        */

        linkNameInput.value = "";

        linkUrlInput.value = "";

        linkNameInput.focus();

    }
);


/*
    Render default links
*/

renderLinks();