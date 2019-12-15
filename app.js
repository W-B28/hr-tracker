
class Person {
  constructor(id, firstName, lastName, salary, managerID, managerName) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.salary = salary;
    this.managerID = managerID;
    this.managerName = managerName;
  }
}

class UI {
  static displayWorkers() {
    // retrieve workers from sessionStorage via the Store class
    const workers = Store.getWorkers();

    workers.forEach((worker) => UI.addWorkerToList(worker));
  }

  static displayTempWorkers(arr) {
    const myNode = document.getElementById("worker-list");
    while (myNode.firstChild) {
      myNode.removeChild(myNode.firstChild);
    }
    arr.forEach((tempWorker) => UI.addWorkerToList(tempWorker));

  }

  // add num below as input
  static addWorkerToList(worker) {
    const workerList = document.getElementById('worker-list');

    const row = document.createElement('tr');
    row.id = 'tableRow';
    row.class = 'table table-hover'


    row.innerHTML = `
    <td class="collection-item"><a href="#"contenteditable="true">${worker.id}</a></td>
    <td class="collection-item"><a href="#"contenteditable="true">${worker.firstName}</a></td>
    <td class="collection-item"><a href="#"contenteditable="true">${worker.lastName}</a></td>
    <td class="collection-item"><a href="#"contenteditable="true">${worker.salary}</a></td>
    <td class="collection-item"><a href="#"contenteditable="true">${worker.managerName}</a></td>
    <td class="collection-item"><a href="#"contenteditable="true">${worker.managerID}</a></td>
    <td><a href="#" class="btn btn-danger btn-sm delete"><b>X</b></a></td>
    `;

    workerList.appendChild(row);
  }

  static deleteWorker(el) {
    if(el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }


  static clearFields() {
    document.querySelector('#validationFirstName').value = '';
    document.querySelector('#validationLastName').value = '';
    document.querySelector('#validationSalary').value = '';
    document.querySelector('#validationEmployeeID').value = '';
    document.querySelector('#validationMangerName').value = '';
    document.querySelector('#validationManagerID').value = '';
  }
}

class Store {

  static getWorkers() {
    let workers;
    if(sessionStorage.getItem('workers') === null) {
      workers =[];
    } else {
      workers = JSON.parse(sessionStorage.getItem('workers'));
    }
    return workers;
  }

  static addWorker(worker) {
    const workers = Store.getWorkers();

    workers.push(worker)
    sessionStorage.setItem('workers', JSON.stringify(workers));
  }

  static removeWorker(id) {
    const workers = Store.getWorkers();

    workers.forEach((worker, index) => {
      if(worker.id === id) {
        workers.splice(index, 1);
      }
    });
    sessionStorage.setItem('workers', JSON.stringify(workers));
  }
}

//Event: Display workers
document.addEventListener('DOMContentLoaded', UI.displayWorkers);

//Event: Add worker to table
document.querySelector('#worker-form').addEventListener('submit', (e) => {

  e.preventDefault();
  // Get form values
  const firstName = document.querySelector('#validationFirstName').value;
  const lastName = document.querySelector('#validationLastName').value;
  const salary = document.querySelector('#validationSalary').value;
  const id = document.querySelector('#validationEmployeeID').value;
  const managerName = document.querySelector('#validationMangerName').value;
  const managerID = document.querySelector('#validationManagerID').value;


  // Instantiate new worker profile from form values
  const worker = new Person(id, firstName, lastName, salary, managerName, managerID);

  // Add newWorker to UI
  UI.addWorkerToList(worker);

  // Add worker to Store
  Store.addWorker(worker);

  // clearFields
  UI.clearFields();

});

// loop through workers in tabledItems

filterNames = () => {
  // get items out of sessionStorage
  const allWorkers = Store.getWorkers();
  // declare empty array to push sessionStorage data to
  const searchableData = [];
  // loop through allWorkers and push data to searchableData array
  allWorkers.forEach(function(worker) {

    // get typed characters in search inputfield
    let searchFieldInput = document.getElementById('searchFieldInput').value;
    searchFieldInput = searchFieldInput.toLowerCase();
    for(el in worker){
      // console.log(searchFieldInput);
      let tempVar = worker[el].toLowerCase();
      if(tempVar.indexOf(searchFieldInput) == 0) {
        if(searchableData.indexOf(worker) == -1){
          searchableData.push(worker);
        }
      }
    }
    UI.displayTempWorkers(searchableData);
  });
}


let filterInput = document.getElementById('searchFieldInput');
filterInput.addEventListener('keyup', filterNames);


// Event to remove selected worker from table on the UI

document.querySelector('#worker-list').addEventListener('click', e => {
  UI.deleteWorker(e.target);
// Remove worker from sessionStorage
    Store.removeWorker(e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent);
});
