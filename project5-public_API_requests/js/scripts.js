let users = [];
let searchOption = false;

/**
 * Fetch user's object from url
 *
 * @param {url} URL Link to Random User Generate site.
 */
function fetchData( url ){
  return fetch( url )
      .then(response => response.json())
      .catch(error => console.log('Looks like there is a problem', error))
};

/**
 * Return of fetch url
 *
 * @param {url address} Object.users Result of user's object
 */
fetchData( 'https://randomuser.me/api/?results=12&nat=US' )
  .then(data => { 
      displayUserGallery(data.results)
  });

//Append search field box to html
const searchHtml = `
<form action="#" method="get">
  <input type="search" id="search-input" class="search-input" placeholder="Search...">
  <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>`;

$( '.search-container' ).append( searchHtml );

/**
 * Display users on gallery
 *
 * @param {data} Object.users Result of user's objects from fetch API or search.
 */
function displayUserGallery(data){
  data.forEach((person, index) => {
    if(!searchOption){ 
      users.push(person)
    };
    const userGallery = `
      <div class="card" data-index="${index}">
        <div class="card-img-container">
          <img class="card-img" src="${person.picture.large}" alt="profile picture of ${person.name.first} ${person.name.last}">
        </div>
        <div class="card-info-container">
          <h3 id="name" class="card-name cap">${person.name.first} ${person.name.last}</h3>
            <p class="card-text">${person.email}</p>
            <p class="card-text cap">${person.location.city}, ${person.location.state}</p>
        </div>
      </div>`;

    $( '.gallery' ).append( userGallery );
  })
};

/**
 * Display selected users on modal window
 *
 * @param {index} user.index Set index for each user/card to keep track
 */
function displayUserModal(index){
  //format date of birth to MM/DD/YYYY
  const date = users[index].dob.date;
  const year =  date.substr(0,4);
  const day =  date.substr(5,2);
  const month =  date.substr(8,2);

  //set format of phone number to (XXX) XXX-XXXX
  //Credit to https://stackoverflow.com/questions/8358084/regular-expression-to-reformat-a-us-phone-number-in-javascript/41318684
  const phone = users[index].phone;
  const cleanPhone = ('' + phone).replace(/\D/g, '');
  const eqPhone = cleanPhone.match(/^(\d{3})(\d{3})(\d{4})$/);
  const formatPhone = '(' + eqPhone[1] + ') ' + eqPhone[2] + '-' + eqPhone[3];

  //append modal to html
  const userModal = `
  <div class="modal-container">
      <div class="modal">
          <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
          <div class="modal-info-container">
              <img class="modal-img" src="${users[index].picture.large}" alt="profile picture of ${users[index].name.first} ${users[index].name.last}">
              <h3 id="name" class="modal-name cap">${users[index].name.first} ${users[index].name.last}</h3>
              <p class="modal-text">${users[index].email}</p>
              <p class="modal-text cap">${users[index].location.city}</p>
              <hr>
              <p class="modal-text">${formatPhone}</p>
              <p class="modal-text">${users[index].location.street.number} ${users[index].location.street.name}, ${users[index].location.city}, ${users[index].location.state} ${users[index].location.postcode}</p>
              <p class="modal-text">Birthday: ${month} / ${day} / ${year} </p>
          </div>
      </div>
      <div class="modal-btn-container">
          <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
          <button type="button" id="modal-next" class="modal-next btn">Next</button>
      </div>
  </div>
  `;

  $( '.gallery' ).after( userModal );

  //On Modal window  
  //X button click
  document.getElementById( 'modal-close-btn' ).addEventListener('click', () => {
    document.querySelector( '.modal-container' ).remove();
  });

  //Next button click
  document.getElementById( 'modal-next' ).addEventListener('click', () => {
    let addIndex = parseInt(index);
    addIndex += 1;
    if(addIndex < users.length){
      document.querySelector( '.modal-container' ).remove();
      displayUserModal(addIndex);
    }
  });

  //Previous button click
  document.getElementById( 'modal-prev' ).addEventListener('click', () => {
    let addIndex = parseInt(index);
    addIndex -= 1;
    if(addIndex >= 0){
      document.querySelector( '.modal-container' ).remove();
      displayUserModal(addIndex);
    }
  });
};

//click on card and send selected card to modal for display
document.getElementById('gallery').addEventListener('click', e => {   
  const clickedCard = e.target.closest( '.card' );   
  displayUserModal(clickedCard.getAttribute( 'data-index' ));
  
});

//Search for typed keyword
const input = document.getElementById( 'search-input' );
const searchBtn = document.getElementById( 'search-submit' );

/**
 * Search for users.
 *
 * @param {searchKeyword} Object.users Search for users based on search input
 */
function searchBox(searchKeyword){
  let addSearchInput = [];
  if(input.length !== 0){
    for(let i=0; i < users.length; i++){
      const fullName = `${users[i].name.first.toLowerCase()} ${users[i].name.last.toLowerCase()}`;
      const city = `${users[i].location.city.toLowerCase()}`;
      const state = `${users[i].location.state.toLowerCase()}`;
      const postcode = `${users[i].location.postcode}`;
      const email = `${users[i].email.toLowerCase()}`;

      //search based on name, city, sate, postcard and email
      if(fullName.includes(searchKeyword)){
        addSearchInput.push(users[i]);
      } else if(city.includes(searchKeyword)){
        addSearchInput.push(users[i]);
      } else if(postcode.includes(searchKeyword)){
        addSearchInput.push(users[i]);
      } else if(state.includes(searchKeyword)){
        addSearchInput.push(users[i]);
      } else if(email.includes(searchKeyword)){
        addSearchInput.push(users[i]);
      }
    }
    //send result of card search to gallery
    displayUserGallery(addSearchInput);
  
    //reset gallary after empty search input
  } else if(input.length == 0){
    setOption = false;
  };
  
};

//search for keyword live
input.addEventListener("keyup", e => {
  //e.preventDefault();
  searchOption = true;
  $( '.card' ).remove();
  searchBox(e.target.value);
});

//search for keyword after click on search submit
searchBtn.addEventListener("click", e => {
  e.preventDefault();
  searchOption = true;
  $( '.card' ).remove();
  searchBox(e.target.value);
});