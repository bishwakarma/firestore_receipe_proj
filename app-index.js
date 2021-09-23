// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
import { getFirestore, collection, getDocs, addDoc } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js'
//This function will be called once the DOM is loaded.
$(function(){
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDHnolRR5CAyCnPcF626fLR3VLDkaOCJ_k",
    authDomain: "ultimate-recipes-93aef.firebaseapp.com",
    projectId: "ultimate-recipes-93aef",
    storageBucket: "ultimate-recipes-93aef.appspot.com",
    messagingSenderId: "738926204385",
    appId: "1:738926204385:web:fb0f26e4bbacd8047c6ea0"
  };

  // Initialize Firebase
  const firebaseapp = initializeApp(firebaseConfig);
  //Create a firestore connection. So we have access to Firestore database.
  const firestore1 = getFirestore(firebaseapp);

  //Assign function to a variable and pass in function around as an arguments to different function.
  //Pass in table and rowData as an array.
  var makeRow = function(table, rowData){
      //Create an HTML Element for a table. Created a rown and put the row at an end of the table using insertRow(-1) method.
      var row = table.insertRow(-1);
      //Run foreach function on the array, i.e, rowData.
      rowData.forEach(function(item){
          //Create an HTML element for a cell.
          var cell = document.createElement('td');
          //Add text inside the cell element.
          cell.innerHTML = item;
          //Add row to the cell.
          row.appendChild(cell);
      });

  };

  //Make table
  var makeTable = function(){
    //Create table
    var table = document.createElement('table');
    //Apply bootstrap classes to the table.
    table.className = "table table-bordered";
    return table;
  };

  //Grab functions to register buttons for this App.
  //Using jquerry
  $("#add_button").click(function(){
      //When Add btn is clicked, built the object and store it to the Database.
      //Call addDoc() function and pass in the argument into it. First argument as collection name we are adding, Second
      //argument as the Object we are trying to add to the collection.
      //Then, connect the collection 
      addDoc(collection(firestore1, "recepies"),{
          //Object to add to the collection.
          recepie_title:$("#recipie_title").val(),
          ingredient_one:$("#ingredient_one").val(),
          ingredient_two:$("#ingredient_two").val(),
          ingredient_three:$("#ingredient_three").val(),
          ingredient_four:$("#ingredient_four").val()
      }) //.then() does not run until the addDoc() function completes.
      //When function gets added, pass in docRef to the functions below.
      .then(function(docRef){
         console.log("Document written with ID", docRef.id);
         //Grab teh first element and Reset the form
         $("#add_recipies")[0].reset();
      })  
      //If there is an error, pass in the error as an Object to the function below.  
      .catch(function(error){
          console.log("Errror adding document: ", error);
      });
});

//Get the documents that user inputs and store in a table.
    $("#show_button").click(function(){
        var table = makeTable();
        //Create an array to store recepies.
        var recipies = [];
        //Push the first array onto a Array. Push row of lables. Receipe title followes by the ingredients.
        recipies.push(["Recepie Title", "Ing1", "Ing2", "Ing3", "Ing4"]);
        //go to the Firebase and call getDoc() fuction.
        getDocs(collection(firestore1, "recepies"))
        //Pass in what is retrived from the firestore
        .then(function(querysnapshot){
            //get each individual value from querySnapshot one at a time.
            querysnapshot.forEach(function(doc){
            //get data
            var data = doc.data();
            //push data into the array from firestore.
            recipies.push([data.recepie_title, data.ingredient_one, data.ingredient_two, data.ingredient_three, data.ingredient_four]);
            });
        })
        .then(function(){
            //Make rows within the array with a row of data.
            recipies.forEach(function(rowData){
                //Make row of table and data.
                makeRow(table, rowData);
            });

        }); //I have used 2 then() functions so that the Application has time to complete the functions above. 
            //This is asynchronous call.
        
        //Add the table.
        var recepieDiv = document.getElementById("recipie_data");
            recepieDiv.innerHTML = "";
       // $("add_recipies")[0].reset();

        //Display only the version that got downloaded.
        recepieDiv.appendChild(table);
    });

}); 
