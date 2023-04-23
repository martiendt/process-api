export enum ExpeditionsStatusTypes {
  Active = "active",
  Suspended = "suspended",
}

export interface BankEntityInterface {
  name?: string;
  branch?: string;
  accountNumber?: string;
  accountName?: string;
}

export interface ExpeditionsEntityInterface {
  _id?: string;
  name?: string;
  code?: string;
  address?: string;
  phone?: string;
  email?: string;
  contactPerson?: string;
  bank?: BankEntityInterface;
  createdAt?: Date;
  updatedAt?: Date;
}

export class ExpeditionsEntity implements ExpeditionsEntityInterface {
  public _id?: string;
  public code?: string;
  public name?: string;
  public address?: string;
  public phone?: string;
  public email?: string;
  public contactPerson?: string;
  public bank?: BankEntityInterface;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(expeditions: ExpeditionsEntityInterface) {
    this._id = expeditions._id;
    this.code = expeditions.code;
    this.name = expeditions.name;
    this.address = expeditions.address;
    this.phone = expeditions.phone;
    this.email = expeditions.email;
    this.contactPerson = expeditions.contactPerson;
    this.bank = expeditions.bank;
    this.createdAt = expeditions.createdAt;
    this.updatedAt = expeditions.updatedAt;
  }
}
