/* Person Class with methods to: Update ID,
to update first name, to update last name, update Salary,
Add a new person to be managed, delete a person from
being managed */

class Person {
  constructor (id, firstName, lastName, salary, managerID, managerName) {
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
    const StoredWorkers = [
      {
        id : '1',
        firstName: 'William',
        lastName: 'Bell',
        salary: '100k',
        managerID: '101',
        managerName: 'Alan'
      },
      {
        id : '2',
        firstName: 'Jessy',
        lastName: 'James',
        salary: '120k',
        managerID: '101',
        managerName: 'Alan'
      },
      {
        id : '3',
        firstName: 'Jason',
        lastName: 'Bourne',
        salary: '20k',
        managerID: '101',
        managerName: 'Alan'
      }
    ];
    const workers = StoredWorkers;

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
  static clearFields() {
    document.querySelector('#validationFirstName').value = '';
    document.querySelector('#validationLastName').value = '';
    document.querySelector('#validationSalary').value = '';
    document.querySelector('#validationEmployeeID').value = '';
    document.querySelector('#validationMangerName').value = '';
    document.querySelector('#validationManagerID').value = '';
  }
}

document.addEventListener('DOMContentLoaded', UI.displayWorkers);

document.querySelector('#worker-form').addEventListener('submit', (e) => {

  e.preventDefault();
  // Get form values
  const firstName = document.querySelector('#validationFirstName').value;
  const lastName = document.querySelector('#validationLastName').value;
  const salary = document.querySelector('#validationSalary').value;
  const id = document.querySelector('#validationEmployeeID').value;
  const managerName = document.querySelector('#validationMangerName').value;
  const managerID = document.querySelector('#validationManagerID').value;

  // Instantiate new worker profile from form fields
  const newWorker = new Person(id, firstName, lastName, salary, managerName, managerID);

  // Add newWorker to table
  UI.addWorkerToList(newWorker)

  // clearFields
  UI.clearFields();


});
