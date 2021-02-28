app.factory('$database', function() {
  const $database = {};
  const DB_NAME = 'lyricsDB';
  const DB_VERSION = 1;

  $database.save = song => {
    return new Promise(function(resolve, reject) {
      if(!indexedDB) {
        reject("Your browser doesn't support IndexedDB");
      }

      const dbPromise = indexedDB.open(DB_NAME, DB_VERSION);

      dbPromise.onupgradeneeded = event => {
        const database = event.target.result;
        if(!database.objectStoreNames.contains('song')) {
          database
            .createObjectStore('song', { keyPath: 'id', autoIncrement: true })
            .createIndex('band', 'band', { unique: false })
        }
      }

      dbPromise.onsuccess = event => {
        const database = event.target.result;
        const os = database.transaction('song', 'readwrite').objectStore('song');
  
        const request = os.add(song);
        request.onsuccess = () => {
          resolve("New song added");
        }
        request.onerror = () => {
          reject("Adding new object failed");
        }
      }

      dbPromise.onerror = () => {
        reject("Connecting to database failed");
      }
    })
  }

  $database.getAll = () => {
    return new Promise(function(resolve, reject) {
      if(!indexedDB) {
        reject("Your browser doesn't support IndexedDB");
      }

      const dbPromise = indexedDB.open(DB_NAME, DB_VERSION);

      dbPromise.onupgradeneeded = event => {
        const database = event.target.result;
        if(!database.objectStoreNames.contains('song')) {
          database
            .createObjectStore('song', { keyPath: 'id', autoIncrement: true })
            .createIndex('band', 'band', { unique: false })
        }
      }

      dbPromise.onsuccess = event => {
        const database = event.target.result;
        const os = database.transaction('song', 'readwrite').objectStore('song');
        
        const request = os.getAll();
        request.onsuccess = event => {
          resolve(event.target.result);
        }
        request.onerror = () => {
          reject("Error retrieving data");
        }
        
      }

      dbPromise.onerror = () => {
        reject("Connecting to database failed");
      }
    })
  }

  $database.getByBandName = bandName => {
    return new Promise(function(resolve, reject) {
      if(!indexedDB) {
        reject("Your browser doesn't support IndexedDB");
      }

      const dbPromise = indexedDB.open(DB_NAME, DB_VERSION);

      dbPromise.onupgradeneeded = event => {
        const database = event.target.result;
        if(!database.objectStoreNames.contains('song')) {
          database
            .createObjectStore('song', { keyPath: 'id', autoIncrement: true })
            .createIndex('band', 'band', { unique: false })
        }
      }

      dbPromise.onsuccess = event => {
        const database = event.target.result;
        const os = database.transaction('song', 'readwrite').objectStore('song');
        const oc = os.index('band').openCursor(bandName);
        const data = [];
        
        oc.onsuccess = event => {
          const cursor = event.target.result;
          if(cursor) {
            data.push(cursor.value);
            cursor.continue();
          }
          else {
            resolve(data);
          }
        }
        oc.onerror = () => {
          reject("Error retrieving data");
        }
        
      }

      dbPromise.onerror = () => {
        reject("Connecting to database failed");
      }
    })
  }

  $database.getBandNames = () => {
    return new Promise(function(resolve, reject) {
      if(!indexedDB) {
        reject("Your browser doesn't support IndexedDB");
      }

      const dbPromise = indexedDB.open(DB_NAME, DB_VERSION);

      dbPromise.onupgradeneeded = event => {
        const database = event.target.result;
        if(!database.objectStoreNames.contains('song')) {
          database
            .createObjectStore('song', { keyPath: 'id', autoIncrement: true })
            .createIndex('band', 'band', { unique: false })
        }
      }

      dbPromise.onsuccess = event => {
        const database = event.target.result;
        const os = database.transaction('song', 'readwrite').objectStore('song');
        const oc = os.index('band').openCursor(undefined, "nextunique");
        const data = [];
        
        oc.onsuccess = event => {
          const cursor = event.target.result;
          if(cursor) {
            data.push(cursor.value.band);
            cursor.continue();
          }
          else {
            resolve(data);
          }
        }
        oc.onerror = () => {
          reject("Error retrieving data");
        }
        
      }

      dbPromise.onerror = () => {
        reject("Connecting to database failed");
      }
    })
  }

  return $database;
})