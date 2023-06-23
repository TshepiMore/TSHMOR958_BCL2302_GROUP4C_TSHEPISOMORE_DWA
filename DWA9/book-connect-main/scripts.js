//@ts_check

// Importing all necessary data
import { books, authors, genres, BOOKS_PER_PAGE } from './data.js'
import { bookPreviewComponent, selectors, applyFilters } from './app.js';
// Initialize page number and matches array
/**
 * @type {number}
 */
let page = 1;

/**
 * @type {Array<object>}
 */
let matches = books

// Create a document fragment to hold the book previews
const starting = document.createDocumentFragment();

// Loop through the matches and create book previews
for (const book of matches.slice(0, BOOKS_PER_PAGE)) {
    const previewElement = bookPreviewComponent.createBookPreview(book);
    starting.appendChild(previewElement);
}
selectors.listItems.appendChild(starting)

/**
 * Create option elements for dropdowns.
 * @param {string} value - The option value.
 * @param {string} text - The option text.
 * @returns {HTMLOptionElement} - The option element.
 */

// Function to create an option element
function createOptionElement(value, text) {
    const element = document.createElement('option');
    element.value = value;
    element.innerText = text;
return element;
}


// Create option elements for genres and authors and append them to the respective dropdowns.
const genreHtml = document.createDocumentFragment()
const authorsHtml = document.createDocumentFragment()

genreHtml.appendChild(createOptionElement('any', 'All Genres'))
authorsHtml.appendChild(createOptionElement('any', 'All Authors'))

for (const [id, name] of Object.entries(genres)) {
    genreHtml.appendChild(createOptionElement(id, name))
}

for (const [id, name] of Object.entries(authors)) {
    authorsHtml.appendChild(createOptionElement(id, name))
}
selectors.searchGenres.appendChild(genreHtml)
selectors.searchAuthors.appendChild(authorsHtml)

// Set the theme based on user preference or default
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {

     // Dark theme
    selectors.settingsTheme.value = 'night'
    document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
    document.documentElement.style.setProperty('--color-light', '10, 10, 20');
} else {
    // Light theme
    selectors.settingsTheme.value = 'day'
    document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
    document.documentElement.style.setProperty('--color-light', '255, 255, 255');
}

const remainingCount = matches.length - (page * BOOKS_PER_PAGE);
selectors.listButton.innerText = `Show more (${books.length - BOOKS_PER_PAGE})`;
selectors.listButton.disabled = remainingCount < 0;

function generateButtonHTML() {
    return `
        <span>Show more</span>
        <span class="list__remaining"> (${remainingCount > 0 ? remainingCount : 0})</span>
`;
}
selectors.listButton.innerHTML = generateButtonHTML(remainingCount);

function handleSearchCancel(){
    selectors.searchOverlay.open = false
};

function handleSettingsCancel() {
    selectors.settingsOverlay.open = false
};

function handleHeaderSearch() {
    selectors.searchOverlay.open = true 
   selectors.searchTitle.focus()
};

function handleHeaderSettings() {
    selectors.settingsOverlay.open = true 
}

function handleListClose() {
    selectors.listActive.open = false
};

selectors.searchCancel.addEventListener('click', handleSearchCancel);
selectors.settingsCancel.addEventListener('click', handleSettingsCancel);
selectors.headerSearch.addEventListener('click', handleHeaderSearch);
selectors.headerSettings.addEventListener('click', handleHeaderSettings);
selectors.listClose.addEventListener('click', handleListClose);
selectors.listItems.addEventListener('click', handleListItemsClick);
selectors.searchForm.addEventListener('submit', handleSearchFormSubmit);
selectors.settingsForm.addEventListener('submit', handleSettingsForm);
selectors.listButton.addEventListener('click', handleListButton);

function handleSettingsForm(event) {
    event.preventDefault()
     const formData = new FormData(event.target)
     const { theme } = Object.fromEntries(formData)

    if (theme === 'night') {

        document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
        document.documentElement.style.setProperty('--color-light', '10, 10, 20');
    } 
    else{
        document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
        document.documentElement.style.setProperty('--color-light', '255, 255, 255');
    }
    
   selectors.settingsOverlay.open = false

}

// Function to handle search form submission
function handleSearchFormSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    const filters = Object.fromEntries(formData)
    const result = applyFilters(filters);

    page = 1;
    matches = result

    if (result.length < 1) {
        selectors.listMessage.classList.add('list__message_show')
    } else {
        selectors.listMessage.classList.remove('list__message_show')
    }

   selectors.listItems.innerHTML = ''
    const newItems = document.createDocumentFragment()

    for (const book of result.slice(0, BOOKS_PER_PAGE)) {
        const previewElement1 = bookPreviewComponent.createBookPreview(book);
        newItems.appendChild(previewElement1);
    }

    selectors.listItems.appendChild(newItems)
    selectors.listButton.disabled = remainingCount < 1

    generateButtonHTML();

    window.scrollTo({top: 0, behavior: 'smooth'});
    selectors.searchOverlay.open = false
}

/**
 * Apply filters to the list of books.
 * @param {Object} filters - Filters object containing genre, title, and author.
 * @returns {Array} - Array of filtered books.
 */

function handleListButton() {
    const fragment = document.createDocumentFragment()

    for (const book of matches.slice(page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE)) {
        const previewElement2 = bookPreviewComponent.createBookPreview(book);
        fragment.appendChild(previewElement2);
    }

    selectors.listItems.appendChild(fragment)
    page += 1
}

// Function to handle clicking on book preview items
function handleListItemsClick(event) {
    const pathArray = Array.from(event.path || event.composedPath());
    let active = findActiveBook(pathArray);

    if (active) {
        selectors.listActive.open = true;
        selectors.listBlur.src = active.image;
        selectors.listImage.src = active.image;
        selectors.listTitle.innerText = active.title;
        selectors.listSubtitle.innerText = `${authors[active.author]} (${new Date(active.published).getFullYear()})`;
        selectors.listDescription.innerText = active.description;
    }
}

/**
 * Find the active book based on the clicked element's path.
 * @param {Array} pathArray - Array of elements in the clicked event's path.
 * @returns {Object|null} - Active book object or null if not found.
 */
// Function to find the active book based on the clicked element's path.
function findActiveBook(pathArray) {
    let active = null;

    for (const node of pathArray) {
        if (active) break;

        if (node?.dataset?.preview) {
            active = books.find((singleBook) => singleBook.id === node?.dataset?.preview);
        }
    }
        return active;
        }

    