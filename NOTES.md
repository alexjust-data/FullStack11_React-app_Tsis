

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

* Creo un contexto `auth/AuthContext`; este patrón contexto que permite que los componentes de una aplicación se comuniquen y compartan el estado de autenticación de manera eficiente y organizada, sin tener que propagar explícitamente las props a través de múltiples niveles de componentes.
  
* Creo componente `RequireAuth` ; Su propósito es proteger rutas específicas, asegurándose de que solo los usuarios autenticados puedan acceder a ellas. Si un usuario no autenticado intenta acceder a una de estas rutas protegidas, será redirigido a una página de inicio de sesión o registro.
  
* Creo objeto `utils/storage`  Los métodos proporcionados (get, set, remove y clear) facilitan la interacción con el almacenamiento local y permiten a la aplicación guardar y recuperar datos de forma sencilla en el navegador. 

* `auth/Adverts/service.getLatestAdverts` ; 



**persistir_Token**

* Creamos una carpeta `utils/storage.js` guadamos el token en el localStoreg para que nos olvidemos de él cuando lo tengamos.