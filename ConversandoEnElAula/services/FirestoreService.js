import { app } from '../firebase';

const firestore = app.firestore();

export const addMessage = async (coleccion, mensaje) => {
  return await firestore.collection(coleccion).add(mensaje);
};

export const getAll = async (coleccion, onResult, onError) => {
  return await firestore
    .collection(coleccion)
    .orderBy("createdAt", "desc")
    .onSnapshot(onResult, onError);
};