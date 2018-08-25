/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Add variables that store DOM elements you will need to reference and/or manipulate
const studentList = document.querySelectorAll(".student-item"); // Holds all tags with the class 'student-item'
let totalPages = Math.ceil(studentList.length / 10);
const div = document.createElement("div");
let studentArray = []; // Holds list of students.
const searchButton = document.querySelector("button"); // Selects the search button
const searchInput = document.querySelector("input"); // Selects input field
const studentEmail = document.querySelectorAll(".email"); // Selects all tags with 'email' class
const studentName = document.querySelectorAll("h3"); // Selects all h3 tags

/*
Function to show student list depending on page.
Checks to see if the student list element exceeds 10.
*/
const showPage = (page, list) => {
  for (let i = 0; i < list.length; i++) {
    list[i].style.display = "none";
    if (i >= page * 10 - 10 && i < page * 10) {
      list[i].style.display = "block";
      studentArray.pop(list[i]); // Removes previous students for search function
    }
  }
};

// Create and append the pagination links - Creating a function that can do this is a good approach
const appendPageLinks = list => {
  div.innerHTML = "";
  totalPages = Math.ceil(list.length / 10);
  // Create a div, give it the 'pagination' class and append to .page div.
  div.className = "pagination";
  const pageDiv = document.querySelector(".page");
  pageDiv.appendChild(div);

  // Create a ul to the 'pagination' div
  const ul = document.createElement("ul");
  div.appendChild(ul);

  // for loop to create a a new li and a tag with the corresponding page number.
  for (let i = 0; i < totalPages; i++) {
    const li = document.createElement("li");
    ul.appendChild(li);
    const a = document.createElement("a");
    a.textContent = i + 1;
    li.appendChild(a);

    // Event listener to show page and students on click depending on the page clicked.
    div.addEventListener("click", event => {
      page = event.target.textContent; // stores page number that user presses.

      const aList = document.getElementsByTagName("a"); // Holds list of a tags
      // for loop to loop through a tags and remove the 'active' class.
      showPage(page, list);
      for (let i = 0; i < aList.length; i++) {
        aList[i].classList.remove("active");
        event.target.classList.add("active"); // adds class 'active' to event.target
      }
    });
  }
};

showPage(1, studentList);
appendPageLinks(studentList);

// Search Function to find if names match input name search
const searchList = () => {
  for (let i = 0; i < studentList.length; i++) {
    if (
      studentEmail[i].textContent.toLowerCase().indexOf(searchInput.value) >
        -1 ||
      studentName[i].textContent.toLowerCase().indexOf(searchInput.value) > -1
    ) {
      studentArray.push(studentList[i]);
    } else studentList[i].style.display = "none";
  }
};

// Search Button functionality.
searchButton.addEventListener("click", () => {
  searchList();
  showPage(1, studentArray);
  appendPageLinks(studentArray);
});
