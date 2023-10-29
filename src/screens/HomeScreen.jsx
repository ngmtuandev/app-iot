import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { TouchableWithoutFeedback } from "react-native-web";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_NAME } from "../constansts/screens";
import axios from "axios";
import WebSocket from "isomorphic-ws";
export default function HomeScreen() {
  const navigation = useNavigation();
  const [isDoor, setIsDoor] = useState(false);
  const [curr, setCurr] = useState(null);

  const current = useRef(null);

  const channelID = "2321828";
  const field = "cu chi"; // Thay thế bằng trường dữ liệu bạn muốn lấy
  const apiKey = "AEC66MXZL9TSPVVC";
  const apiUrl = "https://api.thingspeak.com/update";

  // const url = `https://api.thingspeak.com/channels/${channelID}/fields/${field}.json?api_key=${apiKey}`;
  const think =
    "https://api.thingspeak.com/channels/2321828/feeds.json?api_key=AEC66MXZL9TSPVVC&results=2";
  // setInterval(() => {
  //   (() => {
  //     fetch(think)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         console.log("data", +data.feeds[0].field1);
  //         setCurr(+data.feeds[0].field1);
  //         // if (+data.feeds[0].field1 === 4) {
  //         //   // console.log("mo cua");
  //         //   setIsDoor(false);
  //         // } else {
  //         //   setIsDoor(true);
  //         //   // console.log("dong cua");
  //         // }
  //       })
  //       .catch((error) => {
  //         console.error("Lỗi khi lấy dữ liệu từ ThingSpeak", error);
  //       });
  //   })();
  // }, 1000);
  // useEffect(() => {
  //   ;
  // }, [curr]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(think);
  //       const data = await response.json();
  //       console.log("test", +data.feeds[0].field1);
  //       if (+data.feeds[0].field1 === 4) {
  //         setCurr(+data.feeds[0].field1);
  //       } else {
  //         setCurr(+data.feeds[0].field1);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data from ThingSpeak", error);
  //     }
  //   };

  //   const intervalId = setInterval(fetchData, 100);

  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, [curr, isDoor]);

  setInterval(() => {
    (async () => {
      fetch(think)
        .then((response) => response.json())
        .then((data) => {
          current.current = +data?.feeds[0].field1;
        })
        .catch((error) => {
          console.error("Lỗi khi lấy dữ liệu từ ThingSpeak", error);
        });
    })();
    console.log("current  ", current.current);
  }, 2000);

  const handleSendData = async () => {
    if (+current.current === 0) {
      axios.post(
        `https://api.thingspeak.com/update?api_key=9MW9VYJ6HMMJYMLB&field1=${4}`
      );
      (async () => {
        await fetch(think)
          .then((response) => response.json())
          .then((data) => {
            // current.current = +data?.feeds[0].field1;
            current.current === 4 && setIsDoor(true);
          })
          .catch((error) => {
            console.error("Lỗi khi lấy dữ liệu từ ThingSpeak", error);
          });
      })();
    } else {
      axios.post(
        `https://api.thingspeak.com/update?api_key=9MW9VYJ6HMMJYMLB&field1=${0}`
      );
      (async () => {
        await fetch(think)
          .then((response) => response.json())
          .then((data) => {
            // current.current = +data?.feeds[0].field1;
            current.current === 0 && setIsDoor(false);
          })
          .catch((error) => {
            console.error("Lỗi khi lấy dữ liệu từ ThingSpeak", error);
          });
      })();
    }
  };

  // console.log("curr >>>>", curr);
  // if (+curr === 4) {
  //   console.log("hien tai cua mo");
  //   setIsDoor(true);
  //   await axios
  //     .post(
  //       `https://api.thingspeak.com/update?api_key=9MW9VYJ6HMMJYMLB&field1=${0}`
  //     )
  //     .then((response) => {
  //       setCurr(0);
  //       (() => {
  //         fetch(think)
  //           .then((response) => response.json())
  //           .then((data) => {
  //             console.log(+data.feeds[0].field1);
  //             setCurr(+data.feeds[0].field1);
  //             if (+data.feeds[0].field1 === 4) {
  //               // console.log("mo cua");
  //               setIsDoor(false);
  //             } else {
  //               setIsDoor(true);
  //               // console.log("dong cua");
  //             }
  //           })
  //           .catch((error) => {
  //             console.error("Lỗi khi lấy dữ liệu từ ThingSpeak", error);
  //           });
  //       })();
  //     })
  //     .catch((error) => {
  //       console.error("Error sending data to ThingSpeak", error);
  //     });
  // } else {
  //   setIsDoor(false);
  //   console.log("hien tai cua dong");
  //   await axios
  //     .post(
  //       `https://api.thingspeak.com/update?api_key=9MW9VYJ6HMMJYMLB&field1=${4}`
  //     )
  //     .then((response) => {
  //       setCurr(4);
  //       (() => {
  //         fetch(think)
  //           .then((response) => response.json())
  //           .then((data) => {
  //             console.log(+data.feeds[0].field1);
  //             setCurr(+data.feeds[0].field1);
  //             if (+data.feeds[0].field1 === 4) {
  //               // console.log("mo cua");
  //               setIsDoor(false);
  //             } else {
  //               setIsDoor(true);
  //               // console.log("dong cua");
  //             }
  //           })
  //           .catch((error) => {
  //             console.error("Lỗi khi lấy dữ liệu từ ThingSpeak", error);
  //           });
  //       })();
  //     })
  //     .catch((error) => {
  //       console.error("Error sending data to ThingSpeak", error);
  //     });
  // }

  // while (true) {
  //   (() => {
  //     fetch(think)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         console.log(+data.feeds[0].field1);
  //         setCurr(+data.feeds[0].field1);
  //         if (+data.feeds[0].field1 === 4) {
  //           // console.log("mo cua");
  //           setIsDoor(false);
  //         } else {
  //           setIsDoor(true);
  //           // console.log("dong cua");
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Lỗi khi lấy dữ liệu từ ThingSpeak", error);
  //       });
  //   })();
  // }

  // const handleSendData = async () => {
  //   console.log("curr : ", curr);
  //   try {
  //     if (+curr === 4) {
  //       console.log("hien tai cua mo");
  //       await axios.post(
  //         `https://api.thingspeak.com/update?api_key=9MW9VYJ6HMMJYMLB&field1=0`
  //       );
  //       setIsDoor(true);
  //       setCurr(0);
  //     } else {
  //       console.log("hien tai cua dong");
  //       await axios.post(
  //         `https://api.thingspeak.com/update?api_key=9MW9VYJ6HMMJYMLB&field1=4`
  //       );
  //       setIsDoor(false);
  //       setCurr(4);
  //     }
  //   } catch (error) {
  //     console.error("Error sending data to ThingSpeak", error);
  //   }
  // };

  // const socket = new WebSocket(
  //   "wss://api.thingspeak.com:443/websockets/2321828?api_key=AEC66MXZL9TSPVVC"
  // ); // Thay thế URL WebSocket cho Thingspeak

  // socket.onopen = () => {
  //   console.log("Kết nối WebSocket đã được thiết lập.");
  // };

  // socket.onmessage = (event) => {
  //   const data = JSON.parse(event.data);
  //   console.log("Dữ liệu từ server:", data);
  //   if (data.field1 === "4") {
  //     setIsDoor(false);
  //   } else {
  //     setIsDoor(true);
  //   }
  // };

  // socket.onclose = (event) => {
  //   if (event.wasClean) {
  //     console.log("Kết nối đã đóng sạch.");
  //   } else {
  //     console.error("Kết nối bị đóng bởi lỗi:", event.reason);
  //   }
  // };

  // const sendData = (field1Value) => {
  //   const data = {
  //     field1: field1Value.toString(),
  //     api_key: "9MW9VYJ6HMMJYMLB",
  //   };

  //   socket.send(JSON.stringify(data));
  // };

  return (
    <View>
      <Image
        style={{ position: "absolute" }}
        source={require("../../assets/images/bg.png")}
      ></Image>
      <View style={{ position: "relative" }}>
        <View
          style={{
            display: "flex",
            justifyContent: "space-around",
            flexDirection: "row",
            justifyContent: "center",
            right: 0,
            marginHorizontal: 30,
          }}
        >
          <View
            style={{
              width: 130,
              height: 50,
              backgroundColor: "#fdab4a",
              flexDirection: "row",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 20,
              marginLeft: 50,
              marginRight: 50,
              marginTop: 30,
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate(SCREEN_NAME.HISTORY_SCREEN)}
            >
              <Text style={{ marginRight: 5 }}>Xem lịch sử</Text>
            </TouchableOpacity>
            <Image
              source={require("../../assets/images/icon-down.png")}
            ></Image>
          </View>
          <View
            style={{
              width: 130,
              height: 50,
              backgroundColor: "#fdab4a",
              flexDirection: "row",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 20,
              alignItems: "center",
              marginLeft: 50,
              marginRight: 50,
              marginTop: 30,
            }}
          >
            <Text style={{ marginRight: 5 }}>Nhà của bạn</Text>
            <Image
              source={require("../../assets/images/icon-down.png")}
            ></Image>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          {isDoor ? (
            <Image source={require("../../assets/images/dooropen.png")}></Image>
          ) : (
            <Image source={require("../../assets/images/11.png")}></Image>
          )}
          <View
            style={{
              width: 130,
              height: 30,
              backgroundColor: "#fdab4a",
              flexDirection: "row",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 20,
              alignItems: "center",
              marginLeft: 50,
              marginRight: 50,
            }}
          >
            <Text style={{ fontSize: 20 }}>
              {isDoor ? "CỬA ĐÓNG" : "CỬA MỞ"}
            </Text>
          </View>
        </View>
        <TouchableOpacity style={{ paddingTop: 150 }} onPress={handleSendData}>
          <View
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            {isDoor ? (
              <Image
                style={{ position: "absolute" }}
                source={require("../../assets/images/elip2.png")}
              ></Image>
            ) : (
              <View
                style={{
                  position: "absolute",
                  width: 150,
                  height: 150,
                  backgroundColor: "#fdab4a",
                  borderRadius: 100,
                }}
              ></View>
            )}
            <Image
              style={{ position: "absolute" }}
              source={require("../../assets/images/elip1.png")}
            ></Image>
            <Image
              style={{ position: "absolute" }}
              source={require("../../assets/images/elip3.png")}
            ></Image>
            <Image
              style={{ position: "absolute" }}
              source={require("../../assets/images/icons-btn.png")}
            ></Image>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
