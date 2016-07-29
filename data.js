window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB.")
}

const dbName = "mydb";

var request = indexedDB.open(dbName, 2);

request.onerror = function(event) {
    console.log("db error");
};

request.onupgradeneeded = function(event) {
    var db = event.target.result;
    var userObjectStore = db.createObjectStore("Users", {
        keyPath: "Email"
    });

    userObjectStore.createIndex("name", "name", {
       unique: true
    });

    persistProducts();

    console.log("db created");
};

function persistProducts11(uname,uadd,uemail,ucno) {

    var request = indexedDB.open(dbName, 2);

    request.onsuccess = function(event) {

        var db = event.target.result;
        var transaction = db.transaction("Users", "readwrite");
        var objectStore = transaction.objectStore("Users");
        var data = [{
            name : uname,
            address : uadd,
            Email: uemail,
            Cno: ucno
        }];

        data.forEach(function(product) {
            objectStore.put(product);
        });

    };
}

function persistProducts() {

    var request = indexedDB.open(dbName, 2);

    request.onsuccess = function(event) {

        var db = event.target.result;
        var transaction = db.transaction("Users", "readwrite");
        var objectStore = transaction.objectStore("Users");
        var data = [{
          name:  "Rohit",
          address :"Durgapur",
          Email: "Rohit@abc.com",
          Cno: "23467"
        }];

        data.forEach(function(product) {
            objectStore.put(product);
        });

        transaction.oncomplete = function() {

            console.log("User saved");
        };
    };
}
function table()
{
  var request = indexedDB.open(dbName, 2);
  request.onsuccess = function(event) {

      var db = event.target.result;
      var transaction = db.transaction("Users", "readwrite");
      var objectStore = transaction.objectStore("Users");
      var user = [];
      var col=[];


    objectStore.openCursor().onsuccess = function(event) {
      var cursor = event.target.result;
      if(cursor) {
        user.push(cursor.value);
        cursor.continue();
      }

      console.log(user);
      for (var i = 0; i < user.length; i++) {
           for (var k in user[i]) {
               if (col.indexOf(k) === -1) {
                   col.push(k);
               }
           }
       }


    var table = document.createElement("table");
    var tr = table.insertRow(-1);                   // TABLE ROW.
    for (var j = 0; j < col.length; j++)
    {
        var th = document.createElement("th");      // TABLE HEADER.
        th.innerHTML = col[j];
        tr.appendChild(th);
    }
    for (var l = 0; l < user.length; l++) {

         tr = table.insertRow(-1);

         for (var m = 0; m < col.length; m++) {
             var tabCell = tr.insertCell(-1);
             tabCell.innerHTML = user[l][col[m]];
         }
     }
     var divContainer = document.getElementById("showtable");
     divContainer.innerHTML = "";
     divContainer.appendChild(table);
   };
    transaction.oncomplete = function(event) {
        console.log("done");
    };

    transaction.onerror = function(event) {
        console.error(event);
    };

}
}
function showall() {

    var request = indexedDB.open(dbName);

    request.onsuccess = function(event) {

        var db = event.target.result;

        var transaction = db.transaction("Users", "readonly");
        var objectStore = transaction.objectStore("Users");

        var query = objectStore.getAll();

        query.onerror = function(queryEvent) {
            console.log("Unable to retrieve data from database!");
        };

        query.onsuccess = function(queryEvent) {

            console.log(queryEvent.target.result);

        };
    };
}
function deletedb() {

    var req = indexedDB.deleteDatabase(dbName);
    console.log("db deleted");

}
