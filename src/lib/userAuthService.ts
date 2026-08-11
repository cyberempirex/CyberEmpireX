import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signInWithRedirect,
  signOut, 
  sendEmailVerification, 
  sendPasswordResetEmail, 
  updateProfile,
  User
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, googleProvider, db } from './firebase';
import { UserProfile } from '../types';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export async function syncUserProfileFromFirestore(user: User): Promise<UserProfile> {
  const fallbackProfile: UserProfile = {
    isLoggedIn: true,
    name: user.displayName || user.email?.split('@')[0] || 'User',
    username: `@${(user.displayName || user.email?.split('@')[0] || 'user').toLowerCase().replace(/[^a-z0-9_]/g, '')}`,
    email: user.email || '',
    avatarUrl: user.photoURL || '',
    joinedDate: 'Aug 2026',
    role: 'Registered User',
    country: 'Global',
    emailVerified: user.emailVerified,
    accountStatus: 'Active',
    lastActivity: new Date().toISOString()
  };

  try {
    const userRef = doc(db, 'users', user.uid);
    const snap = await getDoc(userRef);

    if (snap.exists()) {
      const data = snap.data();
      if (data.emailVerified !== user.emailVerified) {
        await updateDoc(userRef, { emailVerified: user.emailVerified, updatedAt: new Date().toISOString() }).catch(() => {});
      }

      return {
        isLoggedIn: true,
        name: data.displayName || user.displayName || user.email?.split('@')[0] || 'User',
        username: `@${(data.displayName || user.email?.split('@')[0] || 'user').toLowerCase().replace(/[^a-z0-9_]/g, '')}`,
        email: user.email || '',
        avatarUrl: user.photoURL || data.photoURL || '',
        joinedDate: data.createdAt ? new Date(data.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Aug 2026',
        role: data.role || 'Registered User',
        country: data.country || 'Global',
        emailVerified: user.emailVerified,
        accountStatus: data.accountStatus || 'Active',
        lastActivity: new Date().toISOString()
      };
    } else {
      const newProfileData = {
        uid: user.uid,
        email: user.email || '',
        emailVerified: user.emailVerified,
        displayName: user.displayName || user.email?.split('@')[0] || 'User',
        photoURL: user.photoURL || '',
        country: 'United States',
        role: 'Registered User',
        accountStatus: 'Active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      await setDoc(userRef, newProfileData).catch((err) => {
        handleFirestoreError(err, OperationType.WRITE, `users/${user.uid}`);
      });

      return {
        isLoggedIn: true,
        name: newProfileData.displayName,
        username: `@${newProfileData.displayName.toLowerCase().replace(/[^a-z0-9_]/g, '')}`,
        email: newProfileData.email,
        avatarUrl: newProfileData.photoURL,
        joinedDate: 'Aug 2026',
        role: 'Registered User',
        country: 'United States',
        emailVerified: user.emailVerified,
        accountStatus: 'Active',
        lastActivity: newProfileData.updatedAt
      };
    }
  } catch (err) {
    handleFirestoreError(err, OperationType.GET, `users/${user.uid}`);
    return fallbackProfile;
  }
}

export async function registerWithEmail(email: string, pass: string, displayName: string, country: string) {
  const res = await createUserWithEmailAndPassword(auth, email, pass);
  if (displayName) {
    await updateProfile(res.user, { displayName }).catch(() => {});
  }
  
  // Send email verification
  await sendEmailVerification(res.user).catch((err) => console.warn('Verification email error:', err));

  // Initialize Firestore record
  const userRef = doc(db, 'users', res.user.uid);
  await setDoc(userRef, {
    uid: res.user.uid,
    email: res.user.email || email,
    emailVerified: false,
    displayName: displayName || email.split('@')[0],
    photoURL: '',
    country: country || 'United States',
    role: 'Registered User',
    accountStatus: 'Active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }).catch((err) => console.error('Error saving user profile doc:', err));

  return res.user;
}

export async function loginWithEmail(email: string, pass: string) {
  const res = await signInWithEmailAndPassword(auth, email, pass);
  return res.user;
}

export async function loginWithGoogle() {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    await syncUserProfileFromFirestore(res.user);
    return res.user;
  } catch (err: any) {
    if (err.code === 'auth/popup-blocked' || err.code === 'auth/popup-closed-by-user' || err.code === 'auth/cancelled-popup-request') {
      try {
        await signInWithRedirect(auth, googleProvider);
        return null;
      } catch (redirectErr) {
        throw redirectErr;
      }
    }
    throw err;
  }
}

export async function sendPasswordReset(email: string) {
  await sendPasswordResetEmail(auth, email);
}

export async function resendVerification() {
  if (auth.currentUser) {
    await sendEmailVerification(auth.currentUser);
  }
}

export async function logoutUser() {
  await signOut(auth);
}
