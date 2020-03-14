let addToy = false

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')

  getAllToyCards()

  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
      
      toyForm.addEventListener('submit', event => {
        event.preventDefault()
        postNewToyCard(event.target)
      })
    } else {
      toyForm.style.display = 'none'
    }
  })

})



function getAllToyCards() {
  let configurationObject = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  };

  return fetch('http://localhost:3000/toys', configurationObject).then(function (response) {
    return response.json();
  })
    .then(function (json) {

      json.forEach(object =>
        createToyCard(object)

      )
    })
}

function createToyCard(obj) {
  let cardDiv = document.createElement('div')
  let h2 = document.createElement('h2')
  let image = document.createElement('img')
  let paragraph = document.createElement('p')
  let button = document.createElement('button')
  let allToys = document.getElementById('toy-collection')

  cardDiv.className = "card"
  image.className = "toy-avatar"
  button.className = "like-btn"
  h2.textContent = obj['name']
  image.src = obj['image']
  paragraph.textContent = `${obj['likes']} Likes`
  button.textContent = "Like <3"

  cardDiv.appendChild(h2)
  cardDiv.appendChild(image)
  cardDiv.appendChild(paragraph)
  cardDiv.appendChild(button)
  allToys.appendChild(cardDiv)

  button.addEventListener('click', event => {
    event.preventDefault()
    const toyNodeChildren = event.toElement.parentNode.children
    findToyInDb(toyNodeChildren[0].textContent, toyNodeChildren[1].src, event)
    
  })
}

function postNewToyCard(target) {
  let configurationObject = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(
      {"name": target.name.value, 
      "image": target.image.value,
      "likes": 0}
    )
  };

  return fetch('http://localhost:3000/toys', configurationObject).then(function (response) {
    return response.json();
  })
    .then(function (json) {
      createToyCard(json)
    })
}


function findToyInDb(name, image, event) {

  let configurationObject = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  };

  return fetch('http://localhost:3000/toys', configurationObject).then(function (response) {
    return response.json();
  })
    .then(function (json) {
      const toyCard = json.filter(function(obj) {
        
        return obj.name === name && obj.image === image
      })
      increaseToyCardLikes(toyCard[0], event)
      
    })

}

function increaseToyCardLikes(jsonObject, event) {

  let configurationObject = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(
      {
        "likes": jsonObject.likes + 1
      }
    )
  }

  return fetch(`http://localhost:3000/toys/${jsonObject.id}`, configurationObject).then((response) => response.json())
    .then((data) => {
      console.log('Success:', data)
      event.target.previousElementSibling.innerHTML = `${data.likes} Likes`

    })
}




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
});

PUT FORM CODE HERE

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

  OR PUT HERE

});