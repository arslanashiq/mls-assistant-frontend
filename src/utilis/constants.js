export const LISTING_STATUS = [
  { id: "flexRadioDefault3", label: "All", value: "All", defaultChecked: true },
  { id: "flexRadioDefault1", label: "Buy", value: "Residential" },
  { id: "flexRadioDefault2", label: "Rent", value: "Residential Lease" },
];

export const ACTIVE_STATUS = [
  { id: "flexRadioDefault3", label: "All", value: "All" },
  {
    id: "flexRadioDefault1",
    label: "Active",
    value: "Active",
    defaultChecked: true,
  },
  {
    id: "flexRadioDefault2",
    label: "Active Under Contract",
    value: "Active Under Contract",
  },
  { id: "flexRadioDefault3", label: "Canceled", value: "Canceled" },
  { id: "flexRadioDefault4", label: "Closed", value: "Closed" },
  { id: "flexRadioDefault5", label: "Expired", value: "Expired" },
  { id: "flexRadioDefault6", label: "Pending", value: "Pending" },
  { id: "flexRadioDefault7", label: "Withdrawn", value: "Withdrawn" },
];

export const PRICE_RANGE = { value: { min: 0, max: 100000 } };


export const BEDROOMS = [
    { id: "any", label: "any",value:0, defaultChecked: true },
    { id: "oneplus", label: "1+",value:1, },
    { id: "twoplus", label: "2+" ,value:2,},
    { id: "threeplus", label: "3+",value:3, },
    { id: "fourplus", label: "4+",value:4, },
    { id: "fiveplus", label: "5+",value:5, },
  ]


  export  const BATHROOMS = [
    { id: "bathany", label: "any", defaultChecked: true ,value:0},
    { id: "bathoneplus", label: "1+",value:1 },
    { id: "bathtwoplus", label: "2+" ,value:2},
    { id: "baththreeplus", label: "3+",value:3 },
    { id: "bathfourplus", label: "4+",value:4 },
    { id: "bathfiveplus", label: "5+",value:5 },
  ];
