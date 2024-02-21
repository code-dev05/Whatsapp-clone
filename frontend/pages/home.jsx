import { useEffect, useState } from "react";
import "./home.css";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import useAxios from "../hooks/useAxios.js";
import useGetUserId from "../hooks/useGetUserId.js";

const Home = () => {
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(["token"]);

  useEffect(() => {
    if (!cookies.token) {
      navigate("/auth");
    }
  }, []);
  return (
    <div className="container">
      <Rooms />
    </div>
  );
};

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [chats, setChats] = useState([]);
  const [room, setRoom] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await useAxios.get(
        "http://localhost:3001/api/v1/rooms/userRooms"
      );
      setRooms(response.data.rooms);
    };

    fetchData();
  }, []);

  const handleClick = async (index) => {
    const roomId = rooms[index].id;
    const { data } = await useAxios(
      `http://localhost:3001/api/v1/rooms/chats/${roomId}`
    );
    console.log(data);
    setChats(data);
    setRoom(rooms[index]);
  };

  return (
    <>
      <div className="left">
        <div className="roomBar">
          <h1>ROOMS</h1>
          <div>
            <button>NEW</button>
            <button>JOIN</button>
          </div>
        </div>
        <div className="rooms">
          {rooms.map((room, index) => {
            return (
              <div
                className="room"
                key={index}
                onClick={() => handleClick(index)}
              >
                {room.name}
              </div>
            );
          })}
        </div>
      </div>
      {room.name && <Chats room={room} chats={chats} />}
    </>
  );
};

const Chats = ({ room, chats }) => {
  const [chat, setChat] = useState("");

  useEffect(() => {
    console.log(chats)
  }, [chats])

  return (
    <div className="right">
      <div className="header">{room.name}</div>
      <div className="chats">
        {chats.chats.map((chat, index) => {
          return <Chat chat={chat} key={index} />;
        })}
      </div>
      <div className="footer">
        <form>
          <img src="/images/search_icon.png" width="40px" />
          <input
            type="text"
            placeholder="Type Something Here..."
            value=""
            onChange={(e) => setChat(e.target.value)}
          />
          <img src="/images/right_arrow.png" width="40px" />
        </form>
      </div>
    </div>
  );
};

const Chat = ({chat}) => {
  let class_name = "";
  if (chat.sender == useGetUserId()) class_name += "sender"
  else class_name += "receiver";
  return <div className={class_name}>
    <p>{chat.message}</p>
  </div>
};

export default Home;
