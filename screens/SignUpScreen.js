import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../modules/Header";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../firebaseConfig";

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  return (
    <View className="h-full w-full bg-[#222831] flex">
      <SafeAreaView>
        <Header title="Sign Up" />
      </SafeAreaView>

      <View className="flex-1 justify-center space-y-4">
        <Text className="text-2xl text-white font-bold text-center">
          E-Mail
        </Text>
        <TextInput
          className="bg-white mx-20 h-12 rounded-3xl mt-3 text-center"
          placeholder="E-Mail"
          inputMode="email"
          value={email}
          onChangeText={(value) => setEmail(value)}
        />

        <Text className="text-2xl text-white font-bold text-center">
          Password
        </Text>
        <TextInput
          className="bg-white mx-20 h-12 rounded-3xl mt-3 mb-4 text-center"
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={(value) => setPassword(value)}
        />

        <TouchableOpacity
          className="bg-[#00ADB5] w-44 h-14 rounded-3xl justify-center mx-auto"
          onPress={() => {
            firebase
              .auth()
              .createUserWithEmailAndPassword(email, password)
              .then(() => {
                console.log("Successfully registered.");
                navigation.navigate("Login");
              })
              .catch((e) => {
                console.log(e);
                setError(e);
              });
          }}
        >
          <Text className="text-white font-bold text-xl text-center">
            Sign Up
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-white w-44 h-14 rounded-3xl justify-center mx-auto"
          onPress={() => navigation.navigate("Login")}
        >
          <Text className="text-black font-bold text-sm text-center">
            Have an account? Login
          </Text>
        </TouchableOpacity>

        {error ? (
          <Text className="text-red-400 text-center text-2xl uppercase">
            {error.message}
          </Text>
        ) : null}
      </View>
    </View>
  );
};

export default SignUpScreen;
