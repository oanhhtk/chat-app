import React, { useState } from "react";
import { db } from "../firebase/config";

const useFirestore = (collection: any, condition: any) => {
  const [documents, setDocuments] = useState([]);

  React.useEffect(() => {
    let collectionRef = db.collection(collection).orderBy("createdAt");
    if (condition) {
      if (!condition.compareValue || !condition.compareValue.length) {
        // reset documents data
        setDocuments([]);
        return;
      }

      collectionRef = collectionRef.where(
        condition.fieldName,
        condition.operator,
        condition.compareValue
      );
    }

    const unsubscribe = collectionRef.onSnapshot((snapshot: any) => {
      console.log("snap :>> ", snapshot);
      const documents = snapshot.docs.map((doc: any) => {
        console.log("doc.data() :>> ", doc.data());
        return {
          ...doc.data(),
          id: doc.id,
        };
      });

      setDocuments(documents);
    });

    return unsubscribe;
  }, [collection, condition]);

  return documents;
};

export default useFirestore;
