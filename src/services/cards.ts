import axios from "axios";

const baseUrl = "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards";


export const getCards = () => axios.get(baseUrl);
export const getCardById = (id: string) => axios.get(baseUrl + `/${id}`);

export const isFavoriteUrl = (id: string)  => {
    const url = `${baseUrl}/${id}`;
    return axios.patch(url, {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    });
  }

  export const getMyCards = ()  => {
    const url = `${baseUrl}/my-cards/`;
    return axios.get(url, {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    });
  }
  export const deleteCardById = (id: string)  => {
    const url = `${baseUrl}/${id}`;
    return axios.delete(url, {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    });
  }

 
