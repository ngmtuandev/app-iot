import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_NAME } from "../constansts/screens";
export default function HistoryScreen() {
  const navigation = useNavigation();
  const fakeDataHistory = [
    {
      id: 1,
      dayOparator: new Date(),
      isOpen: true,
    },
    {
      id: 2,
      dayOparator: new Date(),
      isOpen: true,
    },
    {
      id: 3,
      dayOparator: new Date(),
      isOpen: true,
    },
    {
      id: 4,
      dayOparator: new Date(),
      isOpen: false,
    },
    {
      id: 5,
      dayOparator: new Date(),
      isOpen: true,
    },
  ];
  return (
    <View>
      <View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ marginTop: 30 }}>Quay lại</Text>
        </TouchableOpacity>
      </View>
      <View>
        {fakeDataHistory.map((item) => {
          // console.log(item.isOpen);
          return (
            <View key={item.id} style={{ marginTop: 10 }}>
              <View>
                <Text>Trạng thái :</Text>
                <Text>{item.isOpen ? "Mở" : "Đóng"}</Text>
              </View>
              <View>
                <Text>Ngày/giờ :</Text>
                <Text>Đang cập nhập</Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}
