// Get the search input and search button elements
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

// Get the search result element
const searchResult = document.getElementById('word');

// Add a click event listener to the search button
searchBtn.addEventListener('click', () => {
  // Get the search term from the input
  const searchTerm = searchInput.value;

  // If the search term is not empty
  if (searchTerm.trim() !== '') {
    // Check if the search term is found in the search result
    if (searchResult.textContent.includes(searchTerm)) {
      // If the search term is found, change the color of the search result to green
      searchResult.style.color = 'green';
    } else {
      // If the search term is not found, change the color of the search result to red
      searchResult.style.color = 'red';
    }
  }
});
