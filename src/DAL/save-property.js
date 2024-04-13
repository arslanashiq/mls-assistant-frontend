import { invokeApi } from "./invokeApi";
import { invokeApiPHP } from "./invokeApi-php";

export const get_customer_property = async () => {
  const reqObj = {
    path: `api/customer/get_customer_property`,
    method: "GET",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(reqObj);
};

export const add_customer_property = async (data) => {
  const reqObj = {
    path: `api/customer/add_customer_property`,
    method: "POST",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
    postData: data,
  };
  return invokeApi(reqObj);
};
export const delete_customer_property = async (id) => {
  const reqObj = {
    path: `api/customer/delete_customer_property/${id}`,
    method: "DELETE",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(reqObj);
};
export const share_property_via_email = async (body) => {
  const reqObj = {
    path: 'shareProperty.php', // Remove URL parameters
    method: 'POST', // Change the method to POST
    headers: {
      'Content-Type': 'application/json',
      'x-sh-auth': localStorage.getItem('token'),
    },
    postData: body,
  };

  return invokeApiPHP(reqObj);
};




