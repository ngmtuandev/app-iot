import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { TouchableWithoutFeedback } from "react-native-web";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_NAME } from "../constansts/screens";
export default function HomeScreen() {
  const navigation = useNavigation();
  const [isDoor, setIsDoor] = useState(false);
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
        <TouchableOpacity
          style={{ paddingTop: 150 }}
          onPress={() => setIsDoor(!isDoor)}
        >
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
