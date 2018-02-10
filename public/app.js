if ('serviceWorker' in navigator && 'Notification' in window) {
  navigator.serviceWorker.register('sw.js')
    .then(function(registration) {
      console.log('Registered service-worker');
    })
    .catch(function(err) {
      console.error('failed to register service-worker', err);
    });
}
