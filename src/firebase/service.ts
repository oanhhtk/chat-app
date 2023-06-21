import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "./config";

/**
 *
 * @param collectionName
 * @param data
 */
export const addDocument = async (
  collectionName: string,
  data: Record<string, any>
) => {
  const myCollecttion = collection(db, collectionName);
  // Add the document to the collection
  const newDocRef = await addDoc(myCollecttion, {
    ...data,
    createdAt: serverTimestamp(),
  });
  console.log("newDocRef :>> ", newDocRef);
};
