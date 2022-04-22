import { useEffect, useState } from "react"
import { View, Text } from "react-native"
import { fetchProduct } from "../data"
import ProductHeader from "./ProductHeader"

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
            <ProductHeader title={product.Name} />
        )
    }
}