import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { firebase } from "../firebaseConfig";
import { ArrowLeftOnRectangleIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";

const Header = (props) => {
  const navigation = useNavigation();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (firebase.auth().currentUser) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <View className="items-center text-center flex-row justify-center mx-10">
      <Text className="text-white text-3xl font-bold flex-1">
        {props.title}
      </Text>
      {loggedIn ? (
        <TouchableOpacity
          onPress={() => {
            firebase
              .auth()
              .signOut()
              .then(() => {
                setLoggedIn(false);
                navigation.navigate("Login");
              });
          }}
        >
          <ArrowLeftOnRectangleIcon color="white" size={30} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default Header;
