class Animal {
  static lastId = 0; // Statisk egenskap för att spåra det senaste tilldelade ID:t

  constructor(id, name, animalType, behaviors, imageUrl, tiredness = 50, hunger = 50, loneliness = 50, happiness = 50) {
      this.id = id || ++Animal.lastId;
      this.name = name;
      this.animalType = animalType;
      this.behaviors = behaviors;
      this.maxValue = 100;
      this.state = {
          tiredness: tiredness,
          hunger: hunger,
          loneliness: loneliness,
          happiness: happiness
      };
      this.imageUrl = imageUrl;
  }

  feed(){
    this.state.hunger -= this.behaviors.feed.hungerChange;
    this.updateState();
    this.message(this.behaviors.feed.message);
    updateAndSaveAnimals(this);
  }

  play() {
    this.state.loneliness -= this.behaviors.play.lonelinessChange;
    this.state.happiness += this.behaviors.play.happinessChange;
    this.updateState();
    this.message(this.behaviors.play.message);
    updateAndSaveAnimals(this);
  }

  nap() {
    this.state.tiredness -= this.behaviors.nap.tirednessChange;
    this.updateState();
    this.message(this.behaviors.nap.message);
    updateAndSaveAnimals(this);
  }

  message(actionMessage) {
    const messageBoxSelector = `#animal-card-${this.id} .message-box`;
    const messageBox = document.querySelector(messageBoxSelector);

    if (messageBox) {
      const messageText = document.createElement('p');
      messageText.textContent = `${this.name} ${actionMessage}`;
      messageBox.innerHTML = ''; // Rensa tidigare meddelanden
      messageBox.appendChild(messageText);

      setTimeout(() => {
        messageBox.removeChild(messageText);
      }, 1500);
  } else {
    console.log("Kunde inte hitta meddelandeboxen för djuret med ID:", this.id);
  }
    // alert(`${this.name} ${actionMessage}`)
    console.log(`${this.name} ${actionMessage}. Hunger: ${this.state.hunger}, Trötthet: ${this.state.tiredness}, Ensamhet:${this.state.loneliness}, Lycka: ${this.state.happiness}`);
  }

  updateState() {
    for (let key in this.state){
      this.state[key] = Math.min(this.state[key], this.maxValue);
      this.state[key] = Math.max(this.state[key], 0);
    }
  }

}

class Nynco extends Animal {
  constructor(id, name, tiredness, hunger, loneliness, happiness) {
    super(id, name, "Nynco", {
      feed: { hungerChange: 18, message: "slukar i sin maten" },
      play: { lonelinessChange: 10, happinessChange: 20, message: "springer vilt och fritt" },
      nap: { tirednessChange: 25, message: "snarkar högt" },
    }, "image/nynco.webp", tiredness, hunger, loneliness, happiness);
  }
}

class Aielhound extends Animal {
  constructor(id, name, tiredness, hunger, loneliness, happiness) {
    super(id, name, "Aielhound", {
      feed: { hungerChange: 8, message: "slukar med glädje sin specialmat" },
      play: { lonelinessChange: 15, happinessChange: 20, message: "springer vilt och fritt" },
      nap: { tirednessChange: 25, message: "snarkar högt under sin vila" },
    }, "image/aielhound.webp", tiredness, hunger, loneliness, happiness);
  }
   // Exempel på överriden metod, om nödvändigt
   play() {
    super.play(); // Anropar grundklassens play-metod
    console.log("Aielhounden gör en extra glädjesvansviftning!");
  }
}

class Dragco extends Animal {
  constructor(id, name, tiredness, hunger, loneliness, happiness) {
    super(id, name, "Dragco", {
      feed: { hungerChange: 10, message: "glupsar i sin maten" },
      play: { lonelinessChange: 10, happinessChange: 20, message: "flyger vilt och fritt" },
      nap: { tirednessChange: 25, message: "andas rök i sömnen" },
    }, "image/dragco.webp", tiredness, hunger, loneliness, happiness);
  }
}

//Create Object
let createAnimal = (id,name, type) => {
  switch (type) {
    case "Nynco":
      return new Nynco(id, name);
    case "Aielhound":
      return new Aielhound(id, name);
    case "Dragco":
      return new Dragco(id, name);
    default:
      return null;
  }
}

//Get array from localStorage or make a new one
let animals = JSON.parse(localStorage.getItem('animals')) || [];

