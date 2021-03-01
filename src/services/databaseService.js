app.factory('$database', function($q) {
  const $database = {};
  const DB_NAME = 'lyricsDB';
  const DB_VERSION = 1;

  prepareDatabase = () => {
    const deferred = $q.defer();

    if(!indexedDB) {
      deferred.reject("Your browser doesn't support IndexedDB");
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

    dbPromise.onerror = () => {
      deferred.reject("Connecting to database failed");
    }

    return {
      deferred,
      dbPromise
    }
  }

  $database.save = song => {
    const { deferred, dbPromise } = prepareDatabase();
    
    dbPromise.onsuccess = event => {
      const database = event.target.result;
      const os = database.transaction('song', 'readwrite').objectStore('song');

      const request = os.add(song);
      request.onsuccess = () => {
        deferred.resolve("New song added");
      }
      request.onerror = () => {
        deferred.reject("Adding new object failed");
      }
    }

    return deferred.promise;
  }

  $database.getAll = () => {
    const { deferred, dbPromise } = prepareDatabase();

    dbPromise.onsuccess = event => {
      const database = event.target.result;
      const os = database.transaction('song', 'readwrite').objectStore('song');
        
      const request = os.getAll();
      request.onsuccess = event => {
        deferred.resolve(event.target.result);
      }
      request.onerror = () => {
        deferred.reject("Error retrieving data");
      }
    }

    return deferred.promise;
  }

  $database.getByBandName = bandName => {
    const { deferred, dbPromise } = prepareDatabase();

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
          deferred.resolve(data);
        }
      }
      oc.onerror = () => {
        defereeed.reject("Error retrieving data");
      }
      
    }

    return deferred.promise;
  }

  $database.getBandNames = () => {
    const { deferred, dbPromise } = prepareDatabase();

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
          deferred.resolve(data);
        }
      }
      oc.onerror = () => {
        deferred.reject("Error retrieving data");
      }
    }

    return deferred.promise;
  }

  return $database;
})