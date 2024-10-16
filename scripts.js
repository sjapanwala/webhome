const modal = document.getElementById('greetingModal');

function fadeOutModal() {
  modal.classList.add('fade-out');
  setTimeout(() => {
    modal.style.display = 'none';
  }, 1000);
}

document.addEventListener('click', () => {
  fadeOutModal();
});

setTimeout(() => {
  fadeOutModal();
}, 10000);



const commandPaletteModal = document.getElementById('commandPaletteModal');
const commandInput = document.getElementById('commandInput');
const commandSuggestions = document.getElementById('commandSuggestions');

// List of available commands with associated actions
const suggestions = [
  //{ name: 'search gitHub', action: (query) => window.open(`https://github.com/search?q=${query}`, '_blank') },
  //{ name: 'search leetCode', action: (query) => window.open(`https://leetcode.com/problemset/all/?search=${query}`, '_blank') },
  //{ name: 'search youTube', action: (query) => window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank') },
  //{ name: 'search netflix', action: (query) => window.open(`https://www.netflix.com/search?q=${query}`, '_blank') },
  //{ name: 'search google', action: (query) => window.open(`https://www.google.com/search?q=${query}`, '_blank') },
];

// Function to toggle the command palette modal
function toggleCommandPalette() {
  if (commandPaletteModal.style.display === 'none') {
    commandPaletteModal.style.display = 'flex';
    commandInput.focus(); // Focus on the input when it shows
  } else {
    commandPaletteModal.style.display = 'none';
    commandInput.value = ''; // Clear the input when hiding the modal
    commandSuggestions.innerHTML = ''; // Clear suggestions when closing
  }
}

// Event listener for shortcut keys (Ctrl+P or Cmd+P)
document.addEventListener('keydown', function(event) {
  if ((event.ctrlKey || event.metaKey) && event.key === ' ') {
    event.preventDefault(); // Prevent default browser behavior
    toggleCommandPalette(); // Show/hide the command palette
  }
});

// Close the command palette if the user presses "Escape"
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    commandPaletteModal.style.display = 'none';
  }
});

// Filter and show suggestions as the user types
commandInput.addEventListener('input', function () {
  const query = commandInput.value.toLowerCase();
  const filteredSuggestions = suggestions.filter(suggestion => suggestion.name.toLowerCase().includes(query));
  
  commandSuggestions.innerHTML = '';  // Clear old suggestions
  
  filteredSuggestions.forEach(suggestion => {
    const li = document.createElement('li');
    li.textContent = suggestion.name;
    li.addEventListener('click', function () {
      const searchTerm = commandInput.value;
      suggestion.action(searchTerm);  // Perform search when suggestion is clicked
      commandPaletteModal.style.display = 'none';  // Hide the palette after input
    });
    commandSuggestions.appendChild(li);
  });
});

// Perform the action when the user presses "Enter"
commandInput.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    const query = commandInput.value.toLowerCase();
    const selectedCommand = suggestions.find(suggestion => suggestion.name.toLowerCase().includes(query));
    
    if (selectedCommand) {
      selectedCommand.action(query);  // Perform the associated action
    } else {
      // Default to Google search if no suggestion matches
      window.open(`https://www.google.com/search?q=${query}`, '_blank');
    }

    commandPaletteModal.style.display = 'none';  // Hide the palette after input
  }
});