# Spotify Statistics
Application that uses the Spotify web api to display user top music. The application has an additional node.js server providing jwt token support. After user successful authorization with Spotify, app get code witch can be send to node.js server to receive in exchange token and refresh token. Token is used to ask Spotify for data, refresh token is store on device using SecureStore.

## How to launch
### Spotify Dashboard
* To launch aplication you have to create your own Spotify Dashboard-https://developer.spotify.com/documentation/general/guides/authorization/app-settings/
* In settings `Redirect URIs` pass your exp lan connection, for me it is exp://192.168.1.11:19000/

### Api 
* Go to .env file in api folder and change it accordingly
>REDIRECT_URI=Redirect URIs from the previous  
>CLIENT_ID=Client ID from My Dashboard  
>CLIENT_SECRET=Client Secret from My Dashboard  
* `npm install`
* To run the server `npm run devStart`

### Mobile
* In screens LoginScreen change clientId and redirectUri just as before
* `npm install`
* To run the aplication `expo start`

<img src="https://user-images.githubusercontent.com/75206563/161387659-1d0a679d-f675-4dc8-9c02-be45afdcd647.png" width="350"> <img src="https://user-images.githubusercontent.com/75206563/161387854-25c67b9c-1b98-46d9-867d-ae0dfe239bb0.jpg" width="350">

