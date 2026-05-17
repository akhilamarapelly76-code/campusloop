// src/firebase/dbServices.js
import { auth, db } from "./config";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from "firebase/auth";
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc 
} from "firebase/firestore";

// 1. WORK: USER SIGN UP
export const signUpUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Sign up error:", error.message);
    throw error;
  }
};

// 2. WORK: USER LOGIN [cite: 106, 112]
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Login error:", error.message);
    throw error;
  }
};

// 3. WORK: DEVICE DATA STORAGE (Upload a device to the database) [cite: 44, 115]
export const addDevice = async (deviceData) => {
  try {
    // deviceData will look like: { name: "Laptop", category: "Electronics", owner: "abc@mail.com", status: "available" }
    const docRef = await addDoc(collection(db, "devices"), {
      ...deviceData,
      createdAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error storing device data:", error);
    throw error;
  }
};

// 4. WORK: FETCH DEVICE LISTINGS (Get items to display on the home dashboard) [cite: 48, 114, 118]
export const fetchDevices = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "devices"));
    const devicesList = [];
    querySnapshot.forEach((doc) => {
      devicesList.push({ id: doc.id, ...doc.data() });
    });
    return devicesList;
  } catch (error) {
    console.error("Error fetching device data:", error);
    throw error;
  }
};

// 5. WORK: STORE & UPDATE RENTAL REQUESTS [cite: 116, 117, 119]
export const createRentalRequest = async (requesterEmail, deviceId) => {
  try {
    // Add request entry to 'requests' collection [cite: 117]
    await addDoc(collection(db, "requests"), {
      deviceId,
      requesterEmail,
      status: "pending",
      timestamp: new Date().toISOString()
    });

    // Update status of the actual device to 'requested' [cite: 119]
    const deviceRef = doc(db, "devices", deviceId);
    await updateDoc(deviceRef, { status: "requested" });

    return true;
  } catch (error) {
    console.error("Error processing rental request:", error);
    throw error;
  }
};