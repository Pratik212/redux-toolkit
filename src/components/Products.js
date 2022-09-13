import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {add} from "../store/cartSlice";
import {fetchProducts, STATUS} from "../store/productSlice";

const Products = () =>{
    const dispatch = useDispatch();
    const {data: products, status} = useSelector((state) => state.product)
    console.log("products", products)

    useEffect(() =>{
        dispatch(fetchProducts())
    }, [dispatch])

    const handleAdd = (product) => {
        dispatch(add(product))
    }

    if (status === STATUS.LOADING){
         return  <h3>Loading...</h3>
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