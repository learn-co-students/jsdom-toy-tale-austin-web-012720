const url = 'http://localhost:3000/toys'
let addToy = false;
//allToys is an array of toy objects
let toyArray;


document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });

  const addAToyForm = document.querySelector('.add-toy-form');
  addAToyForm.addEventListener('submit', event => postToy(event));

  function postToy(event) {
    event.preventDefault();

    let toyData = {
      "name": event.target.name.value,
      "image": event.target.image.value,
      "likes": 0
    };
    
    fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body:JSON.stringify(toyData)
    })
      .then(response => response.json())
      .then(results => {
        toyArray.push(results);
        renderAllToys();
      });

  };

  fetchToys();
});




function fetchToys() {
  fetch(url)
    .then(response => response.json())
    .then(results => {
      toyArray = results
      renderAllToys();
  });
};

function createAToy(toyObject) {
  const toyContainer = document.getElementById('toy-collection');

  let newDiv = document.createElement('div');
  newDiv.setAttribute('class', 'card');

  newDiv.innerHTML = `
    <h2>${toyObject.name}</h2>
    <img src=${toyObject.image} class="toy-avatar" />
    <p>${toyObject.likes} Likes </p>
    <button class="like-btn">Like &#9829</button>`

  toyContainer.appendChild(newDiv);
};

function renderAllToys() {
  for(const toy in toyArray){
    createAToy(toyArray[toy]);
  };
}; 



