/* eslint-disable no-undef */
let addToy = false;
let toyList = [];

document.addEventListener('DOMContentLoaded', () => {
  const addBtn = document.querySelector('#new-toy-btn');
  const toyForm = document.querySelector('.container');
  const submitBtn = document.querySelector('.add-toy-form');

  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = 'block';
    } else {
      toyForm.style.display = 'none';
    }
  });

  submitBtn.addEventListener('submit', postNewToy);
});

///***** Outside of DOM Content Loaded */

function fetchToys() {
  fetch('http://localhost:3000/toys')
    .then((response) => response.json())
    .then((json) => {
      toyList = json;
      renderToyList();
    });
}

function postNewToy(event) {
  event.preventDefault();       // If you forget this, it sucks!
  const toyName = event.target.elements[0].value;
  const imageUrl = event.target.elements[1].value;

  const formData = {
    id: toyList.length + 1,
    name: toyName,
    image: imageUrl,
    likes: 0,
  };

  const configObj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(formData),
  };

  fetch('http://localhost:3000/toys', configObj)
    .then((response) => response.json())
    .then((object) => {
      toyList.push(object);
      renderToyList();
      location.reload();  //????????
    });
}

function renderToyList() {
  const toyListsDiv = document.getElementById('toy-collection');
  toyListsDiv.innerHTML = '';
  toyList.forEach((toy) => {
    // console.log(toy);
    const toyDiv = createToyDiv(toy);
    toyListsDiv.appendChild(toyDiv);
    likeListner(toyDiv, toy.id);
  });
}

function createToyDiv(toy) {
  const toyDiv = document.createElement('div');
  toyDiv.className = 'card';
  toyDiv.innerHTML = `<h2>${toy.name}</h2><img src=${toy.image} class="toy-avatar"><p>${toy.likes}</p><button class="like-btn">Click Me</button>`;
  return toyDiv;
}

function likeListner(toyDiv, toyId) {
  btn = toyDiv.querySelector('button');
  btn.addEventListener('click', () => {
    likeNode = toyDiv.querySelector('p');
    likeNode.innerText = parseInt(likeNode.innerText, 10) + 1;
    const url = `http://localhost:3000/toys/${toyId}`;

    const configObj = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(
        { likes: parseInt(likeNode.innerText, 10) },
      ),
    };

    fetch(url, configObj)
      .then((response) => response.json())
      // .then((object) => console.log(object))
      .catch((error) => {
        alert("Woody isn't happy with that request!");
        console.log(error.message);
      });
  });
}

fetchToys();
