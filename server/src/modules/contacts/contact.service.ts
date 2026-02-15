import { HttpError } from "../../utils/http-error.js";
import type { CreateContactInput, ListContactsQuery } from "./contact.schema.js";
import { ContactRepository } from "./contact.repository.js";

export class ContactService {
  constructor(private readonly contactRepository: ContactRepository) {}

  listContacts(query: ListContactsQuery) {
    return this.contactRepository.list(query);
  }

  createContact(input: CreateContactInput) {
    return this.contactRepository.create(input);
  }

  async deleteContact(id: number) {
    const deleted = await this.contactRepository.deleteById(id);

    if (!deleted) {
      throw new HttpError(404, "Contact not found");
    }
  }
}
