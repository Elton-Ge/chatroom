import { Auth } from "./components/Auth";
import { RoomLobby } from "./components/RoomLobby";
import { useAppSelector } from "./redux/app/hooks";
import { Chat } from "./components/Chat";

function App() {
  const isAuth = useAppSelector((state) => state.user.userIsAuth);
  const userRoom = useAppSelector((state) => state.user.userRoom);

  if (!isAuth) return <Auth />;

  if (isAuth && !userRoom) return <RoomLobby />;

  return <Chat />;
}

export default App;
