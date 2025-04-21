import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase"; // firebase.js에서 storage 불러옴

export const uploadImage = async (file, userEmail, sectionId, boxIndex) => {
  const cleanEmail = userEmail.replace(/[^a-zA-Z0-9]/g, "_");
  const fileName = `box${boxIndex + 1}_${Date.now()}_${file.name}`;
  const storagePath = `orders/${cleanEmail}/${sectionId}/${fileName}`;

  const storageRef = ref(storage, storagePath);
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);

  return { fileName, downloadURL, storagePath };
};
