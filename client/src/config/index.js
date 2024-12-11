export const registerFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your user name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "festive-essentials", label: "Festive Essentials" },
      { id: "traditional-clothing-accessories", label: "Traditional Clothing" },
      { id: "handmade-artistic-items", label: "Artistic Items" },
      { id: "eco-friendly-traditional-goods", label: "Traditional Goods" },
      { id: "handicrafts", label: "Handicrafts" },
    ],
  },
  {
    label: "Brand",
    name: "brand",
    componentType: "select",
    options: [
      { id: "patanjali", label: "Patanjali" },
    { id: "khadi-gram-udyog", label: "Khadi Gram Udyog" },
    { id: "indigifts", label: "Indigifts" },
    { id: "fabindia", label: "FabIndia" },
    { id: "artisan-direct", label: "Artisan Direct" },
    { id: "raymond-ethnix", label: "Raymond Ethnix" },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
];

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
  },
  {
    id: "products",
    label: "Products",
    path: "/shop/listing",
  },
  {
    id: "festive-essentials",
    label: "Festive Essentials",
    path: "/shop/listing",
  },
  {
    id: "traditional-clothing-accessories",
    label: "Traditional Clothing",
    path: "/shop/listing",
  },
  {
    id: "handmade-artistic-items",
    label: "Artistic Items",
    path: "/shop/listing",
  },
  {
    id: "eco-friendly-traditional-goods",
    label: "Traditional Goods",
    path: "/shop/listing",
  },
  {
    id: "handicrafts",
    label: "Handicrafts",
    path: "/shop/listing",
  },
  {
    id: "search",
    label: "Search",
    path: "/shop/search",
  },
];

export const categoryOptionsMap = {
  "festive-essentials": "Festive Essentials",
  "traditional-clothing-accessories": "Traditional Clothing",
  "handmade-artistic-items": "Artistic Items",
  "eco-friendly-traditional-goods": "Traditional Goods",
  "handicrafts": "Handicrafts",
};

export const brandOptionsMap = {
  "patanjali": "Patanjali",
  "khadi-gram-udyog": "Khadi Gram Udyog",
  "indigifts": "Indigifts",
  "fabindia": "FabIndia",
  "artisan-direct": "Artisan Direct",
  "raymond-ethnix": "Raymond Ethnix",
};

// src/config.js
export const filterOptions = {
  category: [
    { id: "festive-essentials", label: "Festive Essentials" },
    { id: "traditional-clothing-accessories", label: "Traditional Clothing" },
    { id: "handmade-artistic-items", label: "Artistic Items" },
    { id: "eco-friendly-traditional-goods", label: "Traditional Goods" },
    { id: "handicrafts", label: "Handicrafts" },
  ],
  brand: [
    { id: "patanjali", label: "Patanjali" },
    { id: "khadi-gram-udyog", label: "Khadi Gram Udyog" },
    { id: "indigifts", label: "Indigifts" },
    { id: "fabindia", label: "FabIndia" },
    { id: "artisan-direct", label: "Artisan Direct" },
    { id: "raymond-ethnix", label: "Raymond Ethnix" },
  ],
};


export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];
