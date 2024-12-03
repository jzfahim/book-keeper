const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameEl = document.getElementById('website-name');
const websiteUrlEl = document.getElementById('website-url');
const bookmarksContainer = document.getElementById('bookmarks-container');

let bookmarks = [];

// Show Modal, Focus on Input
function showModal() {
    modal.classList.add('show-modal');
    websiteNameEl.focus();
}

// Modal Event Listeners
modalShow.addEventListener('click', showModal);
modalClose.addEventListener('click', () => modal.classList.remove('show-modal'));
window.addEventListener('click', (e) => (e.target === modal ? modal.classList.remove('show-modal') : false));

// Validate Form
function validate(nameValue, urlValue) {
    const expression = /(https)?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g;
    const regex = new RegExp(expression);
    if (!nameValue || !urlValue) {
        alert('Please submit values for both fields.');
        return false;
    }
    if (!urlValue.match(regex)) {
        alert('Please provide a valid web address.');
        return false;
    }
    // Valid
    return true;
    
}

// Build Bookmarks
function buildBookmarks() {
    // Remove all bookmark elements
    bookmarksContainer.textContent = '';
    // Build items
    bookmarks.forEach((bookmark) => {
        const { name, url } = bookmark;
        // Item
        const item = document.createElement('div');
        item.classList.add('item');
        // Close Icon
        const closeIcon = document.createElement('i');
        closeIcon.classList.add('fas', 'fa-minus');
        closeIcon.setAttribute('title', 'Delete Bookmark');
        closeIcon.setAttribute('onclick', `deleteBookmark('${url}')`);
        // Favicon / Link Container
        const linkInfo = document.createElement('div');
        linkInfo.classList.add('name');
        // Favicon
        const favicon = document.createElement('img');
        favicon.setAttribute('src', `https://s2.googleusercontent.com/s2/favicons?domain=${url}`);
        favicon.setAttribute('alt', 'Favicon');
        // Link
        const link = document.createElement('a');
        link.setAttribute('href', `${url}`);
        link.setAttribute('target', '_blank');
        link.textContent = name;
        // Append to bookmarks container
        linkInfo.append(favicon, link);
        item.append(closeIcon, linkInfo);
        bookmarksContainer.appendChild(item);
    });
}

