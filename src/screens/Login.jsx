import {
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Alert,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SCREEN_NAME } from "../constansts/screens";
import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";
import { ref, get, set } from "firebase/database";
import { db } from "../datafire";

const Login = () => {
  const navigation = useNavigation();
  const [dataUser, setDataUser] = useState({
    pass: "",
    username: "",
  });
  const [passDoor, setPassDoor] = useState("");
  const [dataUsersList, setDataUsersList] = useState([]);
  const [showErr, setShowErr] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const HandleOpenDoorBTN = () => {
    setModalVisible(!isModalVisible);
  };
  useEffect(() => {
    (async () => {
      const users = await fetch(
        "https://655d8fa49f1e1093c59979d0.mockapi.io/users",
        {
          method: "get",
        }
      );
      const data = await users?.json();
      if (data) {
        setDataUsersList(data);
      }
    })();
  }, [dataUser]);

  const handleLogin = async () => {
    const findUser = dataUsersList?.filter(
      (item) => item?.username === dataUser.username
    );
    if (findUser) {
      console.log("có");
      if (findUser[0].pass === dataUser.pass) {
        navigation.navigate(SCREEN_NAME.HOME_SCREEN);
      } else {
        Alert.alert("CẢNH BÁO !!!", "Mật khẩu đăng nhập không đúng", [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      }
    } else {
      console.log("không");
    }
  };

  // const HandleOpenDoorBTN = () => {
  //   Alert.alert("CẢNH BÁO !!!", "Mật khẩu đăng nhập không đúng", [
  //     {
  //       text: "Cancel",
  //       onPress: () => console.log("Cancel Pressed"),
  //       style: "cancel",
  //     },
  //     { text: "OK", onPress: () => console.log("OK Pressed") },
  //   ]);
  // };

  const handleOpenDoor = async () => {
    if (+passDoor === 1111) {
      const databaseRef = ref(db, "-NignlUxDKWV_4CaTYM-");
      // Đảm bảo rằng data tồn tại trước khi thực hiện set
      const snapshot = await get(databaseRef);
      if (snapshot.exists()) {
        const currentHand = snapshot.val().hand;
        if (+currentHand === 4) {
          Alert.alert("CỬA ĐÃ MỞ SẴN", "", [
            {
              text: "HỦY",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
          ]);
        } else {
          await set(databaseRef, { hand: 4 });
          Alert.alert("CỬA MỞ THÀNH CÔNG", "", [
            {
              text: "OK",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
          ]);
        }
      }
    } else {
      Alert.alert("CẢNH BÁO !!!", "Mật khẩu để mở cửa SAIIII", [
        {
          text: "HỦY",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "NHẬP LẠI", onPress: () => console.log("OK Pressed") },
      ]);
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/images/bg2.jpg")}
      resizeMode="cover"
      style={{ flex: 1, width: "100%", height: "100%" }}
    >
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          //   alignItems: "center",
          alignContent: "center",
          marginLeft: 50,
          width: "100%",
        }}
      >
        {/* <Text style={{ marginTop: 30 }}>LOGIN</Text> */}
        <View
          style={{
            marginTop: 120,
            justifyContent: "center",
            alignContent: "center",
            display: "flex",
          }}
        >
          <Modal backdropOpacity={1} isVisible={isModalVisible}>
            <View style={{ flex: 1 }}>
              <TextInput
                value={passDoor}
                onChangeText={(value) => setPassDoor(value)}
                placeholder="Nhập mật mã để mở cửa"
                style={{
                  color: "black",
                  width: "300px",
                  height: "100px",
                  padding: 20,
                  borderWidth: 2,
                  marginTop: 70,
                  marginBottom: 30,
                  paddingLeft: 20,
                  fontSize: 24,
                  backgroundColor: "white",
                }}
              ></TextInput>
              {passDoor && (
                <View
                  style={{
                    width: 200,
                    height: 50,
                    marginBottom: 30,
                    backgroundColor: "red",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10,
                  }}
                >
                  <TouchableOpacity onPress={handleOpenDoor}>
                    <Text style={{ color: "white", fontWeight: "bold" }}>
                      MỞ CỬA
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              <Button title="HỦY" onPress={HandleOpenDoorBTN} />
            </View>
          </Modal>
          <View style={{ width: "70%", marginTop: -30 }}>
            <Text>Username</Text>
            <TextInput
              value={dataUser.username}
              onChangeText={(value) =>
                setDataUser({ ...dataUser, username: value })
              }
              style={{
                width: "100px",
                height: "35%",
                borderWidth: 2,
                paddingLeft: 10,
                borderRadius: 10,
                marginTop: 2,
              }}
              placeholder="user name"
            ></TextInput>
          </View>
          <View style={{ width: "70%", marginTop: -30 }}>
            <Text>Password</Text>
            <TextInput
              value={dataUser.pass}
              onChangeText={(value) =>
                setDataUser({ ...dataUser, pass: value })
              }
              style={{
                width: "200px",
                height: "35%",
                borderWidth: 2,
                paddingLeft: 10,
                borderRadius: 10,
                marginTop: 2,
              }}
              placeholder="user name"
            ></TextInput>
          </View>
        </View>
        <Text
          style={{
            fontSize: 20,
            color: "black",
            fontWeight: "bold",
            marginBottom: 10,
          }}
        >
          LOGIN !!!
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            gap: 30,
            marginTop: -70,
          }}
        >
          <View
            style={{
              width: "30%",
              height: "30px",
              padding: 20,
              backgroundColor: "red",
              borderRadius: 20,
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={handleLogin}>
              <Text style={{ color: "white", fontSize: 18 }}>Login</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: "30%",
              height: "30px",
              padding: 20,
              backgroundColor: "red",
              borderRadius: 20,
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate(SCREEN_NAME.REGISTER_SCREEN)}
            >
              <Text style={{ color: "white", fontSize: 18 }}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View
        style={{
          width: "80%",
          height: "30px",
          padding: 20,
          backgroundColor: "black",
          borderRadius: 20,
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          marginLeft: 30,
          marginBottom: 20,
        }}
      >
        <TouchableOpacity onPress={HandleOpenDoorBTN}>
          <Text style={{ color: "white", fontSize: 20 }}>MỞ KHÓA BẰNG MÃ</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Login;
