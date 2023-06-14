//@ts_check
// Importing all necessary data
import { books, authors, genres, BOOKS_PER_PAGE } from './data.js'

// Selectors for various elements in the HTML document
const selectors = {
                searchGenres: document.querySelector('[data-search-genres]'),
                searchAuthors: document.querySelector('[data-search-authors]'),
                listItems: document.querySelector('[data-list-items]'),
                settingsTheme: document.querySelector('[data-settings-theme]'),
                listButton: document.querySelector('[data-list-button]'),
                searchCancel: document.querySelector('[data-search-cancel]'),
                searchOverlay: document.querySelector('[data-search-overlay]'),
                settingsCancel: document.querySelector('[data-settings-cancel]'),
                settingsOverlay: document.querySelector('[data-settings-overlay]'),
                headerSearch: document.querySelector('[data-header-search]'),
                headerSettings: document.querySelector('[data-header-settings]'),
                searchTitle:  document.querySelector('[data-search-title]'),
                listClose: document.querySelector('[data-list-close]'),
                listActive: document.querySelector('[data-list-active]'),
                settingsForm: document.querySelector('[data-settings-form]'),
                searchForm: document.querySelector('[data-search-form]'),
                listBlur: document.querySelector('[data-list-blur]'),
                listImage: document.querySelector('[data-list-image]'),
                listMessage: document.querySelector('[data-list-message]'),
                listTitle: document.querySelector('[data-list-title]'),
                listSubtitle: document.querySelector('[data-list-subtitle]'),
                listDescription: document.querySelector('[data-list-description]'),
                save: document.querySelector('[form="settings"]')
}

// Initialize page number and matches array
/**
 * @type {number}
 */
let page = 1;

/**
 * @type {Array<object>}
 */
let matches = books

    /**
 * Create a book preview element.
 * @param {object} book - The book object.
 * @returns {HTMLElement} - The book preview element.
 */

    // Define a function to create a book preview element
function createBookPreview(book) {
  const { author, id, image, title } = book;
    const element = document.createElement('button')
    element.classList = 'preview'
    element.setAttribute('data-preview', id)

    element.innerHTML = `
        <img
            class="preview__image"
            src="${image}"
        />
        
        <div class="preview__info">
            <h3 class="preview__title">${title}</h3>
            <div class="preview__author">${authors[author]}</div>
        </div>
    `
return element;
}

// Create a document fragment to hold the book previews
const starting = document.createDocumentFragment();

// Loop through the matches and create book previews
for (const book of matches.slice(0, BOOKS_PER_PAGE)) {
    const previewElement = createBookPreview(book);
    starting.appendChild(previewElement);
}
selectors.listItems.appendChild(starting)

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

selectors.listButton.innerHTML = `
    <span>Show more</span>
    <span class="list__remaining"> (${remainingCount > 0 ? remainingCount : 0})</span>
`
// Event listeners for various interactions
selectors.searchCancel.addEventListener('click', () => {
    selectors.searchOverlay.open = false
})

selectors.settingsCancel.addEventListener('click', () => {
    selectors.settingsOverlay.open = false
})

selectors.headerSearch.addEventListener('click', () => {
    selectors.searchOverlay.open = true 
   selectors.searchTitle.focus()
})

selectors.headerSettings.addEventListener('click', () => {
    selectors.settingsOverlay.open = true 
})

selectors.listClose.addEventListener('click', () => {
    selectors.listActive.open = false
})

selectors.settingsForm.addEventListener('submit', (event) => {
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

})

selectors.searchForm.addEventListener('submit', handleSearchFormSubmit);

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
        const previewElement1 = createBookPreview(book);
        newItems.appendChild(previewElement1);
    }

    selectors.listItems.appendChild(newItems)
    selectors.listButton.disabled = remainingCount < 1

    selectors.listButton.innerHTML = `
        <span>Show more</span>
        <span class="list__remaining"> (${remainingCount > 0 ? remainingCount : 0})</span>
    `

    window.scrollTo({top: 0, behavior: 'smooth'});
    selectors.searchOverlay.open = false
}

/**
 * Apply filters to the list of books.
 * @param {Object} filters - Filters object containing genre, title, and author.
 * @returns {Array} - Array of filtered books.
 */

// Function to apply filters to the list of books
function applyFilters(filters) {
    const {genre, title, author} = filters;
    const result = [];

for (const book of books) {
    let genreMatch = genre === 'any';

    for (const singleGenre of book.genres) {
        if (genreMatch) break;
        if (singleGenre === genre) {
            genreMatch = true
        }
    }

    if (
        (filters.title.trim() === '' || book.title.toLowerCase().includes(title.toLowerCase())) && 
        (author === 'any' || book.author === author) && 
        genreMatch
    ) {
        result.push(book);
    }
}
return result;
};

selectors.listButton.addEventListener('click', () => {
    const fragment = document.createDocumentFragment()

    for (const book of matches.slice(page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE)) {
        const previewElement2 = createBookPreview(book);
        fragment.appendChild(previewElement2);
    }

    selectors.listItems.appendChild(fragment)
    page += 1
})

selectors.listItems.addEventListener('click', handleListItemsClick);

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
    
    