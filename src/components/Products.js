import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {add} from "../store/cartSlice";

const Products = () =>{
    const dispatch = useDispatch();
    const [products, setProducts] = useState([])
    console.log("products", products)

    useEffect(() =>{
        const fetchProducts = async () =>{
             await fetch('https://fakestoreapi.com/products').then(res =>{
                res.json().then(json=> setProducts(json))
            })
        }

        fetchProducts()
    }, [])

    const handleAdd = (product) => {
        dispatch(add(product))
    }

    return(
        <div className="productsWrapper">
            {products.map(product =>(
                <div className="card" key={product.id}>
                    <img src={product.image} alt=""/>
                    <h4>{product.title}</h4>
                    <h5>{product.price}</h5>

                    <button className="btn" onClick={() => handleAdd(product)}> Add to cart</button>
                </div>
            ))

            }
        </div>
    )
}

export default Products