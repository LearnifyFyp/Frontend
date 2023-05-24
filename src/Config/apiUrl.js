// export const apiUrl = "http://localhost:4000";
// const apiUrl = "https://4171-110-38-247-71.ngrok-free.app";
export const apiUrl = "https://letslearnbackend.herokuapp.com";
export const BaseUrl = (url) => `${apiUrl}/api/${url}`;

export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
