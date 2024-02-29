/**
 * FETCH API
 * 
 * Syntaxe :
 * 
 * ```js
 * const fetchPromise = fetch(resource, requestParameters?);
 * ```
 */

// function getRegions() {
//   fetch('https://geo.api.gouv.fr/regions')
//   .then((response) => {
//     console.log(response);
//     // on doit transformer la réponse (le corps de la réponse)
//     // en format lisible
//     return response.json(); // .text(), .blob()
//   })
//   .then((data) => {
//     console.log(data);
//     console.log(data[4].nom);

//   })
//   .catch(console.error);
// }

// getRegions();

// Avec async/await
async function displayRegions() {
  try {
    // 1. on récupère la réponse de l'API
    const response = await fetch('https://geo.api.gouv.fr/regions');
    // 2. on récupère les données de la réponse en objet JS
    // note : les résultats sont renvoyées en JSON,
    // je parse grâce à `.json()`
    const data = await response.json();

    // 3. on va créer un élément pour chaque région :
    // à partir d'un tableau de données,
    // je veux un tableau d'éléments
    // → `Array.prototype.map`
    // const elements = data.map((region) => createRegionElement(region));
    const elements = data.map(createRegionElement);

    document.getElementById('regions__list').append(...elements);
  } catch (error) {
    console.error(error);
  }
}

async function displayDepartments(code) {
  try {
    // 1. on récupère la réponse de l'API
    const response = await fetch(`https://geo.api.gouv.fr/regions/${code}/departements`);
    // 2. on récupère les données de la réponse en objet JS
    // note : les résultats sont renvoyées en JSON,
    // je parse grâce à `.json()`
    const data = await response.json();
    console.log(data);
    // 3. on va créer un élément pour chaque région :
    // à partir d'un tableau de données,
    // je veux un tableau d'éléments
    // → `Array.prototype.map`
    const elements = data.map(createDepartmentElement);

    document.getElementById('departments__list').append(...elements);
  } catch (error) {
    console.error(error);
  }
}

function createRegionElement({ nom, code }) {
  const regionElement = document.createElement('li');
  regionElement.textContent = nom;
  // on peut passer l'info par les data-attributes
  regionElement.dataset.code = code; // <li data-code="code_de_la_région">nom_de_la_région</li>
  regionElement.id = `region-${code}`; // id="region-XX"

  regionElement.addEventListener('click', handleRegionClick);

  return regionElement;
}

function createDepartmentElement({ nom, code, codeRegion }) {
  const departmentElement = document.createElement('li');
  departmentElement.textContent = nom;
  // on peut passer l'info par les data-attributes
  departmentElement.dataset.code = code;
  departmentElement.dataset.region = codeRegion;

  return departmentElement;
}

function handleRegionClick(event) {
  console.log(event.currentTarget.dataset.code);
  // au clic sur une région, je veux afficher ses départements

  // j'efface les départements précédents
  document.getElementById('departments__list').textContent = '';

  // j'ajoute les départements
  displayDepartments(event.currentTarget.dataset.code);

  // const id = event.currentTarget.id.split('-')[1];
  // const [, id] = event.currentTarget.id.split('-');
  // displayDepartments(id);
}

displayRegions();
