//This constants would be created bases on the Order deatils
export const ORDER_CREATE_REQUEST = "ORDER_CREATE_REQUEST";
//first constant is to use for the request reducer when the order is created
export const ORDER_CREATE_SUCCESS = "ORDER_CREATE_SUCCESS";
//Second constant is used when an order is successfully created
export const ORDER_CREATE_FAIL = "ORDER_CREATE_FAIL";
//The third constant of the create , is the fail , which is shown when a order cannot be created

export const ORDER_DETAILS_REQUEST = "ORDER_DETAILS_REQUEST";
// The first details constant , should be the request constant , which is used to fetch the order details
export const ORDER_DETAILS_SUCCESS = "ORDER_DETAILS_SUCCESS";
// The second details constant , should be the success constant , which is used if the order deatils are successfully fetched
export const ORDER_DETAILS_FAIL = "ORDER_DETAILS_FAIL";
// The Third details constant , should be the fail constant , which is used if the order is failed to be fetched 

export const ORDER_PAY_REQUEST = "ORDER_PAY_REQUEST";
//The first pay details of the order constant, is the request constant , which is used to request the payment details of the order
export const ORDER_PAY_SUCCESS = "ORDER_PAY_SUCCESS";
//The second pay details of the order constant, is the success constant , which is used if the payment deatils are successfully fetched
export const ORDER_PAY_FAIL = "ORDER_PAY_FAIL";
//The third pay details of the order constant, is the fail constant , which is used if the payment deatils are failed to be fecthed 
export const ORDER_PAY_RESET = "ORDER_PAY_RESET";
//The fourth pay details of the order constant, is the request constant , which is used to request the payment details of the order

export const ORDER_LIST_MY_REQUEST = "ORDER_LIST_MY_REQUEST";
//The First order list of a specific user is the request constant , which is used to request the order details for that specific user
export const ORDER_LIST_MY_SUCCESS = "ORDER_LIST_MY_SUCCESS";
//The second order list of a specific user is the success constant , which is used to if the order details for that specific user is successfully bought in 
export const ORDER_LIST_MY_FAIL = "ORDER_LIST_MY_FAIL";
//The third order list of a specific user is the fail constant , which is used when the order details for that specific user is failed to be bought in 
export const ORDER_LIST_MY_RESET = "ORDER_LIST_MY_RESET";
//The First order list of a specific user is the reset constant , which is used to reset the order details for that specific user


export const ORDER_LIST_REQUEST = "ORDER_LIST_REQUEST";
//The first list constant for the order constant is the request , which should request the order list details , this should be only for the admin 
export const ORDER_LIST_SUCCESS = "ORDER_LIST_SUCCESS";
//The second list constant for the order constant is the success , which should be successful when the order list details 
export const ORDER_LIST_FAIL = "ORDER_LIST_FAIL";
//The first list constant for the order constant is the fail , which is used when the order list details are failed 

export const ORDER_DELIVER_REQUEST = "ORDER_DELIVER_REQUEST";
//The first deliver constant is the request constant , the request constant  requests the delivery details of the order
export const ORDER_DELIVER_SUCCESS = "ORDER_DELIVER_SUCCESS";
//The second deliver constant is the success constant , which would be successful when the the delivery details of the order are bought in 
export const ORDER_DELIVER_FAIL = "ORDER_DELIVER_FAIL";
//The fourth deliver constant is the fail constant , the fail constant is hit when the order details are failed to be bought in 
export const ORDER_DELIVER_RESET = "ORDER_DELIVER_RESET";
//The fourth deliver constant is the reset constant , the rest constant  resets the delivery details of the order
