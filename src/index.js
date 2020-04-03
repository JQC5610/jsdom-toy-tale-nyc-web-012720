const toyUrl = 'http://localhost:3000/toys'


let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const toyCollection = document.querySelector('#toy-collection')
  

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

getToys()

function getToys(){
  return fetch(toyUrl)
  .then(resp => resp.json())
  .then(toys => {
    toys.forEach(toy => {
      renderToys(toy)
    })
  })
}

function renderToys(toy){
let div = document.createElement('div')
div.className = "card"
div.dataset.id = toy.id

let h2 = document.createElement('h2')
h2.innerText = toy.name

let img = document.createElement('img')
img.src = toy.image
img.className = "toy-avatar"

let p = document.createElement('p')
p.innerText = toy.likes

let button = document.createElement('button')
button.className = "like-btn"
button.innerText = "Like <3"

div.appendChild(h2)
div.appendChild(img)
div.appendChild(p)
div.appendChild(button)


toyCollection.append(div)
}

toyForm.addEventListener('submit', function(event){

event.preventDefault()

postToy(event.target)

event.target.reset()
})

function postToy(toy_data){
  fetch(toyUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      "name": toy_data.name.value,
      "image": toy_data.image.value,
      "likes": 0

    })
  })
  .then(resp => resp.json())
  .then((obj_toy) => {
    let new_toy = renderToys(obj_toy)
    toyCollection.append(new_toy)
  })
}

document.addEventListener('click', function(event){
  if(event.target.className === "like-btn"){
    let button = event.target
    let parent = button.parentNode
    let id = parent.dataset.id
    let likes = parent.querySelector("p")
    let upLike = parseInt(likes.innerText)
    upLike++

    likes.innerText = upLike

    fetch(`http://localhost:3000/toys/${id}`, {
      method: "PATCH",
      headers:{
        "content-type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify ({likes})
    })
    .then(resp => resp.json())
    .then(console.log)
  }

})


});


// Deliverable 1
  //fetch toys using GET, render toys on to page
  // Each toy should look like
  //   <div class="card">
  //   <h2>Woody</h2>
  //   <img src=toy_image_url class="toy-avatar" />
  //   <p>4 Likes </p>
  //   <button class="like-btn">Like <3</button>
  //   </div>

// Deliverable 2 - Add New Toy
  //  fetch toys using POST to create a new toy
  //  have toy persist on browser and add to DB

// Deliverable 3 - Increase Toy's Likes
  // Patch request to http://localhost:3000/toys/:id
