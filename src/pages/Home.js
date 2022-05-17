import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import axios from "axios";
import Carousel from "react-native-snap-carousel";

const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 4);
const SLIDER_WIDTH = Dimensions.get("window").width;

const Home = () => {
  const [data, setData] = useState();

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true&price_change_percentage=7d"
      )
      .then((res) => setData(res.data));
  }, []);

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 20,
          borderRadius: 10,
          backgroundColor: "white",
          elevation: 1,
        }}
      >
        <Text>{item.name}</Text>
        <Image
          style={{
            width: 100,
            height: 100,
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
          }}
          source={{ uri: item.image }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView>
      <View style={{ width: Dimensions.get("window").width * 1, alignItems: "center" }}>
        <Carousel
          layout={"default"}
          data={data}
          sliderWidth={600}
          itemWidth={300}
          renderItem={renderItem}
        />
      </View>
      <View style={{ height: "100%" }}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <View
              style={{
                padding: 10,
                backgroundColor: "gray",
                margin: 10,
                borderRadius: 10,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text>{item.name}</Text>
              <Text>{item.current_price}</Text>

              <Image source={{ uri: item.image }} style={{ height: 50, width: 50 }} />
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    marginTop: 50,
  },
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "dodgerblue",
  },
  itemLabel: {
    color: "white",
    fontSize: 24,
  },
  counter: {
    marginTop: 25,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Home;
