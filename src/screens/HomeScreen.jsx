import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_NAME } from "../constansts/screens";
import "firebase/database";
import { db } from "../datafire";
import { ref, get, set } from "firebase/database";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [isDoor, setIsDoor] = useState(false);
  const [hand, setHand] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const databaseRef = ref(db, "-NignlUxDKWV_4CaTYM-");
        const snapshot = await get(databaseRef);
        console.log("snapshot data : ", snapshot);
        if (snapshot.exists()) {
          const data = snapshot.val();
          console.log("Fetched data:", data["hand"]);
          setHand(data.hand);
          setIsDoor(data.hand === 0); // Assuming 0 means door closed
        } else {
          console.log("Data doesn't exist.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      console.log("data firebase : ", isDoor);
    };

    const intervalId = setInterval(() => {
      fetchData();
    }, 500);

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);
  const toggleDoorState = async () => {
    try {
      const databaseRef = ref(db, "-NignlUxDKWV_4CaTYM-");
      // Đảm bảo rằng data tồn tại trước khi thực hiện set
      const snapshot = await get(databaseRef);
      if (snapshot.exists()) {
        const currentHand = snapshot.val().hand;
        const newHandState = currentHand === 0 ? 1 : 0; // Chuyển đổi trạng thái
        await set(databaseRef, { hand: newHandState });
        console.log("Data updated successfully!");
      } else {
        console.log("Data doesn't exist.");
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };
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
        <TouchableOpacity onPress={toggleDoorState} style={{ paddingTop: 150 }}>
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
