import { useState } from "react";
import { cleanup, setUserRoom } from "../redux/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../redux/app/hooks";
import { COOKIES_KEY, cookies } from "../../cookies";
import styles from "./RoomLobby.module.css";

export const RoomLobby = () => {
  const [roomName, setRoomName] = useState("");
  const [error, setError] = useState("");

  const dispatch = useAppDispatch();
  const username = useAppSelector((state) => state.user.username);

  const handleEnterRoom = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!roomName) {
      setError("Please enter a room name");
      return;
    }
    dispatch(setUserRoom(roomName));
    setRoomName("");
  };

  const handleSignOut = () => {
    dispatch(cleanup());
    cookies.remove(COOKIES_KEY);
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles["card-header"]}>
            <div>Welcome</div>
            <div>{username}</div>
          </div>
          <div className={styles["card-body"]}>
            <form onSubmit={handleEnterRoom} noValidate>
              <div className={styles["form-group"]}>
                <input
                  type="text"
                  id="roomName"
                  name="roomName"
                  required
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                />
                <label htmlFor="roomName">Enter a Room Name</label>
                {error && <div className={styles.error}>{error}</div>}
              </div>
              <button type="submit" className={styles.btn}>
                Go
              </button>
            </form>
          </div>
        </div>
        <button className={styles.signOut} onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
    </>
  );
};
