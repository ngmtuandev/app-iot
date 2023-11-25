import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Voice from "@react-native-voice/voice";
import * as Permissions from "expo-permissions";
import Voice2 from "@react-native-community/voice";
const OpenVoice = () => {
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [isRecord, setIsRecord] = useState(false);

  const [listen, setListen] = useState(false);
  const [text, setText] = useState("");

  Voice.onSpeechStart = () => setIsRecord(true);
  Voice.onSpeechEnd = () => setIsRecord(false);
  Voice.onSpeechError = (err) => setError(err.error);
  Voice.onSpeechResults = (result) => setResult(result.value[0]);
  const requestAudioPermission = async () => {
    Voice2.initialize();
    const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    Voice2.onSpeechStart = () => setIsRecord(true);
    Voice2.onSpeechEnd = () => setIsRecord(false);
    Voice2.onSpeechError = (err) => setError(err.error);
    Voice2.onSpeechResults = (result) => setResult(result.value[0]);
    console.log("Audio Permission Status:", status);
    if (status !== "granted") {
      setError("Permission to access audio recording was denied");
    }
  };

  useEffect(() => {
    requestAudioPermission();
  }, []);

  const startRecording = async () => {
    try {
      if (Voice) {
        console.log("start", Voice.start);
        const rs = await Voice.start("en-US");
        console.log(rs);
      }
    } catch (er) {
      console.log("err log : ", er);
      setError(er);
    }
  };

  const stopRecording = async () => {
    try {
      if (Voice) {
        await Voice.stop();
      }
    } catch (er) {
      setError(er);
    }
  };

  const startVoice2 = async () => {
    try {
      if (Voice2 && Voice2.start) {
        console.log("start", Voice2.start);
        const rs = await Voice2.start("en-US");
        console.log(rs);
      }
    } catch (er) {
      console.log("err log : ", er);
      setError(er);
    }
  };

  const stopVoice2 = async () => {
    try {
      await Voice2.stop();
      setListen(false);
    } catch (error) {
      console.log(error);
    }
  };

  Voice2.onSpeechResults = (e) => {
    const { value } = e;
    console.log(value);
    if (value) {
      setText(value[0]);
    }
  };

  return (
    <View style={{ marginTop: 40 }}>
      <Text>OpenVoice</Text>
      <View>
        <Text>RESULT</Text>
        <Text style={{ color: "red", fontWeight: "bold" }}>{result}</Text>
        {error instanceof Error && (
          <Text style={{ color: "yellow", fontWeight: "bold" }}>
            {error.message}
          </Text>
        )}
      </View>
      <View>
        <TouchableOpacity onPress={listen ? stopVoice2 : startVoice2}>
          <Text style={{ color: "blue", fontWeight: "bold", fontSize: 20 }}>
            {isRecord ? "Stop Record" : "Open Record"}
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={{ fontWeight: "bold" }}>{text}</Text>
    </View>
  );
};

export default OpenVoice;
