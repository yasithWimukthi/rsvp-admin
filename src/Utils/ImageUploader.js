import { storage } from "../firebase/firebase.config";
import firebase from "firebase/app";

export async function ImageUploader(imageFile) {
  try {
    const uploadTask = storage
      .ref("categories/" + imageFile.name)
      .put(imageFile);
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        console.log(snapshot);
        return snapshot;
      },
      (error) => {
        console.log(error);
        return error;
      },
      () => {
        storage
          .ref("categories")
          .child(imageFile.name)
          .getDownloadURL()
          .then((url) => {
            return url;
          })
          .catch((e) => {
            console.log(e);
            return e;
          });
      }
    );
  } catch (error) {
    console.log(error);
    return error;
  }
}
