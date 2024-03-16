import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
      pedido:{},
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

            const response = await fetch(`${BASE_URL}/api/crear-trabajador/`, {
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
            
           
      },
});


export default productSlice.reducer
