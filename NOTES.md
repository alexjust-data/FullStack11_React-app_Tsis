

```sh
npx create-react-app tsis  
npm install axios  #Node.js para realizar solicitudes HTTP a la api
npm install styled-components #Node.js permite creación componentes estilizados
```
**CLIENTE PARA API** 


**`api/client`**  
Necesito conectar con el servidor, luego creo client.js y con axios creo la BaseURL con la Header. El servidor espera recibir un json.

`scr/api/client,js` --> https://github.com/davidjj76/nodepop-api

**COMPONENTE Button compartido**

Diseño un botón `componente/shared/Button.js` que se utilizará en varias páginas

**PRIMERAS PÁGINAS**

**`service.js`**   
Se realiza un servicio devolviendo los datos del cliente requiriendo un post al servidor `.post('/api/auth/signup', userData)` con los datos del usuario. Este requerimiento `signup(userData)` se exporta al componente  `Signup.js` y se lanzará desde ese componente recogiendo los datos que el usuario inserte.

**`Signup.js`**   
Diseño primera página para recojer datos del usuario y solicitar el requerimiento al servidor. 

* Si `Registro exitoso` se redirije al usuario a la página para hacer Login. 
* Para eso asegúrate de que tu aplicación esté envuelta en un `<BrowserRouter>` o `<Router>` en index.js : `npm install react-router-dom`.
* en tu enrutador `App.js`, deberás añadir el componente que maneja tus rutas, que podría ser el mismo : `<Route path="/signup" element={<Signup />} />` 

**`LoginPage.js`**   

`npm install react-router-dom`

* creo componente `LoginPage` solicitando al usuario email y passwort
* `client.setAuthorizationHeader` toma token y lo utiliza para establecer el encabezado 'Authorization' en Axios
* `service.login` realiza una petición POST a la ruta '/auth/login' con las credenciales proporcionadas y luego asegura que todas las solicitudes futuras estén autorizadas con el token de acceso obtenido.


**USUARIO LOGUEADO**

* Creo un contexto `AuthContext`
* Creo componente `RequireAuth` para usarlo donde requiera
* Creo objeto `utils/storege`  Los métodos proporcionados (get, set, remove y clear) facilitan la interacción con el almacenamiento local y permiten a la aplicación guardar y recuperar datos de forma sencilla en el navegador. 