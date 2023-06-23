import {
  WhereFilterOp,
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";

type ConditionType = {
  fieldName: string;
  operator: WhereFilterOp;
  compareValue: string;
};

export default function useFirestore<T>(
  collectionName: string,
  condition: ConditionType
): T[] {
  const [documents, setDocument] = useState<any>();
  useEffect(() => {
    let collectionRef = collection(db, collectionName);
    // Create a query against the collection.
    if (!condition.compareValue || !condition.compareValue?.length) return;
    if (condition) {
      query(
        collectionRef,
        orderBy("createdAt"),
        where(condition.fieldName, condition.operator, condition.compareValue)
      );
    }
    const unsubcribe = onSnapshot(collectionRef, (snapshot) => {
      const documents = snapshot.docs.map((item) => ({
        ...item.data(),
        id: item.id,
      }));
      setDocument(documents);
    });
    return unsubcribe;
  }, [collectionName, condition]);

  return documents;
}

function loggingIdentity<Type>(arg: any): Type {
  return arg;
}
