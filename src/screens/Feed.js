import { View, Text, StyleSheet, TouchableOpacity, Dimensions, FlatList, ScrollView, RefreshControl } from "react-native"
import { useState, useCallback, useEffect } from "react";
import * as SplashScreen from 'expo-splash-screen';
import { fetchAllProducts } from "../data";

// Window dimensions
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Feed(props) {

    const wait = (timeout) => {
      return new Promise(resolve => setTimeout(resolve, timeout));
    }

    const [appIsReady, setAppIsReady] = useState(false);
    const [products, setProducts] = useState(null)
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
      setRefreshing(true);
      wait(2000).then(() => {
        fetchAllProducts(setProducts)
        setRefreshing(false)
      });
    }, []);

    useEffect(() => {
        async function prepare() {
          try {
            // Keep the splash screen visible while we fetch resources
            await SplashScreen.preventAutoHideAsync();
            // Artificially delay for two seconds to simulate a slow loading
            // experience. Please remove this if you copy and paste the code!
            fetchAllProducts(setProducts)
          } catch (e) {
            console.warn(e);
          } finally {
            // Tell the application to render
            setAppIsReady(true);
          }
        }
    
        prepare();
      }, []);

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
          // This tells the splash screen to hide immediately! If we call this after
          // `setAppIsReady`, then we may see a blank screen while the app is
          // loading its initial state and rendering its first pixels. So instead,
          // we hide the splash screen once we know the root view has already
          // performed layout.
          await SplashScreen.hideAsync();
        }
      }, [appIsReady]);
    
      if (!appIsReady) {
        return null;
      }

    return(
        <ScrollView onLayout={onLayoutRootView}
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
          
          <View style={styles.products} >
            <FlatList
            horizontal={true}
            data={products}
            keyExtractor={item => item.ProductID}
            renderItem={({ item }) => {
              return(
                <TouchableOpacity style={styles.product}
                onPress={() => props.navigation.navigate("Product", { product: item })}>
                  <View style={styles.productimage}>
                    <Text>PRODUCT IMAGE</Text>
                  </View>
                  <View style={styles.productinfo}>
                    <Text>{item.Name}</Text>
                    <Text>{item.Price} kr</Text>

                  </View>
                </TouchableOpacity>
              )
            }}>


            </FlatList>
          </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight*0.9,
    alignItems: "center",
  },
  product: {
    width: windowWidth*0.4,
    height:windowHeight*0.25,
    alignItems:"center"
  },
  products: {
    width: windowWidth*0.9,
    height: windowHeight*0.25,
    marginTop: "20%"
  },
  productimage: {
    width: windowWidth*0.35,
    height: windowHeight*0.15,
    backgroundColor:"blue",
    justifyContent:"center",
    alignItems:"center"
  },
  productinfo: {
    width: windowWidth*0.35,
    height: windowHeight*0.1,
    backgroundColor:"green"
  }
})