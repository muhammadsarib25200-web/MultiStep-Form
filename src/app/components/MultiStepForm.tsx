'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';
import { Formik, FormikHelpers } from 'formik';

import { FormValues, initialValue } from '../types/formType';
import { validationSchemas } from '../schemas/formValidation';
import StepAccount from './StepAccount';
import StepPersonal from './StepPersonal';
import StepReview from './StepReview';

const steps = ['Account Details', 'Personal Info', 'Review & Submit'];
const STORAGE_KEY = 'multi_step_form_data';
const STEP_KEY = 'multi_step_form_step';

export default function MultiStepForm() {
  const [activeStep, setActiveStep] = useState(0);
  const [savedValues, setSavedValues] = useState<FormValues>(initialValue);
  const [isLoaded, setIsLoaded] = useState(false);

  // 1. Page Refresh Hone Par LocalStorage Se Data Load Karein
  useEffect(() => {
    const localData = localStorage.getItem(STORAGE_KEY);
    const localStep = localStorage.getItem(STEP_KEY);

    if (localData) {
      try {
        setSavedValues(JSON.parse(localData));
      } catch (e) {
        console.error('Failed to parse local storage data', e);
      }
    }

    if (localStep) {
      setActiveStep(Number(localStep));
    }

    setIsLoaded(true);
  }, []);

  const isLastStep = activeStep === steps.length - 1;

  // 2. Next / Submit Button Click Handler
  const handleNext = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    // Current step ki validation check karein
    const errors = await actions.validateForm();
    
    if (Object.keys(errors).length > 0) {
      actions.setTouched({
        email: true,
        password: true,
        confirmPassword: true,
        firstName: true,
        lastName: true,
        phone: true,
        acceptTerms: true,
      });
      actions.setSubmitting(false);
      return;
    }

    if (isLastStep) {
      // --- FINAL SUBMIT ---
      alert(`Form Submitted Successfully!\n${JSON.stringify(values, null, 2)}`);
      console.log('Final Form Data:', values);

      // A. LocalStorage clear karein taake data delete ho jaye
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(STEP_KEY);

      // B. Form ko initial value par reset karein aur Step 1 par le jayein
      setSavedValues(initialValue);
      actions.resetForm({ values: initialValue });
      setActiveStep(0);
      actions.setSubmitting(false);
    } else {
      // --- NEXT STEP ---
      const nextStep = activeStep + 1;
      setActiveStep(nextStep);

      // Data aur Step number ko localStorage me save karein
      localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
      localStorage.setItem(STEP_KEY, String(nextStep));

      actions.setTouched({});
    }
  };

  // 3. Back Button Click Handler
  const handleBack = () => {
    const prevStep = activeStep - 1;
    setActiveStep(prevStep);
    localStorage.setItem(STEP_KEY, String(prevStep));
  };

  // Jab tak browser client-side state load na kare tab tak wait karein (Hydration fix)
  if (!isLoaded) {
    return null;
  }

  return (
    <Card sx={{ maxWidth: 600, mx: 'auto', mt: 5, p: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5" align="center" sx={{ fontWeight: 'bold' }} gutterBottom>
          User Registration
        </Typography>

        {/* MUI Stepper Header */}
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4, mt: 2 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* Formik Form Controller */}
        <Formik
          enableReinitialize
          initialValues={savedValues}
          validationSchema={validationSchemas[activeStep]}
          onSubmit={handleNext}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit}>
              {/* Har input typing par data auto-save karne ke liye helper */}
              <FormikStorageSaver values={formik.values} step={activeStep} />

              {/* Dynamic Step Rendering */}
              {activeStep === 0 && <StepAccount formik={formik} />}
              {activeStep === 1 && <StepPersonal formik={formik} />}
              {activeStep === 2 && <StepReview formik={formik} />}

              {/* Navigation Buttons */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  variant="outlined"
                >
                  Back
                </Button>

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  {isLastStep ? 'Submit' : 'Next'}
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
}

// Sub-component: Har baar jab user input change karega to realtime localStorage update hoga
function FormikStorageSaver({ values, step }: { values: FormValues; step: number }) {
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
    localStorage.setItem(STEP_KEY, String(step));
  }, [values, step]);

  return null;
}