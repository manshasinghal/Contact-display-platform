import type { Request, Response } from "express";
import {
  contactIdParamSchema,
  createContactSchema,
  listContactsQuerySchema,
} from "./contact.schema.js";
import { ContactService } from "./contact.service.js";

export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  listContacts = async (req: Request, res: Response) => {
    const query = listContactsQuerySchema.parse(req.query);
    const response = await this.contactService.listContacts(query);
    return res.status(200).json(response);
  };

  createContact = async (req: Request, res: Response) => {
    const payload = createContactSchema.parse(req.body);
    const contact = await this.contactService.createContact(payload);
    return res.status(201).json(contact);
  };

  deleteContact = async (req: Request, res: Response) => {
    const { id } = contactIdParamSchema.parse(req.params);
    await this.contactService.deleteContact(id);
    return res.status(204).send();
  };
}
