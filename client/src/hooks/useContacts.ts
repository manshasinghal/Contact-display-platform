import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createContact, deleteContact, getContacts } from "../api/contacts";
import type { CreateContactPayload } from "../types/contact";

interface ContactQueryParams {
  search: string;
  page: number;
  pageSize: number;
}

const contactsQueryKey = (params: ContactQueryParams) => ["contacts", params] as const;

export const useContactsQuery = (params: ContactQueryParams) => {
  return useQuery({
    queryKey: contactsQueryKey(params),
    queryFn: () => getContacts(params),
    placeholderData: (previousData) => previousData,
  });
};

export const useCreateContactMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateContactPayload) => createContact(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });
};

export const useDeleteContactMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteContact(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });
};
