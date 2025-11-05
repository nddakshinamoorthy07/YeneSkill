import { useState, useEffect } from 'react';
import {
  collection,
  query,
  onSnapshot,
  QueryConstraint,
} from 'firebase/firestore';
import { db } from '../firebase';

export function useFirestore<T>(
  collectionPath: string,
  ...queryConstraints: QueryConstraint[]
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const q = query(collection(db, collectionPath), ...queryConstraints);

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const documents: T[] = [];
        snapshot.forEach((doc) => {
          documents.push({ id: doc.id, ...doc.data() } as T);
        });
        setData(documents);
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [collectionPath]);

  return { data, loading, error };
}
