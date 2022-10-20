import type { ServiceAccount } from 'firebase-admin';
import admin from 'firebase-admin';

import serviceAccountJson from './serviceAccountKey.json';

const serviceAccount: ServiceAccount = serviceAccountJson as ServiceAccount;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
