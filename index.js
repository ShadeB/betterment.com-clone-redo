if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('service-worker.js')
      .then((register) => {
        console.log('Service worker registered successfully', register);
      })
      .catch((err) => {
        console.error('Failed to register service worker', err);
      });
  });
}

// Logic to let users add the site as an app to homescreen

let deferredPrompt;
const btnInstall = document.querySelector('#btnInstall');

window.addEventListener('beforeinstallprompt', e => {

  btnInstall.style.display = 'block';

  //Prevent the mini-infobar from appearing on mobile
  e.preventDefault();

  // Stash the event so it can be triggered later.
  deferredPrompt = e;

  // TODO Add logic to show the add to home screen button

  // Handle add to homescreen event
  btnInstall.addEventListener('click', e => {
    btnInstall.display = 'none';

    //Show the install message
    deferredPrompt.prompt();

    deferredPrompt.userChoice.then(choice => {
      if (choice.outcome === 'accepted') {
        console.log('A2HS accepted');
      } else {
        console.log('A2HS rejected');
      }
      deferredPrompt = null;
    })
  })
})