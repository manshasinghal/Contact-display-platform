import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createContact, deleteContact, getContacts } from "../api/contacts";
const contactsQueryKey = (params) => ["contacts", params];
export const useContactsQuery = (params) => {
    return useQuery({
        queryKey: contactsQueryKey(params),
        queryFn: () => getContacts(params),
        placeholderData: (previousData) => previousData,
    });
};
export const useCreateContactMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload) => createContact(payload),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["contacts"] });
        },
    });
};
export const useDeleteContactMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => deleteContact(id),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["contacts"] });
        },
    });
};
