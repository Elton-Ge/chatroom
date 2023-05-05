import { Auth } from "./components/Auth";
import { RoomLobby } from "./components/RoomLobby";
import { useAppDispatch, useAppSelector } from "./redux/app/hooks";
import { Chat } from "./components/Chat";

function App() {
  const isAuth = useAppSelector((state) => state.user.userIsAuth);
  const userRoom = useAppSelector((state) => state.user.userRoom);
  const dispatch = useAppDispatch();
  
  if (!isAuth) return <Auth />;

  if (isAuth && !userRoom) return <RoomLobby />;

  return <Chat />;
}

export default App;
