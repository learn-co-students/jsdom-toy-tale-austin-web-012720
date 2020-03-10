let addToy = false;

function getToys() {
  return fetch('http://localhost:3000/toys').then(res => res.json());
}

function postToy(data) {
  fetch('http://localhost:3000/toys'),
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        name: data.name.value,
        image: data.image.value,
        likes: 0
      })
    }
      .then(res => res.json())
      .then(obj_toy => {
        let new_toy = renderToys(obj_toy);
        divCollect.append(new_toy);
      });
}

document.addEventListener('DOMContentLoaded', () => {
  const addBtn = document.querySelector('#new-toy-btn');
  const toyForm = document.querySelector('.container');
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = 'block';
    } else {
      toyForm.style.display = 'none';
    }
  });
});
