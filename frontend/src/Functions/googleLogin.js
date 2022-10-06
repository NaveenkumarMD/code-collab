import { gapi } from "gapi-script";

//todo: implement handle succes and error for g-login
const responseGoogle = (response) => {
  console.log(response);
};

const initClient = async () => {
  await gapi.client.init({
    clientId: process.env.REACT_APP_CLIENT_ID,
    scope: "",
  });
};
gapi.load("client:auth2", initClient);

export { initClient, responseGoogle };
