import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./features/user/userSlice";


export const reduxStore = configureStore({
  reducer: {
    user: userSlice.reducer
  }
});

// En el reducer user va el Slice de User. UserSlice.





// En features van a estar lo que serian las actions.
// Va a haber una carpeta para cada reducer digamos, y cada carpeta tiene 2 archivos, un Service y un Slice.
// Se crean esos 2 para buenas practicas, para crear capas de seguridad, podrias poner todo el slice pero es mejor
// usar un service y un slice


// Esto es la parte como mas dificil cuando empezas, que es entender el flujo, el uso es el  mismo que Redux normal.


