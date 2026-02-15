import { httpClient } from "./http";
import type {
  Contact,
  ContactListResponse,
  CreateContactPayload,
} from "../types/contact";

export const getContacts = async (params: {
  search: string;
  page: number;
  pageSize: number;
}) => {
  const { data } = await httpClient.get<ContactListResponse>("/contacts", { params });
  return data;
};

export const createContact = async (payload: CreateContactPayload) => {
  const { data } = await httpClient.post<Contact>("/contacts", payload);
  return data;
};

export const deleteContact = async (id: number) => {
  await httpClient.delete(`/contacts/${id}`);
};
