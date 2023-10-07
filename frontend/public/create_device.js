
const BASE_URL = 'http://localhost:8080'; 
var applicationServerPublicKey = 'BJoBWVlRziIyn-vD3BRXrfMlzqiOTIc_XxqaCRO5O3MT0tXr1oEdfGakUeRkPKy2SCxN7OimPxc8tKJJOkRqOKA';
var serviceWorker = '/serviceWorker.js';
var isSubscribed = false;

document.addEventListener("DOMContentLoaded", function () {
    // Application Server Public Key defined in Views/Device/Create.cshtml
    if (typeof applicationServerPublicKey === 'undefined') {
        errorHandler('Vapid public key is undefined.');
        return;
    }

    Notification.requestPermission().then(function (status) {
        if (status === 'denied') {
            //ask user to allow notifications
            errorHandler('[Notification.requestPermission] The user has blocked notifications.');
            
        } else if (status === 'granted') {
            console.log('[Notification.requestPermission] Initializing service worker.');
            initialiseServiceWorker();
        }
    });

    subscribe();
});

function initialiseServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register(serviceWorker).then(handleSWRegistration);
    } else {
        errorHandler('[initialiseServiceWorker] Service workers are not supported in this browser.');
    }
};

function handleSWRegistration(reg) {
    if (reg.installing) {
        console.log('Service worker installing');
    } else if (reg.waiting) {
        console.log('Service worker installed');
    } else if (reg.active) {
        console.log('Service worker active');
    }

    initialiseState(reg);
}

// Once the service worker is registered set the initial state
function initialiseState(reg) {
    // Are Notifications supported in the service worker?
    if (!(reg.showNotification)) {
        errorHandler('[initialiseState] Notifications aren\'t supported on service workers.');
        return;
    }

    // Check if push messaging is supported
    if (!('PushManager' in window)) {
        errorHandler('[initialiseState] Push messaging isn\'t supported.');
        return;
    }

    // We need the service worker registration to check for a subscription
    navigator.serviceWorker.ready.then(function (reg) {
        // Do we already have a push message subscription?
        reg.pushManager.getSubscription()
            .then(function (subscription) {
                isSubscribed = subscription;
                if (isSubscribed) {
                    console.log('User is already subscribed to push notifications');
                } else {
                    console.log('User is not yet subscribed to push notifications');
                }
            })
            .catch(function (err) {
                console.log('[req.pushManager.getSubscription] Unable to get subscription details.', err);
            });
    });
}

function subscribe() {
    navigator.serviceWorker.ready.then(function (reg) {
        var subscribeParams = { userVisibleOnly: true };

        //Setting the public key of our VAPID key pair.
        var applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
        subscribeParams['applicationServerKey'] = applicationServerKey;

        reg.pushManager.subscribe(subscribeParams)
            .then(function (subscription) {
                isSubscribed = true;

                var p256dh = base64Encode(subscription.getKey('p256dh'));
                var auth = base64Encode(subscription.getKey('auth'));
                var endpoint = subscription.endpoint;
                //make request to server to save subscription
                const request = new Request(`${BASE_URL}/devices/create`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                            "name": JSON.parse(localStorage.getItem('user')).code,
                            "pushEndpoint": endpoint,
                            "pushP256DH": p256dh,
                            "pushAuth": auth
                          
                    }),
                    });
                fetch(request)
                .then((response) => {
                    console.log(response);
                    if (response.status === 200) {
                        console.log('Subscription saved on server');
                    } else {
                        console.log('Subscription not saved on server');
                    }
                })
                .catch((error) => {
                    console.log('Subscription not saved on server', error);
                });


                console.log(subscription);

         
            })
            .catch(function (e) {
                errorHandler('[subscribe] Unable to subscribe to push', e);
            });
    });
}

function errorHandler(message, e) {
    if (typeof e == 'undefined') {
        e = null;
    }

    console.error(message, e);
    
}

function urlB64ToUint8Array(base64String) {
    var padding = '='.repeat((4 - base64String.length % 4) % 4);
    var base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);

    for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

function base64Encode(arrayBuffer) {
    return btoa(String.fromCharCode.apply(null, new Uint8Array(arrayBuffer)));
}