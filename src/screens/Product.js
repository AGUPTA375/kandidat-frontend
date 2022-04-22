import { useEffect, useState } from "react"
import { View, Text } from "react-native"
import { fetchProduct } from "../data"
import ProductHeader from "../components/ProductHeader"
import ProductPage from "../components/ProductPage"

export default function Product() {

    const [product, setProduct] = useState(null)

    useEffect(() => {
        fetchProduct(1, setProduct)
    }, [])

    useEffect(() => {
        product === null ? {} : console.log(product)
    }, [product])

    if (product === null) {
        return(
            <View>
                <Text>Loading</Text>
            </View>
        )
    } else {
        return(
            <View>
                <ProductHeader title={product.Name} />
                <ProductPage product={product} />
            </View>
        )
    }
}