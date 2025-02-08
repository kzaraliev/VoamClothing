import { useState, useMemo } from "react";

import Stepper from "./Stepper.jsx";
import StepOne from "./Steps/StepOne.jsx";
import StepTwo from "./Steps/StepTwo.jsx";
import StepThree from "./Steps/StepThree.jsx";

import styles from "./Checkout.module.css";
import { Helmet } from "react-helmet-async";

export default function Checkout() {
  const [activeStep, setActiveStep] = useState(1);

  const changeActiveStep = (stepValue) => {
    if (stepValue <= steps.length || stepValue >= 1) {
      setActiveStep(stepValue);
    }
  };

  const handleFormData = (newFormData) => {
    const data = {
      fullName: `${newFormData.firstName} ${newFormData.lastName}`,
      email: newFormData.email,
      phone: newFormData.phoneNumber,
      econtOffice: newFormData.econtOffice,
      city: newFormData.city,
      payment: newFormData.paymentMethod,
    };
    localStorage.setItem("checkout-data", JSON.stringify(data));
  };

  const steps = useMemo(
    () => [
      {
        label: "Billing Details",
        value: 1,
        component: (
          <StepOne
            changeActiveStep={changeActiveStep}
            onFormDataChange={handleFormData}
          />
        ),
      },
      {
        label: "Review & Confirm",
        value: 2,
        component: <StepTwo changeActiveStep={changeActiveStep} />,
      },
      {
        label: "Confirmation",
        value: 3,
        component: <StepThree changeActiveStep={changeActiveStep} />,
      },
    ],
    []
  );

  const activeComponent = useMemo(() => {
    return steps.find(({ value }) => value === activeStep)?.component || null;
  }, [activeStep, steps]);

  return (
    <>
      <Helmet>
        <title>Voam Clothing | Checkout</title>
        <meta
          name="description"
          content="Proceed with your order and review your details before confirming your purchase on our checkout page."
        />
        <meta
          name="keywords"
          content="checkout, order, payment, billing details, review, confirm, purchase"
        />
        <meta property="og:title" content="Voam Clothing | Checkout" />
        <meta
          property="og:description"
          content="Proceed with your order and review your details before confirming your purchase on our checkout page."
        />
        <meta property="og:url" content="https://voamclothing.com/checkout" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://voamclothing.com/assets/banner.png"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Voam Clothing | Checkout" />
        <meta
          name="twitter:description"
          content="Proceed with your order and review your details before confirming your purchase on our checkout page."
        />
        <meta
          name="twitter:image"
          content="https://voamclothing.com/assets/banner.png"
        />
      </Helmet>

      <div className={styles.checkoutContainer}>
        <Stepper
          steps={steps}
          activeStep={activeStep}
          changeActiveStep={changeActiveStep}
        />
        {activeComponent}
      </div>
    </>
  );
}
