import Config from 'react-native-config';
import Get from './Get';
import Post from './Post';
// import Put from './Put';
// import Delete from './Delete';
// GET
const products = () => Get(Config.REACT_APP_API_LIST_PRODUCT_MEMBER, false, null);
const point = (id, token) => Get(Config.REACT_APP_API_POINT + id, false, token);
const productDetail = (id) => Get(Config.REACT_APP_API_PRODUCT+id, false,null);
const accountCash = (token) => Get(Config.REACT_APP_API_ACCOUNT_CASHS, false, token) ;
const agents = () => Get(Config.REACT_APP_API_AGENTS, false, null);
const members = (token) => Get(Config.REACT_APP_API_MEMBER, false, token);
const agentShow = (id, token) => Get(Config.REACT_APP_API_AGENT_SHOW + id, false,token)
const paketMembers = (token) => Get(Config.REACT_APP_API_PACKAGES_MEMBER, false, token);
const historypoint = (id, token) => Get(Config.REACT_APP_API_HISTORY_POINT + id, false, token);
const historyorder = (id, token) => Get(Config.REACT_APP_API_HISTORY_ORDER + id, false, token);
const historyordercancel = (id, token) => Get(Config.REACT_APP_API_ORDER_CANCEL + id, false, token);
const historyorderupdate = (id, token) => Get(Config.REACT_APP_API_DELIVERY_MEMBER_UPDATE + id , false, token);
const downline = (id, token) => Get(Config.REACT_APP_API_DOWNLINE + id, false, token);
const test =() => Get('http://usadhabhakti.com/api/close/products-member/', true, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiNGFlMjU2MzA5MzE5Nzc0MTQ0YTAwZDc5OGE3ZWE3YzMxYzlkYjYwMjgwMzA0ZTEwYzBiMzdlMDM2NWM3ZmJjZDdlZjU2NTM4ZjgzYzdkZjciLCJpYXQiOjE2MTk0MjE5NTgsIm5iZiI6MTYxOTQyMTk1OCwiZXhwIjoxNjUwOTU3OTU4LCJzdWIiOiIxODciLCJzY29wZXMiOltdfQ.DS6FZWURCjdmpdb_0xBUsgSc6sTB154faRJFqCWr-d-1lmZmPmjTunlthfW9ydfbVovKKZ327fK9a21Uv0Ta4TWc4P5qiaPg-_ktvs65REugYEEsYFbjhrbTqeSSq2SZzGsdv4UbbhY00vy1Z6wJdYAHoHzxEqvnxU7tE1uKkM0he53t1oV_8PEggOgkIi5rNvDLZybWss9O1MVjDf2BblV18wCBvMJKSP-weqTRPLvcWK1MLDcqgb8CNViaOwaQtdfAt9yBUZQ3W3sc4186KzERmEiVYDdraqUMmeOS-wzSero7EEBFlxdUH85NJ4_aGc7jkNu-9F4E4kOJauSbE-J2AW0DDB_G-7UncLfjXew8c_T4w5mcRqrAAWPe8L9l_7oEknCB1RgxHWEb9Cc00racKH659tuHMRv0E0xcZ7-bDyW7MuTEIa9EcBYs0t-TgK3V7xQ8scJKldmSjqt6hBFQs_X-TSAE9nswBCC8Kw4dOuUEY6Cm7XSUBc4eBmak7ku_tX61FrN7PC-wg1lR_S0Vd3ydCkSMvNeVKdFu_zCMjzMo8Q2nasSwAx8l7-NQ31TQF6uxkKy_eStDV8-F11pwj4pUdjIZ3puHwAcs0pcy_OwHBN3EF6vo-kQ0tRhMr1NQZDPYg6fM9USBL82Tj9EyfOnGLk2PQgmb6rckl74');
const logout = (token) => Get(Config.REACT_APP_API_LOGOUT, false, token) ;
const logupdate = (id, token) => Get(Config.REACT_APP_API_LOGS_UPDATE + id, false, token);
const historyordermasuk = (id, token) => Get(Config.REACT_APP_API_HISTORY_ORDER_AGENT + id, false, token);
const orderCancel = (id, token) => Get(Config.REACT_APP_API_ORDER_CANCEL + id, false, token);
const orderProcess = (id, token) => Get(Config.REACT_APP_API_ORDER_AGENT_PROCESS + id, false, token);
const orderSend = (id, token) => Get(Config.REACT_APP_API_DELIVERY_AGENT_UPDATE+ id, false, token);
//POST
const register = (data) => Post(Config.REACT_APP_API_REGISTER, false, data);
const login = (data) => Post(Config.REACT_APP_API_LOGIN, false, data);
const topup = (data, token) => Post(Config.REACT_APP_API_TOPUP, false, data, token);
const order = (data, token) => Post(Config.REACT_APP_API_ORDER, false, data,token);
const transfer = (data, token) => Post(Config.REACT_APP_API_TRANSFER, false, data,token);
const withdraw = (data, token) => Post(Config.REACT_APP_API_WITHDRAW, false, data, token);
const updateProfile = (data, token) => Post(Config.REACT_APP_API_UPDATE_PROFILE, false, data,token);
const activasi = (data, token) => Post(Config.REACT_APP_API_ACTIVE, false, data, token);
const registerdownline = (data , token) => Post(Config.REACT_APP_API_REGISTER_DOWNLINE, false,data,token);
const reset = (data) => Post(Config.REACT_APP_API_RESET , false, data);
const block = (data) => Post(Config.REACT_APP_API_USER_BLOCK, false, data);
const logNotif = (data, token) => Post(Config.REACT_APP_API_LOGS, false, data, token);
const countunread = (data, token) => Post(Config.REACT_APP_API_UNREAD_LOGS, false, data, token) 
const activasiAgent = (data, token) => Post(Config.REACT_APP_API_ACTIVE_AGENT, false, data, token) 
const orderAgent = (data, token) => Post(Config.REACT_APP_API_ORDER_AGENT, false, data, token) 
// PUT

const API = {
      register,
      login,
      products,
      point,
      productDetail,
      accountCash,
      topup,
      agents,
      members,
      order,
      agentShow,
      transfer,
      withdraw,
      updateProfile,
      paketMembers,
      activasi,
      historypoint,
      historyorder,
      historyordercancel,
      historyorderupdate,
      registerdownline, 
      downline,
      test,
      reset,
      block,
      logNotif,
      logout,
      logupdate,
      countunread,
      activasiAgent,
      historyordermasuk,
      orderCancel,
      orderProcess,
      orderSend,
      orderAgent
}

export default API;