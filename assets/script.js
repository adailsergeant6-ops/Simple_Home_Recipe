
// ==================== CONTACT.HTML SCRIPTS ====================
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            // Target a paragraph or span instead of a div
            const messageStatus = document.getElementById('formMessage');

            if (!name || !email || !message) {
                messageStatus.textContent = 'Please fill in all fields.';
                messageStatus.style.color = 'red';
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                messageStatus.textContent = 'Please enter a valid email address.';
                messageStatus.style.color = 'red';
                return;
            }

            messageStatus.textContent = 'Thank you for your message! We will get back to you soon.';
            messageStatus.style.color = 'green';
            contactForm.reset();
        });
    }
});

/*highlight active nav page*/

function setActiveNav(clickedLink) {
    document.querySelectorAll('nav a').forEach(link => link.classList.remove('active'));
    clickedLink.classList.add('active');
}

/*highlight active menu page*/

function setActive(clickedLink) {
    document.querySelectorAll('aside a').forEach(link => link.classList.remove('active'));
    clickedLink.classList.add('active');
}

/*filter menu*/

function filterRecipes(category) {
    const recipes = document.querySelectorAll('.recipe');
    recipes.forEach(recipe => {
        recipe.dataset.visible = (category === 'all' || recipe.classList.contains(category)) ? "true" : "false";
    });
    currentPage = 1;
    showPage(currentPage);
}

 /*search menu page*/
function searchRecipes() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const recipes = document.querySelectorAll('.recipe');
    recipes.forEach(recipe => {
        const name = recipe.querySelector('.meal-name').textContent.toLowerCase();
        recipe.dataset.visible = name.includes(input) ? "true" : "false";
    });
    currentPage = 1;
    showPage(currentPage);
}

/*next menu page*/
let currentPage = 1;
const itemsPerPage = 6;

function showPage(page) {
    const allItems = document.querySelectorAll('.recipe');
    const visibleItems = Array.from(allItems).filter(item => item.dataset.visible === "true");
    const totalPages = Math.ceil(visibleItems.length / itemsPerPage) || 1;

    allItems.forEach(item => item.style.display = 'none');
    visibleItems.forEach((item, index) => {
        if (index >= (page - 1) * itemsPerPage && index < page * itemsPerPage) {
            item.style.display = 'block';
        }
    });
    renderPagination(totalPages);
}


function renderPagination(totalPages) {
    const pagination = document.getElementById("pagination");
    if (!pagination) return;
    pagination.innerHTML = "";

    pagination.innerHTML += `<li class="page-item ${currentPage === 1 ? 'disabled' : ''}"><a class="page-link" href="#" onclick="prevPage()">Previous</a></li>`;
    for (let i = 1; i <= totalPages; i++) {
        pagination.innerHTML += `<li class="page-item ${i === currentPage ? 'active' : ''}"><a class="page-link" href="#" onclick="goToPage(${i})">${i}</a></li>`;
    }
    pagination.innerHTML += `<li class="page-item ${currentPage === totalPages ? 'disabled' : ''}"><a class="page-link" href="#" onclick="nextPage()">Next</a></li>`;
}

function goToPage(page) { currentPage = page; showPage(currentPage); }
function nextPage() { /* Logic for next */ currentPage++; showPage(currentPage); }
function prevPage() { /* Logic for prev */ currentPage--; showPage(currentPage); }

document.addEventListener("DOMContentLoaded", function () {
    // FIXED: Correctly selecting recipes before the loop
    const recipes = document.querySelectorAll('.recipe');
    recipes.forEach(recipe => recipe.dataset.visible = "true");
    showPage(currentPage);
});



/*home search bar*/
document.addEventListener('DOMContentLoaded', function() {
    // 1. Grab the 'query' from the URL
    const params = new URLSearchParams(window.location.search);
    const searchTerm = params.get('query')?.toLowerCase();

    // 2. Put the word back into the search box on THIS page (optional but helpful)
    const localSearchInput = document.querySelector('.search-bar');
    if (searchTerm && localSearchInput) {
        localSearchInput.value = searchTerm;
    }

    // 3. Filter the recipe cards
    if (searchTerm) {
        const recipes = document.querySelectorAll('.recipe-card');
        
        recipes.forEach(card => {
            // Looks for text inside the h3 of each card
            const title = card.querySelector('h3').innerText.toLowerCase();
            
            if (title.includes(searchTerm)) {
                card.style.display = "flex"; // Show match
            } else {
                card.style.display = "none"; // Hide others
            }
        });
    }
});


