const idb =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;

export const createCollections = (
  DB,
  VERSION,
  COLLECTIONS = [],
  KEYPATH = "id"
) => {
  return new Promise((resolve, reject) => {
    // check for browser support
    if (!idb) {
      reject(Error("browser not support IndexedDB"));
    }
    // open database
    const databaseReq = idb.open(DB, VERSION);
    // handle database error
    databaseReq.onerror = (event) => {
      reject(event.target?.error?.toString());
    };
    // handle database upgrade
    databaseReq.onupgradeneeded = async (event) => {
      const db = databaseReq.result;
      const response = {};

      COLLECTIONS.forEach((collection) => {
        if (!db.objectStoreNames.contains(collection)) {
          db.createObjectStore(collection, {
            keyPath: KEYPATH,
          });
          response[collection] = `created successfull`;
        } else {
          response[collection] = `allready created`;
        }
      });
      resolve(response);
    };
    // handle database success
    databaseReq.onsuccess = (event) => {
      resolve("no new collection to create");
    };
  });
};

export const createCollection = (DB, VERSION, COLLECTION, KEYPATH = "id") => {
  return new Promise((resolve, reject) => {
    // check for browser support
    if (!idb) {
      reject(Error("browser not support IndexedDB"));
    }
    // open database
    const databaseReq = idb.open(DB, VERSION);
    // handle databae blocked
    databaseReq.onblocked = (event) => {
      console.log("blocked ...", event); // in my case this was triggering
      event.target.result.close(); // so close the connection and it worked
    };
    // handle database error
    databaseReq.onerror = (event) => {
      reject(event.target?.error?.toString());
    };
    // handle database upgrade
    databaseReq.onupgradeneeded = (event) => {
      console.log("first");
      const db = databaseReq.result;

      // validate collection
      if (!db.objectStoreNames.contains(COLLECTION)) {
        db.createObjectStore(COLLECTION, {
          keyPath: KEYPATH,
        });
        resolve(`${COLLECTION} - created successfull`);
      } else {
        resolve(`${COLLECTION} - allready created`);
      }
    };
    // handle database success
    databaseReq.onsuccess = (event) => {
      resolve("no new collection to create");
    };
  });
};

export const getCollection = (DB, VERSION, COLLECTION) => {
  return new Promise((resolve, reject) => {
    // open database
    const databaseReq = idb.open(DB, VERSION);
    // handle database error
    databaseReq.onerror = (event) => {
      reject(event.target?.error?.toString());
    };
    // handle database success
    databaseReq.onsuccess = (event) => {
      const db = databaseReq.result;

      // check collection contains or not
      if (db.objectStoreNames.contains(COLLECTION)) {
        // collection transection
        const tx = db.transaction(COLLECTION, "readonly");
        const txStore = tx.objectStore(COLLECTION);
        // collection data
        const data = txStore.getAll();

        // handle data success
        data.onsuccess = (event) => {
          // close database on transection complete
          tx.oncomplete = () => db.close();
          resolve(data.result);
        };
        // handle data error
        data.onerror = (event) => {
          reject(event?.target?.error?.toString());
        };
      } else {
        reject("collection not found");
      }
    };
  });
};

export const createData = (DB, VERSION, COLLECTION, obj) => {
  return new Promise((resolve, reject) => {
    // open database
    const databaseReq = idb.open(DB, VERSION);
    // handle database error
    databaseReq.onerror = (event) => {
      reject(event.target?.error?.toString());
    };
    // handle database success
    databaseReq.onsuccess = (event) => {
      const db = databaseReq.result;
      // collection transection
      const tx = db.transaction(COLLECTION, "readwrite");
      const txStore = tx.objectStore(COLLECTION);
      // collection data
      const data = txStore.add({ ...obj });

      // handle data success
      data.onsuccess = (event) => {
        // close database on transection complete
        tx.oncomplete = () => db.close();
        resolve(data.result);
      };
      // handle data error
      data.onerror = (event) => {
        reject(event?.target?.error?.toString());
      };
    };
  });
};

export const updateData = (DB, VERSION, COLLECTION, updatedData) => {
  return new Promise((resolve, reject) => {
    // open database
    const databaseReq = idb.open(DB, VERSION);
    // handle database error
    databaseReq.onerror = (event) => {
      reject(event.target?.error?.toString());
    };
    // handle database success
    databaseReq.onsuccess = (event) => {
      const db = databaseReq.result;
      // collection transection
      const tx = db.transaction(COLLECTION, "readwrite");
      const txStore = tx.objectStore(COLLECTION);
      // put to collection data
      const data = txStore.put(updatedData);

      // handle data success
      data.onsuccess = (event) => {
        // close database on transection complete
        tx.oncomplete = () => db.close();
        resolve(data.result);
      };
      // handle data error
      data.onerror = (event) => {
        reject(event?.target?.error?.toString());
      };
    };
  });
};
export const deleteData = (DB, VERSION, COLLECTION, ID) => {
  return new Promise((resolve, reject) => {
    // open database
    const databaseReq = idb.open(DB, VERSION);
    // handle database error
    databaseReq.onerror = (event) => {
      reject(event.target?.error?.toString());
    };
    // handle database success
    databaseReq.onsuccess = (event) => {
      const db = databaseReq.result;
      // collection transection
      const tx = db.transaction(COLLECTION, "readwrite");
      const txStore = tx.objectStore(COLLECTION);
      // delete collection from data
      const data = txStore.delete(ID);

      // handle data success
      data.onsuccess = (event) => {
        // close database on transection complete
        tx.oncomplete = () => db.close();
        resolve(data.result);
      };
      // handle data error
      data.onerror = (event) => {
        reject(event?.target?.error?.toString());
      };
    };
  });
};
