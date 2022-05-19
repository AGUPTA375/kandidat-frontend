import { useEffect, useState } from "react"
import { View, Text } from "react-native"
import { fetchProduct } from "../data"
import ProductHeader from "../components/ProductHeader"
import ProductPage from "../components/ProductPage"

export default function Product(props) {

    const [product, setProduct] = useState(null)


    useEffect(() => {
        if (props.route.params.product != undefined) {
            fetchProduct(props.route.params.product.product_id, setProduct)
        }
    }, [])

    if (product === null) {
        return(
            <View>
                <Text>Loading</Text>
            </View>
        )
    } else {
        return(
            <View>
                <ProductHeader title={product.name} navigation={props.navigation}/>
                <ProductPage product={product} navigation={props.navigation} />
            </View>
        )
    }
}