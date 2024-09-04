import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAmhCQt22mfE0qSZ-VDb6RzijTbLn5IdHU",
  authDomain: "dawn-2-dusk-blogs-web.firebaseapp.com",
  projectId: "dawn-2-dusk-blogs-web",
  storageBucket: "dawn-2-dusk-blogs-web.appspot.com",
  messagingSenderId: "378557266615",
  appId: "1:378557266615:web:6aa069f26129e23ec8ab32"
};

export const app = initializeApp(firebaseConfig);

export const uploadImage = async (imageFile, onProgress) => {
  try {
    if (!imageFile) throw new Error("No image file provided.");

    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progressValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (onProgress) onProgress(progressValue); 
        },
        (error) => {
          reject(error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          } catch (error) {
            reject(error);
          }
        }
      );
    });
  } catch (error) {
    console.error("Image upload error:", error);
    throw error;
  }
};
