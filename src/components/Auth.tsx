import { auth, provider } from "../..//firebase-config";
import { signInWithPopup } from "firebase/auth";
import { COOKIES_KEY, cookies } from "../../cookies";
import { setUserBadgeColor, setUserIsAuth, setUserName } from "../redux/features/user/userSlice";
import { useAppDispatch } from "../redux/app/hooks";
import { getRandomColor } from "../utils";

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
    <div>
      <p>Welcome to Chat Room</p>
      <button onClick={signInWithGoogle}>Sign In with Google</button>
    </div>
  );
};
