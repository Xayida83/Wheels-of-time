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
      setInterval(() => {
        this.updateWithTimeInterval();
      }, 100000);
  }
  

  feed(){
    this.state.hunger -= this.behaviors.feed.hungerChange;
    this.state.happiness += this.behaviors.feed.happinessChange;
    this.state.tiredness -= this.behaviors.feed.tirednessChange;
    this.state.loneliness -= this.behaviors.feed.lonelinessChange;

    this.updateState();
    this.message(this.behaviors.feed.message);
    updateAndSaveAnimals(this);
  }

  play() {
    this.state.loneliness -= this.behaviors.play.lonelinessChange;
    this.state.happiness += this.behaviors.play.happinessChange;
    this.state.hunger += this.behaviors.play.hungerChange;
    this.state.tiredness -= this.behaviors.play.tirednessChange;

    this.updateState();
    this.message(this.behaviors.play.message);
    updateAndSaveAnimals(this);
  }

  nap() {
    this.state.tiredness -= this.behaviors.nap.tirednessChange;
    this.state.happiness += this.behaviors.nap.happinessChange;
    this.state.hunger += this.behaviors.nap.hungerChange;
    this.state.loneliness -= this.behaviors.nap.lonelinessChange;

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
      }, 10000);
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

  updateWithTimeInterval() {
    this.state.tiredness = Math.min(this.state.tiredness + 10, this.maxValue);
    this.state.hunger = Math.min(this.state.hunger + 10, this.maxValue);
    this.state.loneliness = Math.min(this.state.loneliness + 10, this.maxValue);
    this.state.happiness = Math.min(this.state.happiness - 10, this.maxValue)
    
    this.updateState();

    const cardElement = document.getElementById(`animal-card-${this.id}`);
    updateAnimalCard(this, cardElement);
    updateAndSaveAnimals(this)
  }
  

}

class Nynco extends Animal {
  constructor(id, name, tiredness, hunger, loneliness, happiness) {
    super(id, name, "Nynco", {
      feed: { hungerChange: 25, happinessChange: 2, tirednessChange: 2, lonelinessChange: 5, message: "flicked its tail, it ensnared the ethereal meal, consuming it with a glow of arcane delight." },
      play: { lonelinessChange: 25, happinessChange: 25, hungerChange: 2, tirednessChange: 2, message: "leaps through the air that challenge gravity, laughter echoing in the ether." },
      nap: { tirednessChange: 50, happinessChange: 5, hungerChange:2, lonelinessChange: 1, message: "curled beneath the boughs of an ageless tree, it slumbered, a guardian of forgotten tales." },
    }, "image/nynco.webp", tiredness, hunger, loneliness, happiness);
  }

  updateWithTimeInterval() {
    this.state.tiredness = Math.min(this.state.tiredness + 1, this.maxValue);
    this.state.hunger = Math.min(this.state.hunger + 1, this.maxValue); 
    this.state.loneliness = Math.min(this.state.loneliness + 10, this.maxValue); 
    this.state.happiness = Math.min(this.state.happiness - 10)
    this.updateState();
    const cardElement = document.getElementById(`animal-card-${this.id}`);
    updateAnimalCard(this, cardElement);
    updateAndSaveAnimals();
  }
}

class Aielhound extends Animal {
  constructor(id, name, tiredness, hunger, loneliness, happiness) {
    super(id, name, "Aielhound", {
      feed: { hungerChange: 30, happinessChange: 10, tirednessChange: 4, lonelinessChange: 5, message: "tackled his meal with the ferocity of a warrior, leaving nothing behind." },
      play: { lonelinessChange: 50, happinessChange: 30, hungerChange: 5, tirednessChange: 5, message: "chased the wind in a dance of power and grace, a sight to behold, free and unbound." },
      nap: { tirednessChange: 50, happinessChange: 3, hungerChange: 3, lonelinessChange: 1, message: "slept, in the embrace of the earth, dreams echoing the ancient songs of its kind." },
    }, "image/aielhound.webp", tiredness, hunger, loneliness, happiness);
  }
  updateWithTimeInterval() {
    this.state.tiredness = Math.min(this.state.tiredness + 5, this.maxValue);
    this.state.hunger = Math.min(this.state.hunger + 5, this.maxValue); 
    this.state.loneliness = Math.min(this.state.loneliness + 15, this.maxValue); 
    this.state.happiness = Math.min(this.state.happiness - 10, this.maxValue); 

    this.updateState();
    const cardElement = document.getElementById(`animal-card-${this.id}`);
    updateAnimalCard(this, cardElement);
    updateAndSaveAnimals(this);
  }
}

class Dragco extends Animal {
  constructor(id, name, tiredness, hunger, loneliness, happiness) {
    super(id, name, "Dragco", {
      feed: { hungerChange: 90, happinessChange: 30, tirednessChange: 1, lonelinessChange: 10, message: "slurped that meal down faster than you can say 'Feast'!" },
      play: { lonelinessChange: 30, happinessChange: 25, hungerChange: 40, tirednessChange: 35, message: "darted and swooped through the air, a blur of joy and freedom." },
      nap: { tirednessChange: 20, happinessChange: 5, hungerChange: 1, lonelinessChange: 1, message: "snored with the gentle rumble of a distant thunder, deep in dreamland." },
    }, "image/dragco.webp", tiredness, hunger, loneliness, happiness);
  }
  updateWithTimeInterval() {
    this.state.tiredness = Math.min(this.state.tiredness + 10, this.maxValue); 
    this.state.hunger = Math.min(this.state.hunger + 3, this.maxValue); 
    this.state.loneliness = Math.min(this.state.loneliness + 14, this.maxValue); 
    this.state.happiness = Math.min(this.state.happiness - 20, this.maxValue); 

    
    this.updateState();
    const cardElement = document.getElementById(`animal-card-${this.id}`);
    updateAnimalCard(this, cardElement);
    updateAndSaveAnimals(this);
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
  
  if (!cardElement) {
    console.log(`Could not find card ${animal.id}`)
  }
  Object.keys(animal.state).forEach((key) => {
    const progressBar = cardElement.querySelector(`progress#${key}`);
    console.log(progressBar);
    console.log(animal.state[key]);
    progressBar.value = animal.state[key];
  });
}