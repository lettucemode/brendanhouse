export interface SquareResponse {
  errors: Error[];
  payment: SquarePayment;
}

export interface SquarePayment {
  id: string;
  createdAt: string;
  updatedAt: string;
  amountMoney: Money;
  tipMoney: Money;
  totalMoney: Money;
  appFeeMoney: Money;
  approvedMoney: Money;
  processingFee: ProcessingFee[];
  refundedMoney: Money;
  status: string;
  delayDuration: string;
  delayAction: string;
  delayedUntil: string;
  sourceType: string;
  cardDetails: CardPaymentDetails;
  locationId: string;
  orderId: string;
  referenceId: string;
  customerId: string;
  employeeId: string;
  refundsIds: string[];
  riskEvaluation: RiskEvaluation;
  buyerEmailAddress: string;
  billingAddress: Address;
  note: string;
  statementDescriptionIdentifier: string;
  capabilities: string[];
  receiptNumber: string;
  receiptUrl: string;
  versionToken: string;
}

export interface Money {
  amount: number;
  currency: string;
}

export interface ProcessingFee {
  amountMoney: Money;
  effectiveAt: string;
  type: string;
}

export interface CardPaymentDetails {
  applicationCryptogram: string;
  applicationIdentifier: string;
  applicationName: string;
  authResultCode: string;
  avsStatus: string;
  card: Card;
  cardPaymentTimeline: CardPaymentTimeline;
  cvvStatus: string;
  deviceDetails: DeviceDetails;
  entryMethod: string;
  errors: Error[];
  refundRequiresCardPresence: boolean;
  statementDescription: string;
  status: string;
  verificationMethod: string;
  verificationResults: string;
}

export interface Card {
  id: string;
  billingAddress: Address;
  bin: string;
  cardBrand: string;
  cardType: string;
  cardholderName: string;
  customerId: string;
  enabled: boolean;
  expMonth: number;
  expYear: number;
  fingerprint: string;
  last4: string;
  prepaidType: string;
  referenceId: string;
  version: number;
}

export interface CardPaymentTimeline {
  authorizedAt: string;
  capturedAt: string;
  voidedAt: string;
}

export interface DeviceDetails {
  deviceId: string;
  deviceInstallationId: string;
  deviceName: string;
}

export interface Error {
  category: string;
  code: string;
  detail: string;
  field: string;
}

export interface RiskEvaluation {
  createdAt: string;
  riskLevel: string;
}

export interface Address {
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  administrativeDistrictLevel1: string;
  administrativeDistrictLevel2: string;
  administrativeDistrictLevel3: string;
  country: string;
  firstName: string;
  lastName: string;
  locality: string;
  organization: string;
  postalCode: string;
  sublocality: string;
  sublocality2: string;
  sublocality3: string;
}
