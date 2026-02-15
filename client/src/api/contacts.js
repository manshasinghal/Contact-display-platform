import { httpClient } from "./http";
export const getContacts = async (params) => {
    const { data } = await httpClient.get("/contacts", { params });
    return data;
};
export const createContact = async (payload) => {
    const { data } = await httpClient.post("/contacts", payload);
    return data;
};
export const deleteContact = async (id) => {
    await httpClient.delete(`/contacts/${id}`);
};