// Fetch bookmarks
function fetchBookmarks() {
    // Get bookmarks from localStorage if available
    if (localStorage.getItem('bookmarks')) {
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    } else {
        // Create bookmarks array in localStorage
        bookmarks = [
            {
                name: 'Facebook',
                url: 'facebook.com',
            },
        ];
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    buildBookmarks();
}

// Delete Bookmark
function deleteBookmark(url) {
    // Loop through the bookmarks array
    bookmarks.forEach((bookmark, i) => {
        if (bookmark.url === url) {
            bookmarks.splice(i, 1);
        }
    });
    // Update bookmarks array in localStorage, re-populate DOM
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
}

function storeBookmark(e) {
    e.preventDefault();
    const nameValue = websiteNameEl.value;
    let urlValue = websiteUrlEl.value;
    // Add 'https://' if not there
    if (!urlValue.includes('https://') && !urlValue.includes('http://')) {
        urlValue = `https://${urlValue}`;
    }
    // Validate
    if (!validate(nameValue, urlValue)) {
        return false;
    }
    // Set bookmark object, add to array
    const bookmark = {
        name: nameValue,
        url: urlValue,
    };
    bookmarks.push(bookmark);
    // Set bookmarks in localStorage, fetch, reset input fields
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
    bookmarkForm.reset();
    websiteNameEl.focus();
}

// Event Listener
bookmarkForm.addEventListener('submit', storeBookmark);

// On Load, Fetch Bookmarks
fetchBookmarks();





















// const modal = document.querySelector('#modal');
// const modalShow = document.querySelector('#show-modal');
// const bookmarkForm = document.querySelector('#bookmark-form');
// const modalClose = document.querySelector('#close-modal');
// const websiteNameEl = document.querySelector('#website-name');
// const websiteUrl = document.querySelector('#website-url');
// const bookmarksContainer = document.querySelector('#bookmarks-container');
// let bookmarks = [];
// /////////////Show model and focus on Input///////////////////////
// function showModal() {
//     modal.classList.add('show-modal');
//     websiteNameEl.focus();
// }

// ///////modal evebt listener
// modalShow.addEventListener('click', showModal);
// modalClose.addEventListener('click', () => modal.classList.remove('show-modal'));
// window.addEventListener('click', (e) => (e.target === modal ? modal.classList.remove('show-modal') : false))


// ////validate form////////////////////////

// function validate(nameValue, urlValue) {
//     const expression = /(https)?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g;
//     const regex = new RegExp(expression);
//     if (!nameValue || !urlValue) {
//         alert('Please submit values for both fields')
//         return false;
//     }

//     if (!urlValue.match(regex)) {
//         alert('Please provide a valid web address')
//         return false;
//     }
//     return true;
// }
// /////////build bookmarks
// function buildBookmarks() {
//     ///remove all bookamrk elements;
//     bookmarksContainer.textContent = '';

//     // Build items
//     bookmarks.forEach((bookmark) => {
//         const { name, url } = bookmark;
//         const item = document.createElement('div');
//         item.classList.add('item');

//         //close icon
//         const closeIcon = document.createElement('i');
//         closeIcon.classList.add('fas', 'fa-minus');
//         closeIcon.setAttribute('title', 'Delete Bookmark');
//         closeIcon.setAttribute('onclick', `deleteBookmark('${url})`);

//         ///Link container
//         const linkInfo = document.createElement('div');
//         linkInfo.classList.add('name');

//         ///favicon
//         const favicon = document.createElement('img');
//         favicon.setAttribute('src', `https://s2.googleusercontent.com/s2/favicons?domain=${url}`);
//         favicon.setAttribute('alt', 'Favicon');
//         // Link
//         const link = document.createElement('a');
//         link.setAttribute('href', `${url}`);
//         link.setAttribute('target', '_blank');
//         link.textContent = name;

//         //Appned to bookmarks container
//         linkInfo.append(favicon, link)
//         item.append(closeIcon, linkInfo);
//         bookmarksContainer.appendChild(item);

//     })
// }



// //////////// Fetch Data From form///////////
// function fetchBookmarks() {
//     //Get bookmarks from local storgae if abailabe
//     if (localStorage.getItem('bookmarks')) {
//         bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
//     } else {
//         bookmarks = [
//             {
//                 name: ' Unsplash',
//                 url: 'https://unsplash.com'
//             },
//         ];
//         localStorage.setItem('bookmark', JSON.stringify(bookmarks))
//     }
//     buildBookmarks()
// }

// ///delete Bookmar
// function deleteBookmark(url) {
//     bookmarks.forEach((bookmark, i) => {
//         if (bookmark.url === url) {
//             bookmarks.splice(i, 1)
//         }
//     });
//     localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
//     fetchBookmarks();
// }


// //////////////////////////  Handel data form////////////////
// function storeBookmark(e) {
//     e.preventDefault();
//     const namevalue = websiteNameEl.value;
//     let urlValue = websiteUrl.value;
//     if (!urlValue.includes('https://') && !urlValue.includes('http://')) {
//         urlValue = `https://${urlValue}`;
//     }
//     if (!validate(namevalue, urlValue)) {
//         return false;
//     }
//     const bookmark = {
//         name: namevalue,
//         url: urlValue,
//     }
//     bookmarks.push(bookmark);
//     localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
//     fetchBookmarks();
//     bookmarkForm.reset();
//     websiteNameEl.focus();
// }

// /////event listener
// bookmarkForm.addEventListener('submit', storeBookmark);

// ///on load
// fetchBookmarks();