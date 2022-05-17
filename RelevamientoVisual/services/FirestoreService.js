import { app } from '../firebase';
import uuid from 'react-native-uuid';

const storage = app.storage("gs://react-native-99d38.appspot.com");

export const saveImageInStorage = async (imgRefName, blob) => {
  try {
    const docName = uuid.v4().toString();
    const ref = storage.ref(imgRefName + "/" + docName);
    await ref.put(blob);
    const respuesta = { ref: ref, docName: docName };
    return respuesta;
  } catch (error) {
    throw new Error(error.message);
  }
};

const firestore = app.firestore();

export const saveInCollection = async (collection, docName, pic) => {
  return await firestore.collection(collection).doc(docName).set(pic);
};

export const getAllByUser = async (collection, email, type, onResult, onError) => {
  return await firestore
    .collection(collection)
    .where("email", "==", email)
    .where("tipo", "==", type)
    .onSnapshot(onResult, onError);
};

export const getAll = async (collection, type, onResult, onError) => {
  return await firestore.collection(collection).where("tipo", "==", type).orderBy('fecha', 'desc').onSnapshot(onResult, onError);
};

export const updateVotes = async (collection, doc, email, prevVotes) => {
  const votosActualizados = [...prevVotes, email];
  return await firestore.collection(collection).doc(doc).update({
    votos: votosActualizados,
  });
};