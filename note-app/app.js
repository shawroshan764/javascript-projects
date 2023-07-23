// C R U D 
// Create Read Update Delete Search

let addNoteContainer = document.getElementById('addNoteContainer')

function showAllNotes() {
    addNoteContainer.style.display = 'none';
    let allNotes;
    let notes = localStorage.getItem("notes")
    if (notes === null) {
        allNotes = []
    } else {
        allNotes = JSON.parse(notes);
    }

    let notesContainer = document.getElementById('notes');
    notesContainer.innerHTML = '';
    allNotes.forEach((note, index) => {
        notesToBeShown = `<div class="card" style="width: 18rem;">
                            <div class="card-body">
                                <h5 class="card-title">${note.title}</h5>
                                <p class="card-text">${note.descp}</p>
                                <button class="btn btn-warning card_btns" onclick="deleteNote(${index})"><img src="./delete.svg" alt="" class="delete_btn"></button>
                                <button class="btn btn-warning card_btns" onclick="editNote(${index})"><img src="./edit.svg" alt="" class="edit_btn"></button>
                            </div>
                        </div>`

        notesContainer.innerHTML = notesContainer.innerHTML + notesToBeShown
    });
}

showAllNotes()

let addNoteBtn = document.getElementById('addNote')
addNoteBtn.addEventListener('click', () => {
    let allNotes;
    let notes = localStorage.getItem("notes")
    if (notes === null) {
        allNotes = []
    } else {
        allNotes = JSON.parse(notes);
    }
    let title = document.getElementById('title')
    let descp = document.getElementById('descp');
    let newNoteObj = {
        title: title.value,
        descp: descp.value
    }

    if (addNoteBtn.innerText === "Update Note") {
        let editCard = document.querySelector('.card')
        let editIndex = editCard.getAttribute('editIndex')
        allNotes[editIndex] = newNoteObj
        Toastify({
            text: "Updated successfully..",
            className: "green",
            gravity: "bottom", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            style: {
              background: "green",
            }
          }).showToast();
    } else if (newNoteObj.title || newNoteObj.descp) {
        allNotes.push(newNoteObj);
        Toastify({
            text: "Added successfully..",
            className: "info",
            gravity: "bottom", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            style: {
              background: "green",
            }
          }).showToast();
    } else {
        Toastify({
            text: "Please write some notes....",
            className: "green",
            gravity: "bottom", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            style: {
              background: "red",
            }
          }).showToast();
    }
    localStorage.setItem("notes", JSON.stringify(allNotes))
    title.value = ''
    descp.value = ''
    showAllNotes()
})

let navAddNoteBtn = document.getElementById('navAddNote')
navAddNoteBtn.addEventListener('click', function () {
    addNoteContainer.style.display = 'block';
    addNoteBtn.innerText = 'Save'
})

let closeNoteDiv = document.getElementById('closeNote');
closeNoteDiv.addEventListener("click", function () {
    addNoteContainer.style.display = 'none';
})

function deleteNote(noteIndex) {
    let allNotes = JSON.parse(localStorage.getItem('notes'));
    allNotes.splice(noteIndex, 1);
    Toastify({
        text: "Deleted successfully..",
        className: "info",
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        style: {
          background: "crimson",
        }
      }).showToast();
    localStorage.setItem("notes", JSON.stringify(allNotes))
    showAllNotes()
}

function editNote(noteIndex) {
    let allNotes = JSON.parse(localStorage.getItem('notes'));
    addNoteContainer.style.display = 'block';
    addNoteBtn.innerText = 'Update Note'

    let title = document.getElementById('title')
    let descp = document.getElementById('descp');
    title.value = allNotes[noteIndex].title
    descp.value = allNotes[noteIndex].descp
    let editCard = document.querySelector('.card')
    editCard.setAttribute('editIndex', `${noteIndex}`)
}


let search = document.getElementById('search')
search.addEventListener('input', () => {
    let inputValue = search.value.toLowerCase()
    let allCards = document.getElementsByClassName('card');

    Array.from(allCards).forEach((ele) => {
        let cardTitle = ele.getElementsByTagName('h5')[0].innerText
        let cardBody = ele.getElementsByTagName('p')[0].innerText

        if (cardTitle.toLowerCase().includes(inputValue) || cardBody.toLowerCase().includes(inputValue)) {
            ele.style.display = 'block';
        }
        else {
            ele.style.display = 'none';
        }
    })
})