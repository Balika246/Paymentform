const checkboxes = document.querySelectorAll('.checkbox');
const totalElement = document.querySelector('#total .num');
const popup = document.getElementById('popup');
const countdownElement = document.getElementById('countdown');
const radioBtn = document.getElementById('radio-btn');
const qrBox = document.querySelector('.esewa-qr')


// Function to update the total price based on the checked checkboxes
function updateTotal() {
  let total = 0;

  // Loop through each checkbox
  checkboxes.forEach((cb, index) => {
    // If the checkbox is checked
    if (cb.checked) {
      // Get the corresponding price element's text content
      const priceText = document.querySelectorAll('.price.num')[index].textContent;
      // Extract the number from the price text (e.g., "$5.45" -> 5.45)
      const price = parseInt(priceText.replace('Rs.', '', 'only'));
      total += price;
    }
  });

  // Update the total displayed on the page
  totalElement.textContent = `Rs. ${total.toFixed(0)} /only`;
}

// Add change event listeners to all checkboxes
checkboxes.forEach(cb => cb.addEventListener('change', updateTotal));


// Function to show the popup and start the countdown
function showPopup() {
  popup.style.display = 'flex';
  let count = 3;
  countdownElement.textContent = `Thank you @name, successfully done!`;

  const countdownInterval = setInterval(() => {
    count--;
    if (count > 0) {
      countdownElement.textContent = `Thank you @name, successfully done!`;
    } else {
      clearInterval(countdownInterval);
      popup.style.display = 'none'
      qrBox.style.display = 'none'
      document.querySelector('.overlay').style.display = 'none';
      document.querySelector('.esewa-qr').style.display = 'none';
    }
  }, 1000);
}

// Event listener for form submission
function display_qr(){

  const overlay = document.querySelector('.overlay')
  const qrBox = document.querySelector('.esewa-qr')
  qrBox.style.display = 'inline-block';
  overlay.style.display = 'inline-block'
}



document.querySelector('.close-btn').addEventListener('click', (e)=>{
  e.preventDefault();
  document.querySelector('.overlay').style.display = 'none';
  document.querySelector('.esewa-qr').style.display = 'none';
})

document.querySelector('#done').addEventListener('click', (e)=>{
  e.preventDefault();
  document.getElementById('form').reset();
  showPopup()
})


const scriptURL = 'https://script.google.com/macros/s/AKfycbyEmJDk1JwlT2LHPDwZZdWmlZe7iS94yqOUKoul6LBKT4JdSMKLJLyA9W624P0zpOmVDg/exec'

const form = document.forms['registration-form']

form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
  .then(() => { 
    display_qr();
  })
  .catch(error => console.error('Error!', error.message))
})

