const nameInput = document.querySelector('.get-name');
const bookInput = document.querySelector('.get-book');
const idInput = document.querySelector('.get-ID');
const addButton = document.querySelector('.sub-input');
const main = document.querySelector('.info');
let count = 1;

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
});


function updateLi1Values() {
    const divs = document.querySelectorAll('.row');
    divs.forEach((div, index) => {
        const li1 = div.querySelector('li:first-child');
        li1.innerText = index + 1;
    });

    const lastDiv = divs[divs.length - 1];
    const lastLi1 = lastDiv.querySelector('li:first-child');
    var check=parseInt(lastLi1.innerText);
    if(check==1){
        count=1;
    }
    else{
        count = parseInt(lastLi1.innerText)+1;
    }
    

}
