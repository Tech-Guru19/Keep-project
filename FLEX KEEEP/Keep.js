const menuToggle = document.getElementById('menu-toggle');
count = false
menuToggle.addEventListener('click', () => {
    if(window.innerWidth <= 766){
        if(count == false){
            count = true
            document.querySelector(".dashboard").style.display = "block"
        }
        else{
            count = false
            document.querySelector(".dashboard").style.display = "none"
        }
    }
    
});

// Dark mode toggle logic
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const lastIcon = document.getElementById("lastIcon")
    // Change emoji icon
    if (body.classList.contains('dark-mode')) {
        themeToggle.textContent = "🌞";
        body.style.backgroundColor = "white";
        document.querySelector(".search-section").style.backgroundColor = "white";
        document.querySelector(".navbar").style.backgroundColor = "white";
        document.querySelectorAll(".nav-item span").forEach((e) => {
            e.style.color = "black"
        })
        document.querySelectorAll(".nav-item.active").forEach((e) => {
            e.style.backgroundColor = "#fef3c0"
        })
        document.querySelectorAll(".nav-item img").forEach((e) => {
            e.style.filter = ""
        })
        document.querySelectorAll(".icon-button img").forEach((e) => {
            e.style.filter = ""
        })
        lastIcon.style.filter = ""
        document.querySelectorAll(".burger div").forEach((e) => {
            e.style.backgroundColor = "black"
        })
        document.querySelectorAll(".cardParent p").forEach((e)=>{
            e.style.color = "black"
        })
        document.querySelectorAll(".cardParent h1").forEach((e)=>{
            e.style.color = "black"
        })
    } else {
        themeToggle.textContent = "🌙";
        body.style.backgroundColor = "#202124";
        document.querySelector(".search-section").style.backgroundColor = "#202124";
        document.querySelector(".navbar").style.backgroundColor = "#202124";
        document.querySelectorAll(".nav-item span").forEach((e) => {
            e.style.color = "white"
        })
        document.querySelectorAll(".nav-item img").forEach((e) => {
            e.style.filter = "invert(1)"
        })
        document.querySelectorAll(".nav-item.active").forEach((e) => {
            e.style.backgroundColor = "#41331c"
        })
        document.querySelectorAll(".icon-button img").forEach((e) => {
            e.style.filter = "invert(1)"
        })
        lastIcon.style.filter = "invert(1)"
        document.querySelector(".icon-button").style.filter = "invert(1)"
        document.querySelectorAll(".burger div").forEach((e) => {
            e.style.backgroundColor = "white"
        })
        document.querySelectorAll(".cardParent p").forEach((e)=>{
            e.style.color = "white"
        })
        document.querySelectorAll(".cardParent h1").forEach((e)=>{
            e.style.color = "white"
        })
        // document.querySelectorAll(".buttonParent .btn").forEach((e) => {
        //     e.style.backgroundColor.filter = "invert(1)"
        // })
        // document.querySelectorAll(".cardParent p").forEach((e) => {
        //     e.style.Color.filter = "invert(1)"
        // })
    }
});

let noteArray = JSON.parse(localStorage.getItem("noteKeep"))||[]

const addBtn = document.getElementById("add")
const display = document.getElementById("show")
const userInput = document.getElementById("inputNote")
const userTitle = document.getElementById("inputTitle")
const uploadImg = document.getElementById("acceptImg")
addBtn.addEventListener("click", () => {
    const file = uploadImg.files[0]
    if (file == undefined) {
        const newObj = {
            note: userInput.value,
            title: userTitle.value,
            img: ""
        }
        noteArray.push(newObj)
        localStorage.setItem("noteKeep",JSON.stringify(noteArray))
        console.log(noteArray);
        mapping()
    }
    else {
        const reader = new FileReader
        reader.addEventListener("load", (e) => {
            const imgBase64 = e.target.result
            console.log(imgBase64);
            const newObj = {
                note: userInput.value,
                title: userTitle.value,
                img: imgBase64
            }
            noteArray.push(newObj)
            localStorage.setItem("noteKeep",JSON.stringify(noteArray))
            console.log(noteArray);
            mapping()
        })
        reader.readAsDataURL(file)
    }
})

const mapping = () => {
    display.innerHTML = ""
    noteArray.map((output, index) => {
        display.innerHTML += `
        <div class="cardParent">
            <h1>${output.title}</h1>
            <p>${output.note}</p>
            <img src="${output.img}">
            <div class="buttonParent">
            <button class="btn" onclick='edit("${index}")'>Edit</button>
                <button class="btn2" onclick='deleteCard("${index}")'>Delete</button>
            </div>
            </div>
            `
        })
}
let i;
const edit = (index) => {
    i = index
    document.querySelector(".editPopOut").style.display = "flex"
    const editInput = document.getElementById("editText")
    const editTitle = document.getElementById("editTitle")
    const editImg = document.getElementById("editImg")
    const editImgInput = document.getElementById("editImgInput")
    editInput.innerHTML = noteArray[index].note
    editTitle.value = noteArray[index].title
    editImg.src = noteArray[index].img
}
const saveEdit = document.getElementById("saveEdit")
saveEdit.addEventListener("click", () => {
    const editInput = document.getElementById("editText")
    const editTitle = document.getElementById("editTitle")
    const editImg = document.getElementById("editImg")
    const editImgInput = document.getElementById("editImgInput")
    document.querySelector(".editPopOut").style.display = "none"
    const file = editImgInput.files[0]
    if (file == undefined) {
        const newObj = {
            note: editInput.value,
            img: editImg.src,
            title:editTitle.value
        }
        noteArray.splice(i, 1, newObj)
        localStorage.setItem("noteKeep",JSON.stringify(noteArray))
        console.log(noteArray);
        setTimeout(() => {
            document.querySelector(".editPopOut").style.display = "none"
        }, 1000);
        mapping()
    }
    else {
        const reader = new FileReader
        reader.addEventListener("load", (e) => {
            const imgBase64 = e.target.result
            editImg.src = imgBase64
            const newObj = {
                note: editInput.value,
                img: imgBase64,
                title:editTitle.value
            }
            noteArray.splice(i, 1, newObj)
            localStorage.setItem("noteKeep",JSON.stringify(noteArray))
            console.log(noteArray);
            setTimeout(() => {
                document.querySelector(".editPopOut").style.display = "none"
            }, 1000);
            mapping()
        })
        reader.readAsDataURL(file)
    }
})
const cancel = () => {
    document.querySelector(".editPopOut").style.display = "none"
}
const deleteCard = (index) => {
    const confirmDialogue = confirm("Do you want to delete card?")
    if (confirmDialogue == true) {
        noteArray.splice(index, 1)
        localStorage.setItem("noteKeep",JSON.stringify(noteArray))
        mapping()
    }
}
mapping()