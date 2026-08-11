import { initializeApp, getApps, getApp, setLogLevel } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { initializeFirestore, memoryLocalCache, getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfigData from '../../firebase-applet-config.json';

// Mute internal Firebase SDK background connectivity warning logs
setLogLevel('silent');

// Prevent browser iframe tab backgrounding/unloading errors ("Database is closing/hidden") from crashing preview
if (typeof window !== 'undefined') {
  const isDbClosingError = (err: unknown) => {
    if (!err) return false;
    let msg = '';
    if (typeof err === 'string') {
      msg = err;
    } else if (err instanceof Error) {
      msg = (err.message || '') + ' ' + (err.stack || '');
    } else {
      try {
        msg = JSON.stringify(err);
      } catch {
        msg = String(err);
      }
    }
    const lowerMsg = msg.toLowerCase();
    return (
      lowerMsg.includes('database is closing') ||
      lowerMsg.includes('closing/hidden') ||
      lowerMsg.includes('could not reach cloud firestore') ||
      lowerMsg.includes('client is offline') ||
      lowerMsg.includes('indexeddb') ||
      lowerMsg.includes('failed to get document because the client is offline') ||
      lowerMsg.includes('internal error')
    );
  };

  window.addEventListener(
    'unhandledrejection',
    (event) => {
      if (isDbClosingError(event?.reason)) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
      }
    },
    true
  );

  window.addEventListener(
    'error',
    (event) => {
      if (isDbClosingError(event?.error) || isDbClosingError(event?.message)) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
      }
    },
    true
  );
}

const firebaseConfig = {
  apiKey: firebaseConfigData.apiKey,
  authDomain: firebaseConfigData.authDomain,
  projectId: firebaseConfigData.projectId,
  storageBucket: firebaseConfigData.storageBucket,
  messagingSenderId: firebaseConfigData.messagingSenderId,
  appId: firebaseConfigData.appId,
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

const dbDatabaseId = firebaseConfigData.firestoreDatabaseId && firebaseConfigData.firestoreDatabaseId !== '(default)'
  ? firebaseConfigData.firestoreDatabaseId
  : undefined;

// Use memoryLocalCache to prevent IndexedDB tab-closing/hidden locks in iframe environments
let firestoreDb;
try {
  if (dbDatabaseId) {
    firestoreDb = initializeFirestore(app, {
      localCache: memoryLocalCache(),
    }, dbDatabaseId);
  } else {
    firestoreDb = initializeFirestore(app, {
      localCache: memoryLocalCache(),
    });
  }
} catch {
  firestoreDb = dbDatabaseId ? getFirestore(app, dbDatabaseId) : getFirestore(app);
}

export const db = firestoreDb;

// Test connection on startup per Firebase skill requirements
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration.");
    }
  }
}
testConnection();

export default app;
