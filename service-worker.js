const filesToCache = [
	'Images/buki_cali_couch_phone_ring.webp'
	//'Images/buki_cali_couch.webp',
	//'Images/cali_portrait.webp',
	//'Images/cooper_buki_couch.webp',
	//'Images/download_apple@2x.webp',
	//'Images/download_google@2x.webp',
	//'Images/phone_card_iso_coming_soon.webp',
	//'index.html',
	//'styles.css'
];

const staticCacheName = 'cached-pages-v1';

self.addEventListener('install', (event) => {
	//begin installing service worker and cache assets'
	event.waitUntil(
		caches.open(staticCacheName).then((cache) => {
			return cache.addAll(filesToCache);
		})
	);
});

self.addEventListener('activate', (event) => {
	const cacheWhiteList = [staticCacheName];

	event.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames.map((cacheName) => {
					if (cacheWhiteList.indexOf(cacheName) === -1) {
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
});

self.addEventListener('fetch', (event) => {
	console.log('Fetch event for ', event.request.url);
	event.respondWith(
		caches
			.match(event.request)
			.then((response) => {
				if (response) {
					return response;
				}
				return fetch(event.request).then((response) => {
					return caches.open(staticCacheName).then((cache) => {
						cache.put(event.request.url, response.clone());
						return response;
					});
				});
			})
			.catch((error) => {
				console.error('Error in service worker installation', error);
			})
	);
});
