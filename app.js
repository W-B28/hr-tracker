// TO DO: Add "edit/update functionality to UI and localStorage"
// Fix buggy search filter

// https://www.youtube.com/watch?v=3NG8zy0ywIk

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

  static displayTempWorkers(arr) {
    const myNode = document.getElementById("worker-list");
    while (myNode.firstChild) {
      myNode.removeChild(myNode.firstChild);
      }
    arr.forEach((tempWorker) => UI.addWorkerToList(tempWorker));

  }
  static addWorkerToList(worker) {
    const workerList = document.getElementById('worker-list');

    const row = document.createElement('tr');
    row.id = 'tableRow';

    row.innerHTML = `
      <td class="collection-item"><a href="#">${worker.id}</a></td>
      <td class="collection-item"><a href="#">${worker.firstName}</a></td>
      <td class="collection-item"><a href="#">${worker.lastName}</a></td>
      <td class="collection-item"><a href="#">${worker.salary}</a></td>
      <td class="collection-item"><a href="#">${worker.managerName}</a></td>
      <td class="collection-item"><a href="#">${worker.managerID}</a></td>
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

const tableData = () => {
  const search = [];
  const tableElement = document.getElementById('worker-table');
  console.log(Array.from(tableElement.children[1]));
}

tableData();




// loop through workers in tabledItems

filterNames = () => {
  // get items out of localStorage
  const allWorkers = Store.getWorkers();
  // declare empty array to push localStorage data to
  const searchableData = [];
  // loop through allWorkers and push data to searchableData array
  allWorkers.forEach(function(worker) {
    // console.log(searchableData)
    // get typed characters in search inputfield
    let searchFieldInput = document.getElementById('searchFieldInput').value;
      for(el in worker){
        // console.log(searchFieldInput);
        if(worker[el].indexOf(searchFieldInput) == 0) {
          if(searchableData.indexOf(worker)){
            searchableData.push(worker);
          }

          // console.log(searchFieldInput)
          console.log(worker[el].indexOf(searchFieldInput) )
        // if statement if indexOf = 0 push to searchableData
      }
    }
    UI.displayTempWorkers(searchableData);
  });
  //
}

    // compare those characters to searchData on keyup
      // if typed characters in search field MATCH anything in the
      // searchData array then display that row on UI
      // else if NOT MATCH on keyup Hide row display



  let filterInput = document.getElementById('searchFieldInput');
  filterInput.addEventListener('keyup', filterNames);







  // create temp array store as attribute in UI
//   let tempArr = [];
//
// let filterValue = document.getElementById('filterInput').value.toUpperCase();
//   // Get tableRow
//   let tableRow = document.getElementById('tableRow');
//   // Get tabledData(.collection-item) from tableRow
//   let tabledData = [...tableRow.querySelectorAll('td.collection-item')];


// check against all fields
// for(let i = 0; i < tabledData.length; i++) {
//   let a = tabledData[i].getElementsByTagName('a')[0];
//   // If matched
//   if(a.innerHTML.toUpperCase().indexOf(filterValue) > -1) {
//     // const tempWorker = new Person(id, firstName, lastName, salary, managerName, managerID);
//
//     console.log(a.parentElement.parentElement);
//     console.log(a.innerHTML.toUpperCase().indexOf(filterValue) > -1);
// //     // partial matched send to temp array
// //     // tabledItems[i].style.display = '';
//   }
// }

// pass in temp arry and run render to table
// let filterInput = document.getElementById('searchFieldInput');
// filterInput.addEventListener('keyup', filterNames);



// filterNames = () => {
//   let filterValue = document.getElementById('filterInput').value.toUpperCase();
//   // Get tableRow
//   let tableRow = document.getElementById('tableRow');
//   // Get tabledItems(.collection-item) from tableRow
//   let tabledItems = tableRow.querySelectorAll('td.collection-item');
//
//   // Loop through collection items on keyup
//   for(let i = 0; i < tabledItems.length; i++) {
//     let a = tabledItems[i].getElementsByTagName('a')[0];
    // If matched
  //   if(a.innerHTML.toUpperCase().indexOf(filterValue) > -1) {
  //     tabledItems[i].style.display = '';
  //   } else {
  //     tabledItems[i].style.display = 'none';
  //   }
  // }
// }
//
// filterInput.addEventListener('keyup', filterNames);

// Event to remove selected worker from table on the UI

document.querySelector('#worker-list').addEventListener('click', e => {
  UI.deleteWorker(e.target);


// Remove worker from localStorage (Store)
Store.removeWorker(e.target.previousElementSibling.textContent);
});
