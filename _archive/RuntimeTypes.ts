// ---------------- Type Definitions which can be imported from ./RuntimeTypes -------------------------
export interface TableRegistrations extends BaseTableRegistrations {
    "account": account,
}
export interface EnumRegistrations extends BaseEnumRegistrations {
    "account-accountcategorycode": account_accountcategorycode,
    "account-accountclassificationcode": account_accountclassificationcode,
    "account-accountratingcode": account_accountratingcode,
    "account-address1_addresstypecode": account_address1_addresstypecode,
    "account-address1_freighttermscode": account_address1_freighttermscode,
    "account-address1_shippingmethodcode": account_address1_shippingmethodcode,
    "account-address2_addresstypecode": account_address2_addresstypecode,
    "account-address2_freighttermscode": account_address2_freighttermscode,
    "account-address2_shippingmethodcode": account_address2_shippingmethodcode,
    "account-businesstypecode": account_businesstypecode,
    "account-creditonhold": account_creditonhold,
    "account-customersizecode": account_customersizecode,
    "account-customertypecode": account_customertypecode,
    "account-donotbulkemail": account_donotbulkemail,
    "account-donotbulkpostalmail": account_donotbulkpostalmail,
    "account-donotemail": account_donotemail,
    "account-donotfax": account_donotfax,
    "account-donotphone": account_donotphone,
    "account-donotpostalmail": account_donotpostalmail,
    "account-donotsendmm": account_donotsendmm,
    "account-followemail": account_followemail,
    "account-industrycode": account_industrycode,
    "account-isprivate": account_isprivate,
    "account-marketingonly": account_marketingonly,
    "account-merged": account_merged,
    "account-ownershipcode": account_ownershipcode,
    "account-participatesinworkflow": account_participatesinworkflow,
    "account-paymenttermscode": account_paymenttermscode,
    "account-preferredappointmentdaycode": account_preferredappointmentdaycode,
    "account-preferredappointmenttimecode": account_preferredappointmenttimecode,
    "account-preferredcontactmethodcode": account_preferredcontactmethodcode,
    "account-shippingmethodcode": account_shippingmethodcode,
    "account-statecode": account_statecode,
    "account-statuscode": account_statuscode,
    "account-territorycode": account_territorycode,
}
export type account = TableRow<{
    // Primary Key Column
    readonly accountid: string,
    accountcategorycode: account_accountcategorycode,
    accountclassificationcode: account_accountclassificationcode,
    accountnumber: string,
    accountratingcode: account_accountratingcode,
    address1_addressid: string,
    address1_addresstypecode: account_address1_addresstypecode,
    address1_city: string,
    readonly address1_composite: string,
    address1_country: string,
    address1_county: string,
    address1_fax: string,
    address1_freighttermscode: account_address1_freighttermscode,
    address1_latitude: number,
    address1_line1: string,
    address1_line2: string,
    address1_line3: string,
    address1_longitude: number,
    address1_name: string,
    address1_postalcode: string,
    address1_postofficebox: string,
    address1_primarycontactname: string,
    address1_shippingmethodcode: account_address1_shippingmethodcode,
    address1_stateorprovince: string,
    address1_telephone1: string,
    address1_telephone2: string,
    address1_telephone3: string,
    address1_upszone: string,
    address1_utcoffset: number,
    address2_addressid: string,
    address2_addresstypecode: account_address2_addresstypecode,
    address2_city: string,
    readonly address2_composite: string,
    address2_country: string,
    address2_county: string,
    address2_fax: string,
    address2_freighttermscode: account_address2_freighttermscode,
    address2_latitude: number,
    address2_line1: string,
    address2_line2: string,
    address2_line3: string,
    address2_longitude: number,
    address2_name: string,
    address2_postalcode: string,
    address2_postofficebox: string,
    address2_primarycontactname: string,
    address2_shippingmethodcode: account_address2_shippingmethodcode,
    address2_stateorprovince: string,
    address2_telephone1: string,
    address2_telephone2: string,
    address2_telephone3: string,
    address2_upszone: string,
    address2_utcoffset: number,
    adx_createdbyipaddress: string,
    adx_createdbyusername: string,
    adx_modifiedbyipaddress: string,
    adx_modifiedbyusername: string,
    readonly aging30: number,
    readonly aging30_base: number,
    readonly aging60: number,
    readonly aging60_base: number,
    readonly aging90: number,
    readonly aging90_base: number,
    businesstypecode: account_businesstypecode,
    // Foreign Key Column
    readonly _createdbyexternalparty_value: `/externalparty(${string})`,
    readonly createdbyexternalpartyname: string,
    readonly createdbyexternalpartyyominame: string,
    readonly createdbyname: string,
    readonly createdbyyominame: string,
    readonly createdonbehalfbyname: string,
    readonly createdonbehalfbyyominame: string,
    creditlimit: number,
    readonly creditlimit_base: number,
    creditonhold: account_creditonhold,
    customersizecode: account_customersizecode,
    customertypecode: account_customertypecode,
    description: string,
    donotbulkemail: account_donotbulkemail,
    donotbulkpostalmail: account_donotbulkpostalmail,
    donotemail: account_donotemail,
    donotfax: account_donotfax,
    donotphone: account_donotphone,
    donotpostalmail: account_donotpostalmail,
    donotsendmm: account_donotsendmm,
    emailaddress1: string,
    emailaddress2: string,
    emailaddress3: string,
    // This is an image encoded as a base64 string
    entityimage: string,
    readonly entityimage_timestamp: number,
    readonly entityimage_url: string,
    readonly entityimageid: string,
    readonly exchangerate: number,
    fax: string,
    followemail: account_followemail,
    ftpsiteurl: string,
    industrycode: account_industrycode,
    readonly isprivate: account_isprivate,
    lastonholdtime: Date,
    lastusedincampaign: Date,
    marketcap: number,
    readonly marketcap_base: number,
    marketingonly: account_marketingonly,
    readonly masteraccountidname: string,
    readonly masteraccountidyominame: string,
    // Foreign Key Column
    readonly _masterid_value: `/account(${string})`,
    readonly merged: account_merged,
    // Foreign Key Column
    readonly _modifiedbyexternalparty_value: `/externalparty(${string})`,
    readonly modifiedbyexternalpartyname: string,
    readonly modifiedbyexternalpartyyominame: string,
    readonly modifiedbyname: string,
    readonly modifiedbyyominame: string,
    readonly modifiedonbehalfbyname: string,
    readonly modifiedonbehalfbyyominame: string,
    // Foreign Key Column
    _msa_managingpartnerid_value: `/account(${string})`,
    readonly msa_managingpartneridname: string,
    readonly msa_managingpartneridyominame: string,
    name: string,
    numberofemployees: number,
    readonly onholdtime: number,
    ownershipcode: account_ownershipcode,
    readonly owningbusinessunitname: string,
    // Foreign Key Column
    _parentaccountid_value: `/account(${string})`,
    readonly parentaccountidname: string,
    readonly parentaccountidyominame: string,
    participatesinworkflow: account_participatesinworkflow,
    paymenttermscode: account_paymenttermscode,
    preferredappointmentdaycode: account_preferredappointmentdaycode,
    preferredappointmenttimecode: account_preferredappointmenttimecode,
    preferredcontactmethodcode: account_preferredcontactmethodcode,
    // Foreign Key Column
    readonly _preferredsystemuserid_value: `/systemuser(${string})`,
    readonly preferredsystemuseridname: string,
    readonly preferredsystemuseridyominame: string,
    // Foreign Key Column
    readonly _primarycontactid_value: `/contact(${string})`,
    readonly primarycontactidname: string,
    readonly primarycontactidyominame: string,
    primarysatoriid: string,
    primarytwitterid: string,
    processid: string,
    revenue: number,
    readonly revenue_base: number,
    sharesoutstanding: number,
    shippingmethodcode: account_shippingmethodcode,
    sic: string,
    // Foreign Key Column
    readonly _slaid_value: `/sla(${string})`,
    // Foreign Key Column
    readonly _slainvokedid_value: `/sla(${string})`,
    readonly slainvokedidname: string,
    readonly slaname: string,
    stageid: string,
    statecode: account_statecode,
    statuscode: account_statuscode,
    stockexchange: string,
    telephone1: string,
    telephone2: string,
    telephone3: string,
    territorycode: account_territorycode,
    tickersymbol: string,
    readonly timespentbymeonemailandmeetings: string,
    // Foreign Key Column
    readonly _transactioncurrencyid_value: `/transactioncurrency(${string})`,
    readonly transactioncurrencyidname: string,
    traversedpath: string,
    websiteurl: string,
    yominame: string,
}>

