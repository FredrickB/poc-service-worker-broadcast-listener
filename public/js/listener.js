const channel = new BroadcastChannel('sw-channel');

function displayNotification() {
  const title = 'Broadcast regarding push message received!';
  const options = {
    body: 'Notification triggered from listener.js!',
    vibrate: [100, 50, 100],
  };

  if (Notification.permission === 'granted') {
    navigator.serviceWorker.getRegistration().then(function(reg) {
      reg.showNotification(title, options);
    });
  } else {
    Notification.requestPermission(function(status) {
      if (status === 'granted') {
        navigator.serviceWorker.getRegistration().then(function(reg) {
          reg.showNotification(title, options);
        }); 
      } else {
        console.log('cannot display notification due to permission not being granted');
      }
    });
  }
}

channel.onmessage = function(event) {
  console.log('new service-worker broadcast received!', event.data);

  if (event.data.status === 'push') {
    const wrapper = document.querySelector('#wrapper');
    const element = document.querySelector('#sw-message');

    displayNotification();
  }
};
