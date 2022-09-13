const {createSlice} = require("@reduxjs/toolkit");

export const STATUS = Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading'
})

const productSlice = createSlice({
    name: 'product',
    initialState: {
        data: [],
        status: STATUS.IDLE
    },
    reducers:{
        setProduct(state, action){
            state.data = action.payload;
        },
        setStatus(state, action){
            state.status = action.payload;
        },
        // remove(state, action){
        //     return  state.filter(item => item.id !== action.payload)
        // }
    }
})

export const {setProduct, setStatus} = productSlice.actions;


export default productSlice.reducer;

export function fetchProducts(){
    return async function fetchProductThunk(dispatch, getState){
        dispatch(setStatus(STATUS.LOADING))
        try {
            const res = await fetch('https://fakestoreapi.com/products');
            const data = await res.json();
            dispatch(setProduct(data))
            dispatch(setStatus(STATUS.IDLE))
        }catch (err){
            console.log(err)
            dispatch(setStatus(STATUS.ERROR))
        }
    }
}