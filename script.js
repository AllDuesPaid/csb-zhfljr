window.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM fully loaded and parsed");
  // Placeholder code
  const clearStorageBtn = document.querySelector("#clear-storage-btn");

  clearStorageBtn.addEventListener("click", function () {
    localStorage.clear();
  });
  function updatePlaceholder() {
    let myData = localStorage.getItem("myData"); // Retrieve the data from local storage
    let placeholderText = "No data"; // Set a default placeholder text
    if (myData) {
      // Check if the data is not null or empty
      let myArray = JSON.parse(myData); // Parse the data into an array
      if (myArray.length > 0) {
        // Check if the array is not empty
        let firstThreeHanziValues = myArray.slice(0, 3).map((obj) => obj.Hanzi); // Get the first 3 Hanzi values from the first 3 objects in the array
        placeholderText = firstThreeHanziValues.join(", "); // Join the first 3 Hanzi values into a single string with a comma separator
        if (myArray.length > 3) {
          // Check if there are more than 3 objects in the array
          placeholderText += "..."; // Add an ellipsis character to indicate that there's more information available
        }
      }
    }
    document
      .getElementById("transcript")
      .setAttribute("placeholder", placeholderText); // Set the placeholder text in the input field with ID "myInput"
  }

  // Call updatePlaceholder() to set the initial placeholder text
  updatePlaceholder();

  //Tried copying & pasting HSK JSON but file > 1 GB
  const url =
    "https://docs.google.com/spreadsheets/d/1jalniUZMHlFhPSowyWVfrUHGLwgvZ8-j05fi_yUfF6U/export?format=csv";

  console.log("It may take a minute for csv to load");

  fetch(url)
    .then((result) => result.text())
    .then(function (csvtext) {
      return csv().fromString(csvtext);
    })
    .then(function (csv) {
      let csv2 = Array.from(csv);

      let csv3 = csv2.map(function (key) {
        return key.Hanzi;
      });
      let csv4 = csv2.map(function (key) {
        return key.Traditional;
      });

      document.getElementById("mybtn").addEventListener("click", function (e) {
        e.preventDefault();
        let transcript = document.getElementById("transcript").value;
        let objectsArray = [];

        csv.forEach(function (column) {
          if (transcript.includes(column.Hanzi)) {
            let obj = {};
            obj["Hanzi"] = column.Hanzi;
            obj["English"] = column.English;
            obj["Pinyin"] = column.Pinyin;
            objectsArray.push(obj);
          }
        });

        localStorage.setItem("myData", JSON.stringify(objectsArray)); // Save the array of JSON objects to local storage with key "myData"
        updatePlaceholder();

        document.getElementById("transcript").value = "";
      });
    });
});
