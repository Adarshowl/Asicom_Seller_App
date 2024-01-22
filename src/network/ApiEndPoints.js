// export const BASE_URL = 'https://masteradmin-zti3.onrender.com/api/';
// export const BASE_URL = 'https://asicom.store/asicombackend/api/';
// export const IMAGE_BASE_URL =
//   'https://asicom.store/asicombackend/uploads/images/';
export const BASE_URL = 'https://asicom.mr/asicombackend/api/'; // without ssl
export const IMAGE_BASE_URL = 'https://asicom.mr/asicombackend/uploads/images/'; // without ssl
export const API = 'app_seller/';
export const API_END_POINTS = {
  // https://masteradmin-zti3.onrender.com/api/seller_app_setting/list

  APP_COLOR_CHANGE: BASE_URL + 'seller_app_setting/list',
  CURRENCY_APP:
    'http://asicom.mr/asicombackend/api/currency/get-admin-currency',

  // Profile Section
  API_LOGIN: BASE_URL + API + 'sellerlogin',
  API_SINGUP: BASE_URL + API + 'seller_signup',
  // https://asicom.store/asicombackend/api/app_seller/sellerloginsendotp
  // https://asicom.store/asicombackend/api/app_seller/sellerloginwithotp
  API_LOGIN_SEND_OTTP: BASE_URL + API + 'sellerloginsendotp',
  LOGIN_WITH_OTTP: BASE_URL + API + 'sellerloginwithotp',

  // https://masteradmin-zti3.onrender.com/api/app_seller/changepassword
  CHANGE_PASSWORD_API: BASE_URL + API + 'changepassword',

  UPDATE_PROFILE: BASE_URL + API + 'update',
  GET_PROFILE: BASE_URL + API + 'getprofile',

  // https://masteradmin-zti3.onrender.com/api/app_seller/getprofile

  // Home Section
  DASHBOARD: BASE_URL + 'app_sellerhome/banner',
  DASHBOARD_COUNT: BASE_URL + 'app_dashboard/dashboard_count',

  // Product Section
  PRODUCT_LIST: BASE_URL + 'app_sellerproduct/list',
  // api/app_sellerproduct/best-selling-product
  TOP_PRODUCT_LIST: BASE_URL + 'app_sellerproduct/best-selling-product',

  ADD_PRODUCT_API: BASE_URL + 'app_sellerproduct/create',
  PRODUCT_DETAILS_API: BASE_URL + 'app_sellerproduct/show/', //product_id
  UPDATE_PRODUCT_API: BASE_URL + 'app_sellerproduct/update',

  // Brand section
  BRAND_LIST_API: BASE_URL + 'app_sellerproduct/brand_list',

  // Order
  ORDER_LIST: BASE_URL + 'app_sellerorder/list',
  ORDER_DETAILS: BASE_URL + 'app_sellerorder/show-with-product/',
  Order_Update_Status: BASE_URL + 'app_sellerorder/orderstatusupdate',
  // Order_Update_Status: BASE_URL + 'app_sellerorder/orderstatusupdate',

  // delivery
  getActiveDeliveryBoy: BASE_URL + 'app_sellerorder/activedeliveryboy',
  assignDeliveryBoyToOrder:
    'https://asicom.store/asicombackend/api/app_sellerorder/assign-order-to-delivery-boy',

  // Return Order
  // https://masteradmin-zti3.onrender.com/api/app_sellerorder/order_return_status_update
  RETURN_ORDER_LIST: BASE_URL + 'app_sellerorder/order_return_list',
  Return_Order_Update_Status:
    BASE_URL + 'app_sellerorder/order_return_status_update',

  // seller_category

  CATEGORY_LIST: BASE_URL + 'app_sellerproduct/seller_category',
  // https://masteradmin-zti3.onrender.com/api/app_sellerproduct/seller_active_subcategory
  SUB_CATEGORY_LIST: BASE_URL + 'app_sellerproduct/seller_active_subcategory',

  // Payment history
  // https://masteradmin-zti3.onrender.com/api/app_sellerpayment/list
  PAYMENT_LIST_API: BASE_URL + 'app_sellerpayment/list',
  PAYMENT_DEATILS_API: BASE_URL + 'app_sellerpayment/show/', //payment_id

  //Product Quries
  PRODUCT_QURIES_LIST: BASE_URL + 'app_seller_product_query/list',
  Quries_product_DETAILS: BASE_URL + 'app_seller_product_query/show/', //{query id}

  // https://masteradmin-zti3.onrender.com/api/app_seller_product_query/update
  CREATE_QURIES_PRODUCT: BASE_URL + 'app_seller_product_query/update',

  // withdowal section

  WITHDROWAL_LIST_API: BASE_URL + 'app_sellerwithdrawal/list',
  GET_BALANCE_WITHDROWAL: BASE_URL + 'app_sellerwithdrawal/getbalance',
  WITHDROWAL_DETAILS: BASE_URL + 'app_sellerwithdrawal/show/', //{withdrawal id}
  CREATE_WITHDROWAL: BASE_URL + 'app_sellerwithdrawal/create',

  // Shop
  // updateusershop
  // getmyshop

  SHOP_SETTING_LIST: BASE_URL + 'app_seller_shop/getmyshop',
  SHOP_SETTING_DETAILS: BASE_URL + 'app_seller_shop/show/', //{shop_id}
  // SHOP_SETTING_UPDATE: BASE_URL + 'app_seller_shop/update_shop',
  SHOP_SETTING_UPDATE: BASE_URL + 'app_seller_shop/updateusershop',

  // SOCIAL_MET_UPADTE_SHOP: BASE_URL + 'app_seller_shop/update_social_media',4
  SOCIAL_MET_UPADTE_SHOP: BASE_URL + 'app_seller_shop/updateusershop',

  // UPDATE_SHOP_BANNER: BASE_URL + 'app_seller_shop/update_banner',
  UPDATE_SHOP_BANNER: BASE_URL + 'app_seller_shop/updateusershop',

  // Bank

  BANK_PAYMENT_LIST: BASE_URL + 'app_seller_bank/list',
  // https://masteradmin-zti3.onrender.com/api/app_seller_bank/update
  CREATE_BANK_PAYMENT: BASE_URL + 'app_seller_bank/create',
  UPDATE_BANK_PAYMENT: BASE_URL + 'app_seller_bank/update',

  DETAILS_PAYMENT_LIST: BASE_URL + 'app_seller_bank/show/', //{id}
  REMOVE_PAYMENT_LIST: BASE_URL + 'app_seller_bank/remove/', //{id}

  // Refund
  REFUND_REQUEST_LIST: BASE_URL + 'app_seller_refund/list',
  Refund_Approve_List: BASE_URL + 'app_seller_refund/approvelist',
  // https://masteradmin-zti3.onrender.com/api/app_seller_refund/rejectlist
  Refund_Rejected_List: BASE_URL + 'app_seller_refund/rejectlist',
  Refund_Detail: BASE_URL + 'app_seller_refund/show/', //{list id}
  Refund_Update_Status:
    BASE_URL + 'app_seller_refund/order_refund_status_update',

  // Support Ticket

  SUPPORT_Ticket_List: BASE_URL + 'app_seller_ticket/list',
  SUPPORT_Ticket_Details: BASE_URL + 'app_seller_ticket/show/', //{list id}
  Create_SUPPORT_Ticket: BASE_URL + 'app_seller_ticket/create',
  Update_SUPPORT_Ticket: BASE_URL + 'app_seller_ticket/update',
  Remove_SUPPORT_Ticket: BASE_URL + 'app_seller_ticket/remove/', //{list id}

  SUPPORT_Ticket_CHAT_SYSYTEM: BASE_URL + 'app_seller_ticket/ticket-reply',

  // /api/app_seller_ticket/ticket-reply
  // Privacy Policy / Terms and Conditions

  PRIVACY_POLICY_API: BASE_URL + 'app_sellerprivacy/detail',
};

export const API_TYPE = {
  POST: 'post',
  GET: 'get',
};
