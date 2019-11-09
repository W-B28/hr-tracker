/* Person Class with methods to: Update ID,
to update first name, to update last name, update Salary,
Add a new person to be managed, delete a person from
being managed */

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
    // retrieve workers from localStorage via the Store class
    const workers = Store.getWorkers();

    workers.forEach((worker) => UI.addWorkerToList(worker));
  }
  static addWorkerToList(worker) {
    const workerList = document.getElementById('worker-list');

    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${worker.id}</td>
      <td>${worker.firstName}</td>
      <td>${worker.lastName}</td>
      <td>${worker.salary}</td>
      <td>${worker.managerName}</td>
      <td>${worker.managerID}</td>
      <td><a href="#" class="btn btn-warning btn-sm edit">*</a></td>
      <td><a href="#" class="btn btn-danger btn-sm delete">x</a></td>
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
    if(localStorage.getItem('workers') === null) {
      workers =[];
    } else {
      workers = JSON.parse(localStorage.getItem('workers'));
    }
    return workers;
  }
  static addWorker(worker) {
    const workers = Store.getWorkers();

    workers.push(worker)
    localStorage.setItem('workers', JSON.stringify(workers));
  }
  static removeWorker(id) {
    const workers = Store.getWorkers();

    workers.forEach((worker, index) => {
      if(worker.id === id) {
        workers.splice(index, 1);
      }
    });
    localStorage.setItem('workers', JSON.stringify(workers));
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

// Event to remove selected worker from table on the UI

document.querySelector('#worker-list').addEventListener('click', e => {
  UI.deleteWorker(e.target);


// Remove worker from localStorage (Store)
Store.removeWorker(e.target.parentElement.previousElementSibling.previousElementSibling
  .previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent);
});
