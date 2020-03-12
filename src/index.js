let addToy = false;



document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  const toysDiv = document.getElementById('toy-collection');
  const form = document.querySelector('.add-toy-form');
  const inputName = document.querySelector('.input-text-name');
  const inputImg = document.querySelector('.input-text-img');
  const submit = document.querySelector('.submit');


  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });

  // gets all data 
  function data() {
    toysDiv.innerHTML = "";
    fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(allToys);
  }

  data();
  

  // creates all toy elements
  function allToys(args) {

    console.log(args)
  
    for(const toy in args) {
      const img = document.createElement('img');
      img.src = args[toy]['image'];
      img.className = "toy-avatar";
  
      const h2 = document.createElement('h2');
      h2.innerText = args[toy]['name'];
  
      const p = document.createElement('p');
      p.innerText = `likes: ${args[toy]['likes']}`;
  
      const button = document.createElement('button');
      button.innerText = "Like";
      button.className = "like-btn";
      button.addEventListener("click", increaseLike);
  
      const div = document.createElement('div');
      div.appendChild(h2);
      div.appendChild(img);
      div.appendChild(p);
      div.appendChild(button);
      
      toysDiv.appendChild(div);
    }
  }

  // add new toy button
  submit.addEventListener("click", addNewToy)

  // add new toy post request
  function addNewToy(event) {
    event.preventDefault();
    const body = {
      "name": inputName.value,
      "image": inputImg.value,
      "likes": 0
    };

    const configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(body)
    };

    fetch('http://localhost:3000/toys', configObj)
    .then(resp => resp.json())
    .then(data());
  }

  // like post request
  function increaseLike(event) {
    event.preventDefault();
    let more = event.target.previousElementSibling.innerText;
    more = more.replace("likes: ", "");
    more = parseInt(more);
    more += 1;
    // let more = parseInt(event.target.previousElementSibling.innerText) + 1;

    // console.log(more);
    // console.log(event.target.previousElementSibling.innerText);
    console.log("like!");
    const body = {
      "likes": more
    }

    const configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(body)
    };

    fetch(`http://localhost:3000/toys/${event.target.id}`, configObj)
    .then(resp => resp.json())
    .then(configObj => {
      event.target.previousElementSibling.innerText = `${more} likes`;
    });
  }
});




