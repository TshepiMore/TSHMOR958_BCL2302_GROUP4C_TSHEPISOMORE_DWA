import { authors, books } from '../../DWA8/book-connect-main/data.js'
// Selectors for various elements in the HTML document
export class SelectorsComponents  {
    constructor() {
    this.searchGenres = document.querySelector('[data-search-genres]');
    this.searchAuthors = document.querySelector('[data-search-authors]');
    this.listItems = document.querySelector('[data-list-items]');
    this.settingsTheme = document.querySelector('[data-settings-theme]');
    this.listButton = document.querySelector('[data-list-button]');
    this.searchCancel = document.querySelector('[data-search-cancel]');
    this.searchOverlay = document.querySelector('[data-search-overlay]');
    this.settingsCancel = document.querySelector('[data-settings-cancel]');
    this.settingsOverlay = document.querySelector('[data-settings-overlay]');
    this.headerSearch = document.querySelector('[data-header-search]');
    this.headerSettings = document.querySelector('[data-header-settings]');
    this.searchTitle =  document.querySelector('[data-search-title]');
    this.listClose = document.querySelector('[data-list-close]');
    this.listActive = document.querySelector('[data-list-active]');
    this.settingsForm = document.querySelector('[data-settings-form]');
    this.searchForm = document.querySelector('[data-search-form]');
    this.listBlur = document.querySelector('[data-list-blur]');
    this.listImage = document.querySelector('[data-list-image]');
    this.listMessage = document.querySelector('[data-list-message]');
    this.listTitle = document.querySelector('[data-list-title]');
    this.listSubtitle = document.querySelector('[data-list-subtitle]');
    this.listDescription = document.querySelector('[data-list-description]');
    this.save = document.querySelector('[form="settings"]');
    }
}

//   /**
//  * Create a book preview element.
//  * @param {object} book - The book object.
//  * @returns {HTMLElement} - The book preview element.
//  */

export class BookPreviewComponent {
  createBookPreview(book) {
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
}

  // Function to apply filters to the list of books
  export class FilterComponent {
    applyFilters(filters) {
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
    }
};