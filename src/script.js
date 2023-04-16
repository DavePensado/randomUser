const form = document.querySelector('form');
const userSection = document.querySelector('.user-section');
let userQuantity = 0;

async function userData(userQuantity) {
  const url = `https://randomuser.me/api/?results=${userQuantity}`;
  const userPromise = await fetch(url);
  const userData = await userPromise.json();

  return userData;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let inputValue = e.currentTarget.children[0].value;

  clearUsers()

  e.currentTarget.children[0].value = ''

  if(userQuantity > 0) {
    userSection.classList.remove('user-section-height')
  }
  

  userQuantity = inputValue;

  printUsers(userQuantity)

})

function printUsers(users) {
  userData(users)
    .then((data) => {
      console.log(data.results)

      const users = data.results.map(el => createUserCard(el));
      userSection.append(...users);
    
    })
}

function createUserCard(userObj) {
  const img = createElement('img', {className: ["user-img"], attribute: [{src: userObj.picture.large}]});
  const h2 = createElement('h2', {className: ["user-name"]}, `${userObj.name. first} ${userObj.name.last}`);
  const pLocation = createElement('p', {className: ["user-location"]}, userObj.location.city);
  const h3 = createElement('h3', {className: ["user-contact"]}, 'contact');
  const pEmail = createElement('p', {className: ["user-email"]}, userObj.email);
  const pPhone = createElement('p', {className: ["user-phone"]}, userObj.phone);
  const hr = createElement('hr', {className: ["hr"]});
  const btn = createElement('button', {className: ["add-user-btn"]}, 'Add User');
  const article = createElement('article', {className: ["card-wrapper"]}, img, h2, pLocation, h3, pEmail, pPhone, hr, btn);

  return article;
}

function createElement(type, {className, attribute}, ...children) {
  const el = document.createElement(type);
      el.classList.add(...className);

    if(attribute) {
      attribute.forEach(attrObj => {
        for(key in attrObj) {
          el.setAttribute(key, attrObj[key]);
        }
      })
    }

      el.append(...children);
    
  return el;
}

function clearUsers() {
  document.querySelectorAll('.card-wrapper').forEach(el => el.remove())
}