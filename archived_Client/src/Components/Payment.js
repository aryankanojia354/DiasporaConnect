import React, { useEffect, useState, useRef } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./payment.css";
import { app } from "../Firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import VanillaTilt from "vanilla-tilt";
import chip from "../imgs/chip.png";
import american from "../imgs/american.png";
import visa from "../imgs/visa2.png";
import master from "../imgs/master.png";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { AddOrder } from "../action/Orders";
import { useSelector, useDispatch } from "react-redux";
import swal from "sweetalert";
import LowerNav from "./LowerNav";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const auth = getAuth(app);
const db = getFirestore(app);

function Payment() {
  // User and Shipping Details
  const [user, setUser] = useState(null);
  const [country, setCountry] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");

  // Payment Details
  const [paymentMode, setPaymentMode] = useState("COD");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardCVV, setCardCVV] = useState("");
  const [cardEXP, setCardEXP] = useState("");
  const [cardType, setCardType] = useState("");

  // Display Controls
  const [shippingDisplay, setShippingDisplay] = useState("block");
  const [cardDisplay, setCardDisplay] = useState("none");

  // Errors
  const [errors, setErrors] = useState({
    email: "",
    number: "",
    country: "",
    name: "",
    address: "",
    pincode: "",
    cardNumber: "",
    cardName: "",
    cardCVV: "",
    cardEXP: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const CartItems = useSelector((state) => state.CartItemsAdded.CartItems);
  const tiltRef = useRef(null);

  // Notifications
  const notify1 = () =>
    toast.error("Please fill up the form correctly!", {
      position: "top-center",
      autoClose: 1800,
      theme: "colored",
    });

  const notify2 = () =>
    toast.error("Please fill up the card details correctly!", {
      position: "top-center",
      autoClose: 1800,
      theme: "colored",
    });

  const notify3 = () =>
    toast.error("Card credentials can't be empty!", {
      position: "top-center",
      autoClose: 1800,
      theme: "colored",
    });

  // Effect to set document title
  useEffect(() => {
    document.title = "Payment Section";
  }, []);

  // Auth State Change
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Initialize Order ID
  const [orderID, setOrderID] = useState(126244);
  useEffect(() => {
    const storedID = parseInt(localStorage.getItem("OrderID"), 10) || 126244;
    const updateID = storedID + 2;
    setOrderID(updateID);
    localStorage.setItem("OrderID", updateID.toString());
  }, []);

  // Initialize VanillaTilt
  useEffect(() => {
    if (tiltRef.current) {
      VanillaTilt.init(tiltRef.current, {
        max: 10,
        speed: 100,
        glare: true,
        "max-glare": 0.3,
        transition: true,
        easing: "ease-out",
      });
    }
  }, []);

  // Detect Card Type
  useEffect(() => {
    detectCreditCardType(cardNumber);
  }, [cardNumber]);

  const detectCreditCardType = (number) => {
    // Remove all non-digit characters
    const cleaned = number.replace(/\D/g, "");

    // Visa
    if (/^4[0-9]{12}(?:[0-9]{3})?$/.test(cleaned)) {
      setCardType("Visa");
    }
    // Mastercard
    else if (/^5[1-5][0-9]{14}$/.test(cleaned)) {
      setCardType("Mastercard");
    }
    // American Express
    else if (/^3[47][0-9]{13}$/.test(cleaned)) {
      setCardType("American Express");
    } else {
      setCardType("");
    }
  };

  // Current Date and Time
  const [currentDateTime, setCurrentDateTime] = useState("");
  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const currentDate = `${now.getDate().toString().padStart(2, "0")}-${(
        now.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${now.getFullYear()}`;
      const currentTime = `${now.getHours().toString().padStart(2, "0")}:${now
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;
      setCurrentDateTime(`Date: ${currentDate} and Time: ${currentTime}`);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // Total Amount and Cart Data
  const TotalAmount = localStorage.getItem("TotalAmount") || 0;
  const CartData = JSON.parse(localStorage.getItem("CartItems")) || [];

  // Reset Total Amount if Cart is Empty
  useEffect(() => {
    if (CartItems.length === 0) {
      localStorage.setItem("TotalAmount", 0);
    }
  }, [CartItems]);

  // Add User Data to Firestore
  const AddUserData = async () => {
    try {
      await addDoc(collection(db, "Users"), {
        name,
        mail: email,
        number,
        country,
        address,
        pincode,
        amount: TotalAmount,
        paymethod: paymentMode,
        orderID,
        order: CartItems,
        transaction_time: currentDateTime,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  // Handle Shipping Details Validation
  const validateShippingDetails = () => {
    let valid = true;
    let newErrors = { ...errors };

    if (!country.trim()) {
      newErrors.country = "Please enter your country's name.";
      valid = false;
    } else {
      newErrors.country = "";
    }

    if (!name.trim()) {
      newErrors.name = "Please enter your name.";
      valid = false;
    } else {
      newErrors.name = "";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = "Please enter your email address.";
      valid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address.";
      valid = false;
    } else {
      newErrors.email = "";
    }

    if (!number.trim()) {
      newErrors.number = "Please enter your contact number.";
      valid = false;
    } else if (!/^\d{10}$/.test(number)) {
      newErrors.number = "Please enter a valid 10-digit contact number.";
      valid = false;
    } else {
      newErrors.number = "";
    }

    if (!address.trim()) {
      newErrors.address = "Please enter your address.";
      valid = false;
    } else {
      newErrors.address = "";
    }

    if (!pincode.trim()) {
      newErrors.pincode = "Please enter your pincode.";
      valid = false;
    } else if (!/^\d{6}$/.test(pincode)) {
      newErrors.pincode = "Please enter a valid 6-digit pincode.";
      valid = false;
    } else {
      newErrors.pincode = "";
    }

    setErrors(newErrors);
    return valid;
  };

  // Handle Card Details Validation
  const validateCardDetails = () => {
    let valid = true;
    let newErrors = { ...errors };

    // Card Number Validation
    const cleanedCardNumber = cardNumber.replace(/\s+/g, "");
    if (!cleanedCardNumber) {
      newErrors.cardNumber = "Please enter your card number.";
      valid = false;
    } else if (
      (cardType === "American Express" && cleanedCardNumber.length !== 15) ||
      ((cardType === "Visa" || cardType === "Mastercard") &&
        cleanedCardNumber.length !== 16)
    ) {
      newErrors.cardNumber = "Please enter a valid card number.";
      valid = false;
    } else if (!/^\d+$/.test(cleanedCardNumber)) {
      newErrors.cardNumber = "Card number must contain only digits.";
      valid = false;
    } else {
      newErrors.cardNumber = "";
    }

    // Card Holder's Name Validation
    if (!cardName.trim()) {
      newErrors.cardName = "Please enter the card holder's name.";
      valid = false;
    } else {
      newErrors.cardName = "";
    }

    // CVV Validation
    if (!cardCVV.trim()) {
      newErrors.cardCVV = "Please enter your CVV number.";
      valid = false;
    } else if (
      (cardType === "American Express" && cardCVV.length !== 4) ||
      ((cardType === "Visa" || cardType === "Mastercard") &&
        cardCVV.length !== 3)
    ) {
      newErrors.cardCVV = "Please enter a valid CVV number.";
      valid = false;
    } else if (!/^\d+$/.test(cardCVV)) {
      newErrors.cardCVV = "CVV must contain only digits.";
      valid = false;
    } else {
      newErrors.cardCVV = "";
    }

    // Expiry Date Validation
    if (!cardEXP.trim()) {
      newErrors.cardEXP = "Please enter the expiry date.";
      valid = false;
    } else if (!/^\d{4}$/.test(cardEXP)) {
      newErrors.cardEXP = "Expiry date must be in MMYY format.";
      valid = false;
    } else {
      const month = parseInt(cardEXP.slice(0, 2), 10);
      const year = parseInt(cardEXP.slice(2, 4), 10);
      const currentYear = new Date().getFullYear() % 100; // Get last two digits
      const currentMonth = new Date().getMonth() + 1;

      if (month < 1 || month > 12) {
        newErrors.cardEXP = "Please enter a valid month (01-12).";
        valid = false;
      } else if (year < currentYear || (year === currentYear && month < currentMonth)) {
        newErrors.cardEXP = "The card has expired.";
        valid = false;
      } else {
        newErrors.cardEXP = "";
      }
    }

    setErrors(newErrors);
    return valid;
  };

  // Handle Place Order
  const handlePlaceOrder = () => {
    if (paymentMode === "Credit") {
      if (
        !cardNumber.trim() ||
        !cardName.trim() ||
        !cardCVV.trim() ||
        !cardEXP.trim()
      ) {
        notify3();
        return;
      }

      if (!validateCardDetails()) {
        notify2();
        return;
      }
    }

    // Validate Shipping Details
    if (!validateShippingDetails()) {
      notify1();
      return;
    }

    // Proceed with Order Placement
    dispatch(AddOrder(CartData));
    AddUserData();

    swal({
      title: paymentMode === "Credit" ? "Transaction Successful!" : "Purchase Successful!",
      text: "Thanks for shopping with us.",
      icon: "success",
      buttons: "Ok",
    }).then((willNavigate) => {
      if (willNavigate) {
        localStorage.removeItem("CartItems");
        navigate("/orders");
        window.location.reload();
      }
    });
  };

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="payment-page">
        <div className="more-data">
          {/* Shipping Details Section */}
          <div
            style={{ display: shippingDisplay }}
            className="shipping-data animate"
          >
            <div className="shipping-head">Shipping Details</div>
            <div className="user-data-form">
              <p className="order-id">Order ID: {orderID}</p>
              <div className="all-data-of-user">
                <div className="user-data1">
                  <div className="country">
                    <p className="country-name">Country*</p>
                    <input
                      type="text"
                      placeholder="India"
                      onChange={(e) => setCountry(e.target.value)}
                      value={country}
                      required
                    />
                    {errors.country && (
                      <div className="error-message">{errors.country}</div>
                    )}
                  </div>
                  <div className="user-name">
                    <p className="user-fullname">Name*</p>
                    <input
                      type="text"
                      placeholder="Full Name"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      required
                    />
                    {errors.name && (
                      <div className="error-message">{errors.name}</div>
                    )}
                  </div>
                  <div className="user-contact">
                    <p className="user-number">Contact Number*</p>
                    <input
                      type="text"
                      placeholder="1234567890"
                      onChange={(e) => setNumber(e.target.value)}
                      value={number}
                      required
                    />
                    {errors.number && (
                      <div className="error-message">{errors.number}</div>
                    )}
                  </div>
                </div>
                <div className="user-data2">
                  <div className="user-email">
                    <p className="user-fullname">Email Address*</p>
                    <input
                      type="email"
                      placeholder="example@domain.com"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      required
                    />
                    {errors.email && (
                      <div className="error-message">{errors.email}</div>
                    )}
                  </div>
                  <div className="user-address">
                    <p className="user-fulladdress">Home Address*</p>
                    <input
                      type="text"
                      placeholder="1234 Street Name"
                      onChange={(e) => setAddress(e.target.value)}
                      value={address}
                      required
                    />
                    {errors.address && (
                      <div className="error-message">{errors.address}</div>
                    )}
                  </div>
                  <div className="user-pincode">
                    <p className="user-pin-number">Pincode*</p>
                    <input
                      type="text"
                      placeholder="560001"
                      onChange={(e) => setPincode(e.target.value)}
                      value={pincode}
                      required
                    />
                    {errors.pincode && (
                      <div className="error-message">{errors.pincode}</div>
                    )}
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  if (validateShippingDetails()) {
                    setShippingDisplay("none");
                    setCardDisplay("block");
                  } else {
                    notify1();
                  }
                }}
                className="save-address"
              >
                Save
              </button>
            </div>
          </div>

          {/* Payment Details Section */}
          <div
            style={{ display: cardDisplay }}
            className="payment-data animate"
          >
            <div className="payment-option">
              <p className="payment-method">Choose Your Payment Method</p>
              <div className="choose-option">
                <div className="cod">
                  <input
                    type="radio"
                    name="payment-method"
                    onChange={(e) => setPaymentMode(e.target.value)}
                    value="COD"
                    checked={paymentMode === "COD"}
                  />
                  Cash on Delivery (COD)
                </div>
                <div className="credit">
                  <input
                    type="radio"
                    name="payment-method"
                    onChange={(e) => setPaymentMode(e.target.value)}
                    value="Credit"
                    checked={paymentMode === "Credit"}
                  />
                  Credit/Debit Card
                </div>
              </div>

              {/* Credit Card Details */}
              {paymentMode === "Credit" && (
                <div className="online-card-section">
                  <div ref={tiltRef} className="credit-body">
                    <div className="first-layer">
                      <img src={chip} alt="Chip" className="credit-chip" />
                      {cardType && (
                        <img
                          src={
                            cardType === "Visa"
                              ? visa
                              : cardType === "Mastercard"
                              ? master
                              : cardType === "American Express"
                              ? american
                              : ""
                          }
                          className="card-company animation"
                          alt="Card Type"
                        />
                      )}
                    </div>
                    <div className="middle-layer">
                      <p className="account-number">
                        {cardNumber
                          ? cardNumber
                              .replace(/\s+/g, "")
                              .replace(/(.{4})/g, "$1 ")
                              .trim()
                          : "#### #### #### ####"}
                      </p>
                    </div>
                    <div className="last-layer">
                      <p className="holder-name">
                        {cardName.toUpperCase() || "CARD HOLDER"}
                      </p>
                      <p className="cvv-number">
                        {cardCVV || "###"}
                      </p>
                      <p className="exp-date">
                        {cardEXP
                          ? `${cardEXP.slice(0, 2)}/${cardEXP.slice(2, 4)}`
                          : "MM/YY"}
                      </p>
                    </div>
                  </div>

                  <div className="online-card-form">
                    <p className="card-head-details">Card Details</p>
                    <div className="all-data-of-card">
                      <div className="card-data1">
                        <div className="acc-number">
                          <p className="acc-number-head">Card Number*</p>
                          <input
                            type="text"
                            className="acc-number-inp"
                            onChange={(e) => setCardNumber(e.target.value)}
                            onBlur={validateCardDetails}
                            placeholder="1234 5678 9012 3456"
                            value={cardNumber}
                            maxLength="19"
                            pattern="\d{4} \d{4} \d{4} \d{4}"
                            title="Enter a valid card number"
                          />
                          {errors.cardNumber && (
                            <div className="error-message">{errors.cardNumber}</div>
                          )}
                        </div>
                        <div className="acc-name">
                          <p className="acc-name-head">Card Holder's Name*</p>
                          <input
                            type="text"
                            className="acc-name-inp"
                            onChange={(e) => setCardName(e.target.value)}
                            onBlur={validateCardDetails}
                            value={cardName}
                            placeholder="Ex: John Doe"
                          />
                          {errors.cardName && (
                            <div className="error-message">{errors.cardName}</div>
                          )}
                        </div>
                      </div>
                      <div className="card-data2">
                        <div className="acc-cvv">
                          <p className="acc-cvv-head">CVV Number*</p>
                          <input
                            type="text"
                            className="acc-cvv-inp"
                            onChange={(e) => setCardCVV(e.target.value)}
                            onBlur={validateCardDetails}
                            placeholder="123"
                            value={cardCVV}
                            maxLength="4"
                            pattern="\d{3,4}"
                            title="Enter a valid CVV"
                          />
                          {errors.cardCVV && (
                            <div className="error-message">{errors.cardCVV}</div>
                          )}
                        </div>
                        <div className="acc-exp">
                          <p className="acc-exp-head">Expiry Date*</p>
                          <input
                            type="text"
                            className="acc-exp-inp"
                            onChange={(e) => setCardEXP(e.target.value)}
                            onBlur={validateCardDetails}
                            placeholder="MMYY"
                            value={cardEXP}
                            maxLength="4"
                            pattern="\d{4}"
                            title="Enter expiry date in MMYY format"
                          />
                          {errors.cardEXP && (
                            <div className="error-message">{errors.cardEXP}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Total Amount */}
              <div className="total-amount">
                <p className="subtotal-amount">Total Amount :</p>
                <p className="main-amount">${TotalAmount}</p>
              </div>

              {/* Place Order Button */}
              <div className="order-place-btn">
                <button onClick={handlePlaceOrder} className="confirm-btn">
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="lowerNav">
        <LowerNav />
      </div>
      <Footer />
    </>
  );
}

export default Payment;
