let addToy = false;
const toyCollection = document.getElementById("toy-collection");

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  const form = document.getElementById("toy-form")
  // const likeButton = document.getElementsByClassName("like-btn");

  fetchToys();
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
      

    } else {
      toyForm.style.display = "none";
    }
  });                       

  form.addEventListener("submit", () => {
    event.preventDefault(); 
    const formInputs = form.getElementsByTagName("input");
    let toyName = "";
    let toyImage = "";

    // formInputs.forEach(input => {
      toyName = formInputs.name.value
      toyImage = formInputs.image.value

    // })
    const toy_data = {
      name: toyName,
      image: toyImage
    }

  postToys(toy_data)

  })
  // const likeBtn = document.getElementsByClassName("like-btn");
  if (likeBtn[0] == undefined){
    console.log("WTF")
  }
  else {
    console.log("what is going on?")
  }

  ifthen(likeBtn);

  console.log(likeBtn.length)
  for (let i = 0; i<likeBtn.length-1; i++){
    console.log("WIENER")
    likeBtn[i].addEventListener("click", event =>{
      console.log(`EVENT: ${event.target}`)
    })
  }
    // likeButton.forEach(card => {
    //   card.addEventListener("click", event =>{
    //     console.log(`EVENT: ${event.target}`)
    // })
    //   })           


});

function ifthen(likeBtn){
  if (likeBtn[0] == undefined){
    console.log("WTF")
  }
  else {
    console.log("what is going on?")
  }
}

function renderToys(json){

  const toyCollection = document.getElementById("toy-collection");
  toyCollection.innerHTML = '';

  json.forEach(toy => {
      const card = document.createElement('div');
      card.className = 'card';

      const name = document.createElement('h2');
      name.innerText = toy.name;

      const img = document.createElement('img');
      img.src = toy.image;

      const p = document.createElement('p');
      p.innerText = toy.likes;

      const button = document.createElement('button');
      button.className = 'like-btn';
      button.innerText = 'like <3';

      // const likeBtn = document.getElementsByClassName("like-btn");
      button.addEventListener("click", event =>{
        console.log(`EVENT: ${event.target}`)
        toy.likes +=1
        p.innerText = toy.likes;
      })



      card.appendChild(name);
      card.appendChild(img);
      card.appendChild(p);
      card.appendChild(button);

      toyCollection.appendChild(card);
  })

  // json.forEach(toy => {
  //   toyCollection.innerHTML += `<div class = "card">`
  //   toyCollection.innerHTML += `<h2>${toy.name}</h2>`
  //   toyCollection.innerHTML += `<img src=${toy.image} class = "toy-avatar"/>`
  //   toyCollection.innerHTML += `<p>${toy.likes}</p>`
  //   toyCollection.innerHTML += `<button class="like-btn">Like <3</button>`
  //   toyCollection.innerHTML += `</div>`
  // })
}

function fetchToys(){
  fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(json => {
    renderToys(json)
  })
}

function postToys(toy_data){
  console.log(`TOY_DATA: ${toy_data.name}`)
  const configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify( {
      name: toy_data.name,
      image: toy_data.image,
      likes: 0
    } )
  }
  fetch("http://localhost:3000/toys",configObj)
  .then(fetchToys())
}

function like_button(toy_data){
  const configObj = {
  method :"PATCH",
  headers: 
  {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  body: JSON.stringify({
    likes: ""
  })
  }
  fetch("http://localhost:3000/toys",configObj)
  .then(fetchToys());
}

// function addlike() {
//   const likeButton = document.getElementsByClassName('like-btn')

//   likeButton.forEach(button => {
//     button.addEventListener('click', event => {
//       button.parentNode
//     })
//   }
//     ); 
// }