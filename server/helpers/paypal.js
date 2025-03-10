const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id: "Ab5_hfjJT2EehYnzBOSk8vlndHLuzti-vWV4F1QZ3QNRfAgI221UXM39F_rnZn4gSJ_u_6HXQWUzEAc7",
  client_secret: "ELP4e1fckVhxN-EsjC0V0fB5ZJrWLYAgKCI0HUavkFHZOejBoGlr4l5x_PzqcNxpC-4hb1GfjDzvD8ck",
});

module.exports = paypal;
