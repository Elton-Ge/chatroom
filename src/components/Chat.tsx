import { useEffect, useRef, useState } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "../../firebase-config";
import { useAppDispatch, useAppSelector } from "../redux/app/hooks";
import styles from "./Chat.module.css";
import { getFirstTwoLetters } from "../utils";
import { setUserExitRoom } from "../redux/features/user/userSlice";

type Message = {
  id: string;
  text: string;
  createdAt: typeof serverTimestamp;
  user: string;
  room: string;
};
export const Chat = () => {
  const [newMessage, setNewMessage] = useState("");
  const [queryMsgs, setQueryMsgs] = useState<Message[]>([]);
  const { username, userRoom, userBadgeColor } = useAppSelector(
    (state) => state.user
  );
  const dispatch = useAppDispatch();
  const msgCollection = collection(db, "messages");
  const ref = useRef<HTMLDivElement>(null);
  const handleSend = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!newMessage) {
      return;
    }
    try {
      await addDoc(msgCollection, {
        text: newMessage,
        createdAt: serverTimestamp(),
        user: username,
        room: userRoom,
      });
      setNewMessage("");
    } catch (error) {
      console.error(error);
      setNewMessage("");
    }
  };
  const handleLeaveRoom = () => {
    dispatch(setUserExitRoom());
  };

  useEffect(() => {
    const getMsgs = query(
      msgCollection,
      where("room", "==", userRoom),
      orderBy("createdAt")
    );

    const unSubscribe = onSnapshot(getMsgs, (snapshot) => {
      const msgs: Message[] = [];
      snapshot.forEach((doc) => {
        msgs.push({ ...doc.data(), id: doc.id } as Message);
      });
      setQueryMsgs(msgs);
    });

    return () => unSubscribe();
  }, []);

  useEffect(() => {
    //Auto scroll to bottom to show latest msg
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [queryMsgs]);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles["card-header"]}>
          ChatRoom: {userRoom}
          <button className={styles.leaveBtn} onClick={handleLeaveRoom}>
            Leave Room
          </button>
        </div>
        <div className={styles["card-body"]}>
          {queryMsgs.map((msg) => {
            if (msg.user === username) {
              return (
                <div
                  key={msg.id}
                  className={`${styles.message} ${styles["message-sent"]}`}
                >
                  <span
                    className={styles.badge}
                    style={{ backgroundColor: userBadgeColor }}
                  >
                    {getFirstTwoLetters(msg.user)}
                  </span>
                  {msg.text}
                </div>
              );
            } else {
              return (
                <div
                  key={msg.id}
                  className={`${styles.message} ${styles["message-received"]}`}
                >
                  <span className={styles.badge}>
                    {getFirstTwoLetters(msg.user)}
                  </span>
                  {msg.text}
                  <div ref={ref}></div>
                </div>
              );
            }
          })}
        </div>
        <form className={styles.form} onSubmit={handleSend}>
          <input
            type="text"
            className={styles["form-input"]}
            placeholder="Type your message here"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            required
          />
          <button
            type="submit"
            className={styles["form-button"]}
            disabled={!newMessage}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};
