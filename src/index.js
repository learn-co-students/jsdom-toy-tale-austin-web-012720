let addToy = false;
let toyData = [];

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  toyForm.onsubmit = createToy
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });
});

function getToys(){
  return fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(data => {
    console.log(data)
    toyData = data;
    const toyCollection = document.getElementById('toy-collection')
    data.forEach(toy => {
      const toyDiv = document.createElement('div')
      const h2 = document.createElement('h2')
      const toyImg = document.createElement('img')
      const toyP = document.createElement('p')
      const toyButton = document.createElement('button')

      toyDiv.classList.add("card")
      toyImg.classList.add("toy-avatar")
      toyButton.classList.add("like-btn")
      toyButton.id = toy.id
      toyButton.onclick = addLikes
            
      h2.innerText = toy.name
      toyImg.src = toy.image
      toyP.innerText = toy.likes
      toyP.id = `toy-likes-${toy.id}`
      toyButton.innerText = "Like"

      
      toyDiv.appendChild(h2);
      toyDiv.appendChild(toyImg);
      toyDiv.appendChild(toyP);
      toyDiv.appendChild(toyButton);
      toyCollection.appendChild(toyDiv);

    })
  })
}

function createToy(event){
  event.preventDefault();
  const form = event.target;

  const formData = {
    name: form.name.value,
    image: form.image.value,
    likes: 0
  };

  const options = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(formData)
  };
  fetch('http://localhost:3000/toys', options)
  .then(response => response.json)
  .then(data => {
    console.log(data)
  })

}

function addLikes(e) {
  const id = e.target.id
  const likes = e.target.likes
  const toy = toyData.filter(toy => toy.id == id)[0];
  toy.likes += 1
  const likesOption = {
    method: 'PATCH',
    headers: {
      "Content-Type": 'application/json',
      Accept: "application/json"
    },
    body: JSON.stringify({
      likes: toy.likes
    })
  }
  fetch(`http://localhost:3000/toys/${toy.id}`, likesOption)
  .then(res => res.json())
  .then((newToy) => {
    const toyLikes = document.getElementById(`toy-likes-${toy.id}`)
    toyLikes.innerText = newToy.likes
  });
}



getToys()