document.addEventListener('DOMContentLoaded', () => {

  animals.forEach(animal => {
    switch (animal.animalType) {
      case "Nynco":
        createAnimalCard(new Nynco(animal.id, animal.name, animal.state.tiredness, animal.state.hunger, animal.state.loneliness, animal.state.happiness));
        break;
      case "Aielhound":
        createAnimalCard(new Aielhound(animal.id, animal.name, animal.state.tiredness, animal.state.hunger, animal.state.loneliness, animal.state.happiness));
        break;
      case "Dragco":
        createAnimalCard(new Dragco(animal.id, animal.name, animal.state.tiredness, animal.state.hunger, animal.state.loneliness, animal.state.happiness));
        break;
      default:
        break;
    }
  });

});

//Add object ti array and update array to localStorage
let addAnimal = () => {
  const name = document.querySelector("#name").value;
  const type = document.querySelector("#pets").value;

  const storedAnimals = JSON.parse(localStorage.getItem('animals')) || [];
  Animal.lastId = storedAnimals.reduce((max, animal) => Math.max(max, animal.id), 0);
  let id = ++Animal.lastId;

  const animal = createAnimal(id, name, type);
  if (animal) {
    animals.push(animal);
    localStorage.setItem('animals', JSON.stringify(animals));
    createAnimalCard(animal);
  } else {
    return console.log("Fel på skapa djur.")
  }
}
console.log(animals);

//update object states when action is made. From array to localStorage
let updateAndSaveAnimals = (animal) => {
  let s = animals.indexOf(animals.find((item) => item.id == animal.id));
  let x = animals.find((item) => item.id == animal.id);
  animals.splice(s,1,animal);

  localStorage.setItem('animals', JSON.stringify(animals));
}


document.querySelector("#save-pet").addEventListener('click', addAnimal);

//Delete object from array and then update localStorage.
let killAnimal = (animalId) => {
  const isConfirmed = confirm("Are you sure you want to kill your baby?");
  if (isConfirmed) {
    animals = animals.filter(animal => animal.id !== animalId);
    localStorage.setItem('animals', JSON.stringify(animals));

    const cardToRemove = document.getElementById(`animal-card-${animalId}`);
    if (cardToRemove) {
      cardToRemove.remove();
    }

    window.location.reload();
  } else {
    console.log("No killing!")
  }
  

  
}


let createAnimalCard = (animal) => {
  const cardElement = document.createElement('div');
  cardElement.classList.add("animal-card");
  cardElement.id = `animal-card-${animal.id}`;

  const imageElement = document.createElement('img');
  imageElement.src = animal.imageUrl;
  imageElement.alt = `Bild av en ${animal.animalType}`;
  imageElement.classList.add("animal-image");
  cardElement.appendChild(imageElement);

  const nameElement = document.createElement('h2');
  nameElement.textContent = animal.name;
  cardElement.appendChild(nameElement);

  const typeElement = document.createElement('h3');
  typeElement.textContent = `${animal.animalType}`;
  cardElement.appendChild(typeElement);

  const messageBox = document.createElement('div');
  messageBox.classList.add("message-box");
  cardElement.appendChild(messageBox);

  const progressWrapper = document.createElement('div');
  progressWrapper.classList.add("progress-wrapper");
  Object.keys(animal.state).forEach((key) => {
    const progressContainer = document.createElement('div');
    progressContainer.classList.add("progress-container");
    const progressLabel = document.createElement('label');
    progressLabel.textContent = key.charAt(0).toUpperCase() + key.slice(1);
    const progressBar = document.createElement('progress');
    progressBar.id = key;
    progressBar.max = 100;
    progressBar.value = animal.state[key];

    progressContainer.append(progressLabel, progressBar);
    progressWrapper.appendChild(progressContainer);
    cardElement.appendChild(progressWrapper);
  });

  //skapar knappar för interaktion
  const actions = ['feed', 'play', 'nap'];
  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add("btn-container");
  actions.forEach((action) => {
    const button = document.createElement('button');
    button.classList.add("action-btn");
    button.textContent = action.charAt(0).toUpperCase() + action.slice(1);
    button.addEventListener('click', () => {
      animal[action]();
      updateAnimalCard(animal, cardElement);
    });
    buttonContainer.appendChild(button);
  });
  cardElement.appendChild(buttonContainer);

  const killButton = document.createElement('button');
  killButton.textContent = "Kill your creature";
  killButton.classList.add('kill-button');
  cardElement.appendChild(killButton);
  killButton.addEventListener('click', () => {
    killAnimal(animal.id);
  })


  const container = document.querySelector("#animalCardsContainer");
  container.appendChild(cardElement);

}
let updateAnimalCard = (animal, cardElement) => {
  Object.keys(animal.state).forEach((key) => {
    const progressBar = cardElement.querySelector(`progress#${key}`);
    progressBar.value = animal.state[key];
  });
}