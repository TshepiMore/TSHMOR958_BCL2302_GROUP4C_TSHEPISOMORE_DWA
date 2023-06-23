import { authors, books } from './data.js'

// Selectors for various elements in the HTML document
export const selectors = {
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

  /**
 * Create a book preview element.
 * @param {object} book - The book object.
 * @returns {HTMLElement} - The book preview element.
 */

  export function createBookPreview(book){
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
      `;
  return element;
  }

  // Function to apply filters to the list of books
export function applyFilters(filters) {
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