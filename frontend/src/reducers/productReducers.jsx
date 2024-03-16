import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const IP = '127.0.0.1' //'192.168.18.8' 
export const BASE_URL = `http://${IP}:8000`  //'http://192.168.18.8:8000' //'http://127.0.0.1:8000' //'http://10.80.8.172:8000' 

const initialState = {
      pedido:{},
      url:'',
      loading:false,
      error:null,
}




export const crearPedido = createAsyncThunk("product/crearPedido", async ({ latitude, longitude, disponible, alimentos  }) => {
      try {
            const formData = new FormData();
            formData.append("latitude", latitude);
            formData.append("longitude", longitude);
            formData.append("disponible", disponible);
            formData.append("alimentos", alimentos);

            const response = await fetch(`${BASE_URL}/api/crear-pedido/`, {
                  method: "POST",
                  body: formData
            })        

            if (!response.ok) {throw new Error("Error al subir datos")}   
            const data = await response.json()
            return data
      } catch (error) {
            throw error;
      }
});



export const getRuta = createAsyncThunk("product/getRuta", async () => {
      try {
        

            const response = await fetch(`${BASE_URL}/api/ruta/`, {
                  method: "GET",
            })        

            if (!response.ok) {throw new Error("Error al obtener ruta")}   
            const data = await response.json()
            return data
      } catch (error) {
            throw error;
      }
});



export const productSlice = createSlice({
      name: "product",
      initialState,
      reducers: {},
      extraReducers: (builder) => {
            builder
            //CREAR PEDIDO
            .addCase(crearPedido.pending, (state, action) => {
                  return { ...state,  loading:true }
            })
            .addCase(crearPedido.fulfilled, (state, action) => {
                  return { ...state, pedido:action.payload, loading:false }
            })
            .addCase(crearPedido.rejected, (state, action) => {
                  return { ...state,  loading:false }
            })
            //GET RUTA
            .addCase(getRuta.pending, (state, action) => {
                  return { ...state,  loading:true }
            })
            .addCase(getRuta.fulfilled, (state, action) => {
                  return { ...state, url:action.payload, loading:false }
            })
            .addCase(getRuta.rejected, (state, action) => {
                  return { ...state,  loading:false }
            })
            
           
      },
});


export default productSlice.reducer
