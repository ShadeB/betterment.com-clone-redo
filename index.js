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