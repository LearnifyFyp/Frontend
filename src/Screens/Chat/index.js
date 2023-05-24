import React, { useEffect, useRef, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { GrChat } from "react-icons/gr";
import { ImLink } from "react-icons/im";
import { IoIosArrowBack, IoIosSend } from "react-icons/io";
import Buttons from "../../Components/Button/Button";
import classes from "./chatStyle.module.css";
// mui
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import io from "socket.io-client";
import { Get, Post } from "../../AxiosFunction/AxiosFunction";
import CreateRoomModal from "../../Components/CreateRoomModal";
import Loader from "../../Components/Loader";
import { BaseUrl, apiUrl } from "../../Config/apiUrl";
import { useLocation } from "react-router-dom";

const Index = () => {
  const { token, user } = useSelector((state) => state?.authReducer);
  const [selectedMsg, setSelectedMsg] = useState(null);
  const [message, setMessage] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState();
  const [userData, setUserData] = useState({});
  const [getChats, setGetChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [getAllMessages, setgetAllMessages] = useState([]);
  const [isChatBoxOpen, setisChatBoxOpen] = useState(false);
  const [createRoomModalOpen, setCreateRoomModalOpen] = useState(false);
  // const [createRoomModalOpen, setCreateRoomModalOpen] = useState(false);
  // socket
  const [socketConnected, setSocketConnected] = useState(false);
  // loader
  const [roomLoader, setRoomLoader] = useState(false);
  const [chatLoader, setChatLoader] = useState(false);
  const [isCreatting, setIsCreatting] = useState(false);
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const location = useLocation()?.state;
  useEffect(() => {}, []);

  const socket = io(apiUrl);

  useEffect(() => {
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    // eslint-disable-next-line
    socket.off("connected");
    socket.off("message recieved");
  }, []);
  useEffect(() => {
    if (!socket) return;
    socket.on("message recieved", (newMessageRecieved) => {
      console.log(selectedRoom, "selectedRoomselectedRoom");
      if (
        newMessageRecieved?.sender?._id !== user?._id
        // &&
        // newMessageRecieved?.chat?._id === "645c530a2b072eb76ecc150d"
      ) {
        setgetAllMessages((pre) => [...pre, newMessageRecieved]);
      }
    });
  }, []);

  const HandleCreateRoom = async (param) => {
    if (param == null) {
      return toast.error("Please Select user");
    }
    const apiUrl = BaseUrl(`chat/new`);
    setIsCreatting(true);
    const response = await Post(apiUrl, { userId: param }, token);
    if (response !== undefined) {
      console.log(response, "responseresponse");
      setGetChats([response?.data, ...getChats]);
      toast.success("Room Created Successfully");
      setCreateRoomModalOpen(false);
    }
    setIsCreatting(false);
  };

  const HandleGetChat = async () => {
    const apiUrl = BaseUrl(`chat`);
    setRoomLoader(true);
    const response = await Get(apiUrl, token);
    if (response !== undefined) {
      setGetChats(response?.data);
      if (location) {
        // const filterRooms = response?.data?.filter(
        //   (ele) => ele?.latestMessage?.sender?._id == location?.user?._id
        // );
        const filterRooms = response?.data?.filter(
          (ele) =>
            ele?.users?.find((ite) => ite?._id == location?.user?._id)?._id ==
            location?.user?._id
        );

        if (filterRooms?.length !== 0) {
          await handleAllMessage(filterRooms[0]);
          await setSelectedRoom(filterRooms[0]);
        } else {
          setCreateRoomModalOpen(true);
        }
      }
    }
    setRoomLoader(false);
  };

  useEffect(() => {
    HandleGetChat();
  }, []);

  const handleAllMessage = async (item) => {
    const apiUrl = BaseUrl(`chat/${item?._id}`);
    setChatLoader(true);
    const response = await Get(apiUrl, token);
    if (response !== undefined) {
      setisChatBoxOpen(true);
      setgetAllMessages(response?.data);
      socket.emit("join chat", item._id);
    }
    setChatLoader(false);
  };

  const handleSendMsg = async () => {
    if (message === "") {
      return;
    }
    setgetAllMessages((pre) => [
      ...pre,
      { content: message, sender: { name: user?.name, _id: user?._id } },
    ]);
    setMessage("");
    const apiUrl = BaseUrl("chat");
    const response = await Post(
      apiUrl,
      { content: message, chatId: selectedRoom?._id },
      token
    );
    if (response !== undefined) {
      socket.emit("new message", response?.data?.message);
    }
  };
  const handleFuncCall = (e) => {
    if (e.key == "Enter") {
      handleSendMsg();
    }
  };
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef?.current) {
      chatRef?.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [getAllMessages]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  return (
    <>
      {/* <Header /> */}

      <div className={classes.containerMain}>
        <aside
          style={
            windowSize < 768 && selectedRoom !== null ? { display: "none" } : {}
          }
          className={classes.asideMain}
        >
          <header>
            <div className={classes.msgHeading}>
              <h3>All Message</h3>
              {/* <span>
                <MdOutlineKeyboardArrowDown
                  color="var(--black-color)"
                  size={40}
                />
              </span> */}
              <Buttons
                onClick={() => setCreateRoomModalOpen(true)}
                label={"Create"}
              />
            </div>
            <div className={classes.roomSearch}>
              <input type="text" placeholder="Search Chat" />
              <span>
                <BiSearch size={30} color={"#A7A7A7"} />
              </span>
            </div>
          </header>
          {roomLoader ? (
            <Loader />
          ) : (
            <ul>
              {getChats?.map((item) => {
                const findUser = item?.users?.find(
                  (ele) => ele?._id !== user?._id
                );
                return (
                  <li
                    style={
                      selectedRoom?._id == item?._id
                        ? { background: "#e1e1e1" }
                        : {}
                    }
                    // onClick={() => setSelectedMsg(item)}
                    onClick={() => {
                      setSelectedRoom(item);
                      handleAllMessage(item);
                    }}
                  >
                    <div className={classes.avatarMain}>
                      <img src={findUser?.avatar?.url} alt="" />
                    </div>
                    <div>
                      <h2
                        style={
                          selectedRoom?._id == item?._id
                            ? { color: "var(--light-black-color)" }
                            : {}
                        }
                      >
                        {findUser?.name}
                      </h2>
                      <div className={classes.lastMsg}>
                        <p
                          style={
                            selectedRoom?._id == item?._id
                              ? { color: "var(--heading-color)" }
                              : {}
                          }
                        >
                          {item?.latestMessage?.content}
                        </p>
                        {/* <span>2</span> */}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </aside>
        <main
          style={
            windowSize < 768 && selectedRoom !== null
              ? { display: "inline-block" }
              : {}
          }
          className={classes.chatMain}
        >
          {chatLoader ? (
            <Loader />
          ) : (
            <>
              {selectedRoom !== null && (
                <header>
                  <div
                    onClick={() => setSelectedRoom(null)}
                    className={classes.backIcon}
                  >
                    <IoIosArrowBack color="#fff" size={30} />
                  </div>
                  <img
                    src={
                      selectedRoom?.users?.find(
                        (ele) => ele?._id !== user?._id
                      )["avatar"]["url"]
                    }
                    alt=""
                  />
                  <div className={classes.headerInnerDiv}>
                    <h2>
                      {
                        selectedRoom?.users?.find(
                          (ele) => ele?._id !== user?._id
                        )["name"]
                      }
                    </h2>
                    <h3>
                      {
                        selectedRoom?.users?.find(
                          (ele) => ele?._id !== user?._id
                        )["email"]
                      }
                    </h3>
                  </div>
                </header>
              )}
              {selectedRoom !== null ? (
                <ul className={classes.chat}>
                  <div className={classes.scrollChat}>
                    {getAllMessages?.map((item) => {
                      return (
                        <li
                          ref={chatRef}
                          className={
                            item?.sender?._id == user?._id
                              ? classes.me
                              : classes.you
                          }
                        >
                          <div className={classes.entete}>
                            <span
                              className={[
                                `${(classes.status, classes.green)}`,
                              ].join(" ")}
                            ></span>
                            <h2>{item?.sender?.name}</h2>
                            {/* <h3>10:12AM, Today</h3> */}
                          </div>
                          <div
                            style={
                              item?.sender?._id !== user?._id
                                ? {
                                    borderBottomRightRadius: "50px",
                                    borderBottomLeftRadius: "0px",
                                  }
                                : {}
                            }
                            className={classes.message}
                          >
                            {item?.content}
                          </div>
                        </li>
                      );
                    })}
                  </div>
                </ul>
              ) : (
                <div className={classes.noSelectedRoom}>
                  <div>
                    <GrChat size={70} color={"#343424"} />
                    <h6>Select your conversation?</h6>
                  </div>
                </div>
              )}
              {selectedRoom !== null && (
                <footer className={classes.footerMain}>
                  <div className={classes.sendMsg}>
                    <input
                      onKeyDown={handleFuncCall}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message"
                    />
                    <span>{/* <ImLink size={24} color={"#fff"} /> */}</span>

                    <div
                      onClick={handleSendMsg}
                      // onClick={() => {
                      //   if (message?.length !== "") {
                      //     const tempArr = { ...selectedMsg };
                      //     tempArr?.messages?.push({ text: message });
                      //     setSelectedMsg(tempArr);
                      //     setMessage("");
                      //   }
                      // }}
                      className={classes.sendBtn}
                    >
                      <IoIosSend size={28} color={"var(--main-color)"} />
                    </div>
                  </div>
                </footer>
              )}
            </>
          )}
        </main>
      </div>
      {createRoomModalOpen && (
        <CreateRoomModal
          HandleCreateRoom={HandleCreateRoom}
          isCreatting={isCreatting}
          setShow={setCreateRoomModalOpen}
          show={createRoomModalOpen}
          getChats={getChats}
        />
      )}
    </>
  );
};

export default Index;

const getChat = [
  {
    _id: 100,
    title: "Markus Rode",
    category: "Property Agent (Seller)",
    lastMessage:
      "Sed ut persium, totam rem aperiam, eaqutaur magni dolores eos qui ratione voluptatem",
    lastMessageTime: "10 min ago",
    unreadMsgCount: "2",
    messages: [
      {
        text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque",
      },
      {
        text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque",
      },
      {
        text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque",
      },
      {
        text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque",
      },
      {
        text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque",
      },
    ],
  },
  {
    _id: 101,
    title: "Markus Rode",
    category: "Property Agent (Seller)",
    lastMessage:
      "Sed ut persium, totam rem aperiam, eaqutaur magni dolores eos qui ratione voluptatem",
    lastMessageTime: "10 min ago",
    unreadMsgCount: "2",
    messages: [
      {
        text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque",
      },
      {
        text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque",
      },
      {
        text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque",
      },
      {
        text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque",
      },
      {
        text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque",
      },
    ],
  },
  {
    _id: 102,
    title: "Markus Rode",
    category: "Property Agent (Seller)",
    lastMessage:
      "Sed ut persium, totam rem aperiam, eaqutaur magni dolores eos qui ratione voluptatem",
    lastMessageTime: "10 min ago",
    unreadMsgCount: "2",
    messages: [
      {
        text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque",
      },
      {
        text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque",
      },
      {
        text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque",
      },
      {
        text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque",
      },
      {
        text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque",
      },
    ],
  },
  {
    _id: 103,
    title: "Markus Rode",
    category: "Property Agent (Seller)",
    lastMessage:
      "Sed ut persium, totam rem aperiam, eaqutaur magni dolores eos qui ratione voluptatem",
    lastMessageTime: "10 min ago",
    unreadMsgCount: "2",
    messages: [
      {
        text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque",
      },
      {
        text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque",
      },
      {
        text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque",
      },
      {
        text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque",
      },
      {
        text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque",
      },
    ],
  },
  {
    _id: 104,
    title: "Markus Rode",
    category: "Property Agent (Seller)",
    lastMessage:
      "Sed ut persium, totam rem aperiam, eaqutaur magni dolores eos qui ratione voluptatem",
    lastMessageTime: "10 min ago",
    unreadMsgCount: "2",
    messages: [
      {
        text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque",
      },
      {
        text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque",
      },
      {
        text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque",
      },
      {
        text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque",
      },
      {
        text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque",
      },
    ],
  },
];