const enum account_accountcategorycode {
"Preferred Customer" = 1,
"Standard" = 2,
}
const enum account_accountclassificationcode {
"Default Value" = 1,
}
const enum account_accountratingcode {
"Default Value" = 1,
}
const enum account_address1_addresstypecode {
"Bill To" = 1,
"Ship To" = 2,
"Primary" = 3,
"Other" = 4,
}
const enum account_address1_freighttermscode {
"FOB" = 1,
"No Charge" = 2,
}
const enum account_address1_shippingmethodcode {
"Airborne" = 1,
"DHL" = 2,
"FedEx" = 3,
"UPS" = 4,
"Postal Mail" = 5,
"Full Load" = 6,
"Will Call" = 7,
}
const enum account_address2_addresstypecode {
"Default Value" = 1,
}
const enum account_address2_freighttermscode {
"Default Value" = 1,
}
const enum account_address2_shippingmethodcode {
"Default Value" = 1,
}
const enum account_businesstypecode {
"Default Value" = 1,
}
const enum account_creditonhold {
"No" = 0,
"Yes" = 1,
}
const enum account_customersizecode {
"Default Value" = 1,
}
const enum account_customertypecode {
"Competitor" = 1,
"Consultant" = 2,
"Customer" = 3,
"Investor" = 4,
"Partner" = 5,
"Influencer" = 6,
"Press" = 7,
"Prospect" = 8,
"Reseller" = 9,
"Supplier" = 10,
"Vendor" = 11,
"Other" = 12,
}
const enum account_donotbulkemail {
"Allow" = 0,
"Do Not Allow" = 1,
}
const enum account_donotbulkpostalmail {
"No" = 0,
"Yes" = 1,
}
const enum account_donotemail {
"Allow" = 0,
"Do Not Allow" = 1,
}
const enum account_donotfax {
"Allow" = 0,
"Do Not Allow" = 1,
}
const enum account_donotphone {
"Allow" = 0,
"Do Not Allow" = 1,
}
const enum account_donotpostalmail {
"Allow" = 0,
"Do Not Allow" = 1,
}
const enum account_donotsendmm {
"Send" = 0,
"Do Not Send" = 1,
}
const enum account_followemail {
"Do Not Allow" = 0,
"Allow" = 1,
}
const enum account_industrycode {
"Accounting" = 1,
"Agriculture and Non-petrol Natural Resource Extraction" = 2,
"Broadcasting Printing and Publishing" = 3,
"Brokers" = 4,
"Building Supply Retail" = 5,
"Business Services" = 6,
"Consulting" = 7,
"Consumer Services" = 8,
"Design, Direction and Creative Management" = 9,
"Distributors, Dispatchers and Processors" = 10,
"Doctor's Offices and Clinics" = 11,
"Durable Manufacturing" = 12,
"Eating and Drinking Places" = 13,
"Entertainment Retail" = 14,
"Equipment Rental and Leasing" = 15,
"Financial" = 16,
"Food and Tobacco Processing" = 17,
"Inbound Capital Intensive Processing" = 18,
"Inbound Repair and Services" = 19,
"Insurance" = 20,
"Legal Services" = 21,
"Non-Durable Merchandise Retail" = 22,
"Outbound Consumer Service" = 23,
"Petrochemical Extraction and Distribution" = 24,
"Service Retail" = 25,
"SIG Affiliations" = 26,
"Social Services" = 27,
"Special Outbound Trade Contractors" = 28,
"Specialty Realty" = 29,
"Transportation" = 30,
"Utility Creation and Distribution" = 31,
"Vehicle Retail" = 32,
"Wholesale" = 33,
}
const enum account_isprivate {
"No" = 0,
"Yes" = 1,
}
const enum account_marketingonly {
"No" = 0,
"Yes" = 1,
}
const enum account_merged {
"No" = 0,
"Yes" = 1,
}
const enum account_ownershipcode {
"Public" = 1,
"Private" = 2,
"Subsidiary" = 3,
"Other" = 4,
}
const enum account_participatesinworkflow {
"No" = 0,
"Yes" = 1,
}
const enum account_paymenttermscode {
"Net 30" = 1,
"2% 10, Net 30" = 2,
"Net 45" = 3,
"Net 60" = 4,
}
const enum account_preferredappointmentdaycode {
"Sunday" = 0,
"Monday" = 1,
"Tuesday" = 2,
"Wednesday" = 3,
"Thursday" = 4,
"Friday" = 5,
"Saturday" = 6,
}
const enum account_preferredappointmenttimecode {
"Morning" = 1,
"Afternoon" = 2,
"Evening" = 3,
}
const enum account_preferredcontactmethodcode {
"Any" = 1,
"Email" = 2,
"Phone" = 3,
"Fax" = 4,
"Mail" = 5,
}
const enum account_shippingmethodcode {
"Default Value" = 1,
}
const enum account_statecode {
"Active" = 0,
"Inactive" = 1,
}
const enum account_statuscode {
"Active" = 1,
"Inactive" = 2,
}
const enum account_territorycode {
"Default Value" = 1,
}

export interface UxAgentDataApi extends BaseUxAgentDataApi<TableRegistrations, EnumRegistrations> {}

export interface GeneratedComponentProps {
    dataApi: UxAgentDataApi;
}

