import { initializeApp } from "firebase/app";
// import { v4 as uuid } from "uuid";
import {
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getDatabase, ref, get, set, remove } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

// firebase 초기화
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const database = getDatabase(app);

// 자동로그인 방지
provider.setCustomParameters({
  prompt: "select_account",
});

/** 관리자 계정 */

/** 로그인, 인증 관리 */
// 로그인하면 user 객체 리턴
export function login() {
  signInWithPopup(auth, provider).catch((error) => {
    return error.code;
  });
}

// 이메일 로그인
export function emailLogin(email, password) {
  signInWithEmailAndPassword(auth, email, password).catch((error) => {
    if (error) {
      alert("이메일과 비밀번호를 다시 확인해주세요.");
      return;
    }
  });
}

// 로그아웃하면 null 리턴
export function logout() {
  signOut(auth).catch((error) => {
    return error;
  });
}

// 사용자 상태 변경
export function onUserStateChange(callback) {
  // 사용자의 상태가 변경될때마다 콜백함수 호출
  onAuthStateChanged(auth, async (user) => {
    // 로그인 상태를 확인하여 로그인한 user객체 또는 null값을 전달
    const updatedUser = user ? await adminUser(user) : null;
    callback(updatedUser);
  });
}

// admin 유저 확인
async function adminUser(user) {
  // database에서 admins이라는 key의 객체를 읽어와서 snapshot으로 대입
  return get(ref(database, "admins")) //
    .then((snapshot) => {
      if (snapshot.exists()) {
        // snapshot이 존재한다면
        const admins = snapshot.val(); // snapshot의 value를 가져옴
        // console.log(admins); // relatime database에 admins로 저장한 uid 배열 출력
        const isAdmin = admins.includes(user.uid);
        return { ...user, isAdmin }; // user객체에 isAdmin 키와 밸류 추가
      }
      return user;
    });
}

/** 상품들 관리 */
// 새 상품 추가
export async function addNewProduct(product, imageUrl) {
  const id = new Date();
  return set(ref(database, `products/${id}`), {
    ...product,
    id,
    price: parseInt(product.price),
    image: imageUrl,
    options: product.options.split(","),
  });
}

// 상품 목록 가져오기
export async function getProducts() {
  return get(ref(database, "products")).then((snapshot) => {
    if (snapshot.exists()) {
      // value들만 가져옴
      return Object.values(snapshot.val());
    }
    return [];
  });
}

/** 쇼핑카드 관리 */
// 사용자의 장바구니 목록 가져오기
export async function getCart(userId) {
  return get(ref(database, `carts/${userId}`)) //
    .then((snapshot) => {
      const items = snapshot.val() || {};
      return Object.values(items);
    });
}

// 사용자의 장바구니 아이템 추가,업데이트
export async function addOrUpdateToCart(userId, product) {
  return set(ref(database, `carts/${userId}/${product.id}`), product);
}

// 사용자의 장바구니 아이템 제거
export async function removeFromCart(userId, productId) {
  return remove(ref(database, `carts/${userId}/${productId}`));
}
