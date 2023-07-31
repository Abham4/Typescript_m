export interface client {
  account?: account;
  activation_Date: String;
  activeLoans: number;
  activeSavings: number;
  address: String;
  dob: String;
  createdDate: Date;
  gender: String;
  id: number;
  isStaff: Boolean;
  lastLoanAmount: number;
  lastModifiedDate: Date;
  firstName: String;
  middleName: String;
  lastName: String;
  noOfLoans: number;
  status: String;
  clientId: number;
  addresses?: address;
  branch: branch;
  branchId: number;
  phoneNumber: String;
  families: family;
  passBookNumber: number;
  identifiers: Identity;
  paymentSchedules: Schedule;
  profileImg: string;
}

export interface account {
  accountNo: number;
  activation_Date: Date;
  address: String;
  age: number;
  createdDate: Date;
  gender: String;
  id: number;
  isStaff: Boolean;
  lastLoanAmount: number;
  lastModifiedDate: Date;
  name: String;
  noOfLoans: number;
  status: Boolean;
  originalLoan: number;
  loanBalance: number;
  amountPaid: number;
  accountType: String;
  passBookNumber: number;
  purchasedProducts: purchasedproduct;
}

export interface accounts {
  id: number;
  accountType: String;
  glCode: number;
  accountUsage: String;
  parent: String;
  accountName: String;
  tag: String;
  manualEntriesAllowed: Boolean;
  description: String;
}

export interface address {
  addressType: String;
  addressLine1: String;
  addressLine2: String;
  addressLine3: String;
  phoneNumber: String;
  city: String;
  stateProvince: String;
  country: String;
  clientId: number;
}

export interface family {
  firstName: string;
  middleName: string;
  lastName: string;
  qualification: string;
  phoneNumber: string;
  age: number;
  isDepandant: boolean;
  relationShip: string;
  gender: string;
  profession: string;
  maritalStatus: string;
  dob: string;
  clientId: number;
}

export interface product {
  id: number;
  name: string;
  shortName: string;
  expiryDate: string;
  status: string;
  productType: string;
  accountId: string;
  originalLoan: number;
  amountPaid: number;
  loanBalance: number;
}
export interface purchasedproduct {
  id: number;
  expiryDate: string;
  status: string;
  productType: string;
  accountId: number;
  products: product;
  originalLoan: number;
  loanBalance: number;
  amountPaid: number;
  account: accounts;
  rate: number;
  paymentSchedules:Schedule;
  createdDate:string;
  branchId:number;
}
export interface Identity {
  documentType: string;
  status: string;
  description: string;
  clientId: number;
}
export interface Document {
  id: number;
  fileName: string;
  description: string;
  objectType: number;
  reference: number;
  documentType: string;
  file: File;
}

export interface Voucher {
  id: number;
  code: string;
  timeStamp: Date;
  voucherType: string;
  clientId: number;
  reason: string;
  lastOpration: string;
  amount: number;
  purchasedProductId: number;
  createdDate: string;
  reference:number
}

export interface Schedule {
  id: number;
  payingDate: string;
  paidDate: string;
  pricipalDue: number;
  loanBalance: number;
  interest: number;
  penality: number;
  paid: number;
  due: number;
  clientId: number;
}

export interface branch {
  id: number;
  name: string;
  address: string;
  createdDate:string;
  voucher?: Voucher;
}

export interface token {
  FirstName: string;
  LastName: string;
  BranchId?:string;
  PicURL?:string;
}