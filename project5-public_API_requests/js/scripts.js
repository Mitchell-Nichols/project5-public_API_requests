//fetch API for users
function fetchData( url ){
    return fetch( url )
        .then(response => response.json())
        .catch(error => console.log('Looks like there is a problem', error))
};

//get and display 12 random users
fetchData( 'https://randomuser.me/api/?results=12' )
    .then(data => { 
        displayUserGallery(data.results)
        displayUserModal(data.results)
    });

//Add search field box to html
const searchHtml = `
<form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>`;

$( '.search-container' ).append( searchHtml );

function displayUserGallery(data){

    const userGallery = data.map(gallery => `
    <div class="card">
    <div class="card-img-container">
        <img class="card-img" src="${gallery.picture.large}" alt="profile picture of ${gallery.name.first} ${gallery.name.last}">
    </div>
    <div class="card-info-container">
        <h3 id="name" class="card-name cap">${gallery.name.first} ${gallery.name.last}</h3>
        <p class="card-text">${gallery.email}</p>
        <p class="card-text cap">${gallery.location.city}, ${gallery.location.state}</p>
    </div>
    </div>`);

    $( '.gallery' ).append( userGallery );

};

function displayUserModal(data){
    const userModal = data.map(modal => `
    <div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${modal.picture.large}" alt="profile picture of ${modal.name.first} ${modal.name.last}">
                <h3 id="name" class="modal-name cap">${modal.name.first} ${modal.name.last}</h3>
                <p class="modal-text">${modal.email}</p>
                <p class="modal-text cap">${modal.location.city}</p>
                <hr>
                <p class="modal-text">${modal.phone}</p>
                <p class="modal-text">${modal.location.street}, ${modal.location.city}, ${modal.location.state} ${modal.location.postcode}</p>
                <p class="modal-text">Birthday: ${modal.dob.date} (10/21/2015)</p>
            </div>
        </div>

        <div class="modal-btn-container">
            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
            <button type="button" id="modal-next" class="modal-next btn">Next</button>
        </div>
    </div>
    `);

    document.getElementById('gallery').addEventListener('click', e => {        
        $( '.gallery' ).after( userModal );
    });


};