const addBox = document.querySelector(".add-box"),
popupBox = document.querySelector(".popup-box"),
popupTitle = popupBox.querySelector("header p"),
closeIcon = popupBox.querySelector("header span"),
titleTag = popupBox.querySelector("input"),
descTag = popupBox.querySelector("textarea"),
addBtn = popupBox.querySelector("button");

const months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];
const notes = JSON.parse(localStorage.getItem("notes") || "[]") //GETTING LOCAL STORAGE NOTES IF EXIST AND PARSING THEM TO JS object else passing an empty array to notes

let isUpdate= false, updateId;
addBox.addEventListener("click", () =>
{
    titleTag.focus();
    popupBox.classList.add("show") /*like yeh humare popup boc ki class mein show add krdega jisse popupshow vali class chalne lagegii */
});
closeIcon.addEventListener("click", () => {
    isUpdate= false;
    titleTag.value=" ";//inse title aur descriptions ki value blank hojyega refresh ya add note dabane k baad
    descTag.value=" ";
    popupBox.classList.remove("show")
    addBtn.innerText="Add Note";
    popupTitle.innerText="Add a New Note";
})
function showNotes() {
    document.querySelectorAll(".note").forEach(note => note.remove());
    notes.forEach((note, index) => {

       let liTag = `<li class="note">
       <div class="details">
         <p class="titleCard">${note.title}</p>
         <span>${note.description}</span>
       </div>
       <div class="bottom-content">
         <span>${note.date}</span>
         <div class="settings">
          <span onclick="showMenu(this)"> &#x2026; </span>
           <ul class="menu">
             <li onClick="updateNote(${index}, '${note.title}','${note.description}')"><span>✏️Edit</span></li>
             <li onclick="deleteNote(${index})"><span>🗑️Del</span></li>
           </ul>
         </div>
       </div>
     </li>`;
     addBox.insertAdjacentHTML("afterend", liTag);
    });
}
showNotes();
//showing notes from local storage

function showMenu(elem) {
    elem.parentElement.classList.add('show');
    document.addEventListener("click", e => {
        //removing show class from the setting menu on document click
        if( e.target != elem) {
            elem.parentElement.classList.remove('show');
        }
    });
}

 
function deleteNote(noteId) {
    let confirmDel = confirm("Are you sure you want to delete this note?");
    if(!confirmDel) return;
    notes.splice(noteId, 1);//deleting selected note from array
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
}

function updateNote(noteId, title, desc) {
     addBox.click();
     updateId=noteId
     isUpdate= true;
     titleTag.value=title;
     descTag.value=desc;
     addBtn.innerText="Update Note";
     popupTitle.innerText="Update a Note"
}
addBtn.addEventListener("click", e => {
    e.preventDefault();
    let noteTitle=titleTag.value;
    noteDesc=descTag.value;
       
       if(noteTitle || noteDesc) {
        let dateObj = new Date(),
        month = months[dateObj.getMonth()],
        day = dateObj.getDate(),
        year = dateObj.getFullYear();

        let noteInfo ={
            title: noteTitle, description: noteDesc,
            date: `${month} ${day}, ${year}`
        }
        if(!isUpdate) {
            notes.push(noteInfo); //adding new note to notes// 
        }
        else {
            isUpdate = false;
            notes[updateId] = noteInfo; //updating specified note
        }
        
        localStorage.setItem('notes',JSON.stringify(notes)) //adding notes to local storage
        closeIcon.click();
        showNotes();
    }
})

// funtion for search option//
let search = document.getElementById('searchTxt');
search.addEventListener('input', function () {
    let inputVal = search.value.toLowerCase().toUpperCase();
    let titleCard = document.getElementsByClassName('note');
    Array.from(titleCard).forEach(function(element) {
        let cardTxt = element.getElementsByClassName("titleCard")[0].innerText;
        if (cardTxt.includes(inputVal)) {
            element.style.display = "flex";
        }
        else {
            element.style.display = "none";
        }
    })


})