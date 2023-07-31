import api from "./api"

const getAllMembers = async () => {
  return await api.get("/Clients");
};
const getAllAccounts = async () => {
  return await api.get("/Account");
};
const getServices = {
  getAllMembers,
  getAllAccounts,
};

export default getServices