import { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { app } from './firebase';

const useUploadImage = (imageFile) => {
  const [downloadURL, setDownloadURL] = useState(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!imageFile) return;

    const uploadImage = async () => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + imageFile.name;
      const storageRef = ref(storage, fileName);

      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progressValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progressValue);
        },
        (uploadError) => {
          setError(uploadError);
        },
        async () => {
          try {
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            setDownloadURL(url);
          } catch (urlError) {
            setError(urlError);
          }
        }
      );
    };

    uploadImage();
  }, [imageFile]);

  return { downloadURL, progress, error };
};

export default useUploadImage;
