import {
  WhereFilterOp,
  collection,
  getDoc,
  getDocs,
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
        where(condition.fieldName, condition.operator, condition.compareValue),
        orderBy("createdAt", "desc")
      );
    }

    const currList: any[] = [];

    const unsubcribe = onSnapshot(
      collectionRef,
      (snapshot: any) => {
        snapshot.forEach((doc: any) => {
          console.log("doc.data() :>> ", doc.data());
        });
        const documents = snapshot.docs.map((item: any) => {
          console.log("object :>> ", item.data());
          currList.push(item.data());
          return {
            ...item.data(),
            id: item.id,
          };
        });
        console.log("currList :>> ", currList);
        setDocument(documents);
      },
      (erro) => {
        console.log("erro :>> ", erro);
      }
    );

    return unsubcribe;
  }, [collectionName, condition]);

  return documents;
}
