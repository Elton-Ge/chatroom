import { auth, provider } from "../..//firebase-config";
import { signInWithPopup } from "firebase/auth";
import { COOKIES_KEY, cookies } from "../../cookies";
import {
  setUserBadgeColor,
  setUserIsAuth,
  setUserName,
} from "../redux/features/user/userSlice";
import { useAppDispatch } from "../redux/app/hooks";
import { getRandomColor } from "../utils";
import styles from "./Auth.module.css";

export const Auth = () => {
  const dispatch = useAppDispatch();

  const signInWithGoogle = async () => {
    const { user } = await signInWithPopup(auth, provider);
    const authToken = user?.refreshToken || "";
    cookies.set(COOKIES_KEY, authToken);
    dispatch(setUserIsAuth(Boolean(authToken)));
    dispatch(setUserName(user?.displayName || "User"));
    dispatch(setUserBadgeColor(getRandomColor()));
  };

  return (
    <div className={styles.container}>
      <img
        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/barbarian.png"
        alt="barbarian"
      />

      <h2>Welcome to Warrior Chat Room</h2>
      <button onClick={signInWithGoogle}>Sign In with Google</button>
    </div>
  );
};
