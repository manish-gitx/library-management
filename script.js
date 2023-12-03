const nameInput = document.querySelector('.get-name');
const bookInput = document.querySelector('.get-book');
const idInput = document.querySelector('.get-ID');
const addButton = document.querySelector('.sub-input');
const main = document.querySelector('.info');
let count = 1;


window.addEventListener('DOMContentLoaded', () => {
    const data = JSON.parse(localStorage.getItem('libraryData'));
    if (data) {
        data.forEach(item => {
            createRow(item);
        });
    }
});

addButton.addEventListener('click', (event) => {
    event.preventDefault();
    var nameValue = nameInput.value;
    var bookValue = bookInput.value;
    var idValue = idInput.value;

    nameInput.value = '';
    bookInput.value = '';
    idInput.value = '';

    const newDiv = document.createElement('div');
    newDiv.classList.add('row');
    main.appendChild(newDiv);

    const li1 = document.createElement('li');
    const li2 = document.createElement('li');
    const li3 = document.createElement('li');
    const li4 = document.createElement('li');
    const li5 = document.createElement('li');
    const del = document.createElement('button');

    li1.innerText = count;
    newDiv.appendChild(li1);

    li2.innerText = bookValue;
    newDiv.appendChild(li2);

    li3.innerText = nameValue;
    newDiv.appendChild(li3);

    li4.innerText = getdate();
    newDiv.appendChild(li4);

    li5.innerText = idValue;
    newDiv.appendChild(li5);

    del.innerText = "Delete";
    del.classList.add('del-btn');
    newDiv.appendChild(del);

    newDiv.scrollIntoView({ behavior: 'smooth' });

    del.addEventListener('click', () => {
        newDiv.remove();
        updateLi1Values();
        updateLocalStorage();
    });

    function getdate() {
        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        var ans = `${day}-${month}-${year}`;
        return ans;
    }

    count++;
    updateTable();
    updateLocalStorage();
});

function updateLi1Values() {
    const divs = document.querySelectorAll('.row');
    divs.forEach((div, index) => {
        const li1 = div.querySelector('li:first-child');
        li1.innerText = index + 1;
    });

    count = divs.length + 1;
}

function updateLocalStorage() {
    const rows = document.querySelectorAll('.row');
    const data = [];
    rows.forEach(row => {
        const li1 = row.querySelector('li:first-child');
        const li2 = row.querySelector('li:nth-child(2)');
        const li3 = row.querySelector('li:nth-child(3)');
        const li4 = row.querySelector('li:nth-child(4)');
        const li5 = row.querySelector('li:nth-child(5)');
        const item = {
            count: li1.innerText,
            book: li2.innerText,
            name: li3.innerText,
            date: li4.innerText,
            id: li5.innerText
        };
        data.push(item);
    });
    localStorage.setItem('libraryData', JSON.stringify(data));
}

function createRow(item) {
    const newDiv = document.createElement('div');
    newDiv.classList.add('row');
    main.appendChild(newDiv);

    const li1 = document.createElement('li');
    const li2 = document.createElement('li');
    const li3 = document.createElement('li');
    const li4 = document.createElement('li');
    const li5 = document.createElement('li');
    const del = document.createElement('button');

    li1.innerText = item.count;
    newDiv.appendChild(li1);

    li2.innerText = item.book;
    newDiv.appendChild(li2);

    li3.innerText = item.name;
    newDiv.appendChild(li3);

    li4.innerText = item.date;
    newDiv.appendChild(li4);

    li5.innerText = item.id;
    newDiv.appendChild(li5);

    del.innerText = "Delete";
    del.classList.add('del-btn');
    newDiv.appendChild(del);

    newDiv.scrollIntoView({ behavior: 'smooth' });

    del.addEventListener('click', () => {
        newDiv.remove();
        updateLi1Values();
        updateLocalStorage();
    });
}


