let books;

function filterBooks(e){
    const value = e.target.value;
    renderBooks(value)
}

async function renderBooks(filter){
    const booksWrapper = document.querySelector('.books');

    booksWrapper.classList += ' books__loading';

    if(!books){
        books = await getBooks();
    }

    
    booksWrapper.classList.remove('books__loading');

    let filteredBooks = books;
    if(filter === 'LOW_TO_HIGH'){
        filteredBooks = books.sort((a, b) => (a.salePrice || a.originalPrice) - (b.salePrice || b.originalPrice));
    } else if (filter === 'HIGH_TO_LOW') {
        filteredBooks = books.sort((a, b) => (b.salePrice || b.originalPrice) - (a.salePrice || a.originalPrice));
    } else if (filter === 'RATING'){
        filteredBooks = books.sort((a, b) => b.rating - a.rating);
    }

    const bookHtml = books.map(book => {
        
        return  `<div class="book">
                            <figure class="book__img--wrapper">
                                <img class="book__img" src="${book.url}" alt="">
                            </figure>
                            <div class="book__title">
                                ${book.title}
                            </div>
                            <div class="book__ratings">
                                ${getRatingStars(book.rating)}
                            </div>
                            ${getBookPrices(book.originalPrice, book.salePrice)}
                            
                        </div>`
    })

    booksWrapper.innerHTML = bookHtml.join('');

    
}

function getRatingStars(rating) {
    let stars = '';
        for(let i = 0; i < Math.floor(rating); i++){
            stars += `<i class="fas fa-star"></i>`  
        }
        if(!Number.isInteger(rating)){
            stars += `<i class="fas fa-star-half-alt"></i>`
        }
        return stars;
}

function getBookPrices(originalPrice, salePrice){
    let priceHTML = ``;
    if (!salePrice){
        return priceHTML = `<span class="book__price">
        $${originalPrice.toFixed(2)}
        </span>`;
    }
    return priceHTML += `<span class="book__price--normal">
                            $${originalPrice.toFixed(2)}
                            </span> $${salePrice}`;
}



setTimeout(() => {
    renderBooks();
});

//Fake Data
function getBooks(){
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    id: 1,
                    title: "Cracking the Coding Interview",
                    url: "assets/crack the coding interview.png",
                    originalPrice: 49.95,
                    salePrice: 14.95,
                    rating: 4.5
                },
                {
                    id: 2,
                    title: "Atomic Habits",
                    url: "assets/atomic habits.jpg",
                    originalPrice: 39,
                    salePrice: null,
                    rating: 5
                },
                {
                    id: 3,
                    title: "Can't Hurt Me",
                    url: "assets/david goggins.jpeg",
                    originalPrice: 49.95,
                    salePrice: 14.95,
                    rating: 5
                },
                {
                    id: 4,
                    title: "Deep Work",
                    url: "assets/deep work.jpeg",
                    originalPrice: 29,
                    salePrice: 12,
                    rating: 5
                },
                {
                    id: 5,
                    title: "The 10X Rule",
                    url: "assets/book-1.jpeg",
                    originalPrice: 44,
                    salePrice: 19,
                    rating: 4.5
                },
                {
                    id: 6,
                    title: "Be Obsessed or Be Average",
                    url: "assets/book-2.jpeg",
                    originalPrice: 32,
                    salePrice: 17,
                    rating: 4
                },
                {
                    id: 7,
                    title: "Rich Dad Poor Dad",
                    url: "assets/book-3.jpeg",
                    originalPrice: 70,
                    salePrice: 12.5,
                    rating: 5
                },
                {
                    id: 8,
                    title: "Cashflow Quadrant",
                    url: "assets/book-4.jpeg",
                    originalPrice: 11,
                    salePrice: 10,
                    rating: 4
                },
                {
                    id: 9,
                    title: "48 Laws of Power",
                    url: "assets/book-5.jpeg",
                    originalPrice: 38,
                    salePrice: 17.95,
                    rating: 4.5
                },
                {
                    id: 10,
                    title: "The 5 Second Rule",
                    url: "assets/book-6.jpeg",
                    originalPrice: 35,
                    salePrice: null,
                    rating: 4
                },
                {
                    id: 11,
                    title: "Your Next 5 Moves",
                    url: "assets/book-7.jpg",
                    originalPrice: 40,
                    salePrice: null,
                    rating: 4
                },
                {
                    id: 12,
                    title: "Mastery",
                    url: "assets/book-8.jpeg",
                    originalPrice: 30,
                    salePrice: null,
                    rating: 4.5
                },
            ])
        }, 1000)

    })

    
}