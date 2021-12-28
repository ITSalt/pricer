const $$ = (selector) => { return document.querySelector(selector);}
const sums = {
  money : null,
  money2 : null
}

let deferredPrompt;

const changeMe = (e) => {
  const minds = [];

  const addToName = e.srcElement.id.indexOf("2") > 0 ? "2" : "";

  const val = {
    price: parseFloat($$(`#txtMoney${addToName}`).value),
    value: parseFloat($$(`#txtValue${addToName}`).value)
  }

  sums[`money${addToName}`] = null;

  if (val.price && val.value) {
    sums[`money${addToName}`] = +(val.price / val.value * 1000).toFixed(2);
    minds.push(`За кг\\л - <span class="big">${sums[`money${addToName}`].toLocaleString()}</span> денег`);
  }

  let compareText = "";
  if (sums.money && sums.money2)
    compareText = sums.money < sums.money2 ? "<<< Первый выгоднее!" : (sums.money > sums.money2 ? "Второй выгоднее! >>>" : "<<< Однофигово >>>");
  
  $$(`#txtChecks${addToName}`).innerHTML = minds.join("/r/n");
  $$("#resume").innerHTML = compareText;

  $$("#umoney").style.setProperty("visibility", compareText ? "visible" : "hidden");
  
}

const afterLoad = () => {
  $$('#txtMoney').addEventListener("keyup", changeMe);
  $$('#txtValue').addEventListener("keyup", changeMe);
  $$('#txtMoney2').addEventListener("keyup", changeMe);
  $$('#txtValue2').addEventListener("keyup", changeMe);

  // Register service worker to control making site work offline

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('sw.js')
      .then(() => { console.log('Service Worker Registered'); });
  }

  // Code to handle install prompt on desktop
  const addBtn = document.querySelector('.add-button');
  addBtn.style.display = 'none';
}

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI to notify the user they can add to home screen
  addBtn.style.display = 'block';

  addBtn.addEventListener('click', () => {
    // hide our user interface that shows our A2HS button
    addBtn.style.display = 'none';
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      deferredPrompt = null;
    });
  });
});

document.addEventListener('DOMContentLoaded', afterLoad);