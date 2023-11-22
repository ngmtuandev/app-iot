import {
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SCREEN_NAME } from "../constansts/screens";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
const Register = () => {
  const navigation = useNavigation();
  const [dataUser, setDataUser] = useState({
    name: "",
    pass: "",
    username: "",
  });

  const handleRegister = async () => {
    console.log(dataUser);
    const rs = await axios(
      "https://655d8fa49f1e1093c59979d0.mockapi.io/users",
      {
        method: "post",
        data: dataUser,
      }
    );
    if (rs.status === 200 || 201) {
      Alert.alert("Tạo tài khoản thành công", "Đăng Nhập Để Sử Dụng", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => navigation.navigate(SCREEN_NAME.LOGIN_SCREEN),
        },
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
          <View style={{ width: "70%", marginTop: -30 }}>
            <Text>Username</Text>
            <TextInput
              value={dataUser.username}
              onChangeText={(value) =>
                setDataUser({ ...dataUser, username: value })
              }
              style={{
                width: "100px",
                height: "25%",
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
                height: "25%",
                borderWidth: 2,
                paddingLeft: 10,
                borderRadius: 10,
                marginTop: 2,
              }}
              placeholder="user name"
            ></TextInput>
          </View>
          <View style={{ width: "70%", marginTop: -30 }}>
            <Text>Name</Text>
            <TextInput
              value={dataUser.name}
              onChangeText={(value) =>
                setDataUser({ ...dataUser, name: value })
              }
              style={{
                width: "200px",
                height: "25%",
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
          REGISTER !!!
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            gap: 30,
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
            <TouchableOpacity
              onPress={() => navigation.navigate(SCREEN_NAME.LOGIN_SCREEN)}
            >
              <Text style={{ color: "white", fontSize: 20 }}>Login</Text>
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
            <TouchableOpacity onPress={handleRegister}>
              <Text style={{ color: "white", fontSize: 20 }}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Register;
