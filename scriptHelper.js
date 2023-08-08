require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    // Here is the HTML formatting for our mission target div.

    let div = document.getElementById('missionTarget')
    div.innerHTML = `
                 <h2>Mission Destination</h2>
                 <ol>
                     <li>Name: ${name}</li>
                     <li>Diameter: ${diameter}</li>
                     <li>Star: ${star}</li>
                     <li>Distance from Earth: ${distance}</li>
                     <li>Number of Moons: ${moons}</li>
                 </ol>
                 <img src="${imageUrl}">
                 `

}

function validateInput(testInput) {
    let numInput = Number(testInput)


    if (testInput === '') {
        return 'Empty';

    } else if (isNaN(numInput)) {
        return 'Not A Number';
    } else if (isNaN(numInput) === false) {
        return 'Is A Number';
    }

}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    let pilotStatus = document.getElementById('pilotStatus')
    let copilotStatus = document.getElementById('copilotStatus')
    let fuel = document.getElementById('fuelStatus')
    let cargo = document.getElementById('cargoStatus')








    if (validateInput(pilot) === 'Empty' || validateInput(copilot) === 'Empty' || validateInput(fuelLevel) === 'Empty' || validateInput(cargoLevel) === 'Empty') {
        alert('All fields are required!')
    } else if (validateInput(pilot) === 'Is A Number' || validateInput(copilot) === 'Is A Number' || validateInput(fuelLevel) === 'Not A Number' || validateInput(cargoLevel) === 'Not A Number') {
        console.log(copilot)
        alert('Make sure to enter valid information for each field!')
    } else {
        console.log(fuelLevel, cargoLevel)
        list.style.visibility = 'visible';
        pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`
        copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`
        let launchStatus = document.getElementById('launchStatus')
        checkLevels(fuelLevel, cargoLevel, fuel, cargo, launchStatus);
    }
}

function checkLevels(fuelLevel, cargoLevel, fuel, cargo, launchStatus) {
    if (fuelLevel < 10000 && cargoLevel <= 10000) {
        fuel.innerHTML = `Fuel level too low for launch`;
        cargo.innerHTML = `Cargo mass low enough for launch`;
        launchStatus.innerHTML = `Shuttle not ready for launch`;
        launchStatus.style.color = 'red';
    } else if (fuelLevel >= 10000 && cargoLevel > 10000) {
        fuel.innerHTML = `Fuel level high enough for launch`;
        cargo.innerHTML = `Cargo mass too heavy for launch`;
        launchStatus.innerHTML = `Shuttle not ready for launch`;
        launchStatus.style.color = 'red';
    } else if (fuelLevel < 10000 && cargoLevel > 10000) {
        fuel.innerHTML = `Fuel level too low for launch`;
        cargo.innerHTML = `Cargo mass too heavy for launch`;
        launchStatus.innerHTML = `Shuttle not ready for launch`;
        launchStatus.style.color = 'red';

    } else {
        fuel.innerHTML = `Fuel level high enough for launch`;
        cargo.innerHTML = `Cargo mass low enough for launch`;
        launchStatus.innerHTML = `Shuttle is ready for launch`;
        launchStatus.style.color = 'green';

    }
}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then(function (response) {
        if (response.status >= 400) {
            throw new Error("Bad Response")
        } else {
            return response.json()
        }
    });

    return planetsReturned;
}

function pickPlanet(planets) {
    let index = Math.floor(Math.random() * planets.length)
    return planets[index]
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;