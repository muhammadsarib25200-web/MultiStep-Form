'use client';
import { Box, TextField, Typography } from '@mui/material';
import { FormikProps } from 'formik';
import { FormValues } from '../types/formType'

interface StepAccountProps {
    formik: FormikProps<FormValues>;
}
export default function StepAccount({ formik }: StepAccountProps) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
            }}
        >
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        Step 1: Account Details
      </Typography>

    <TextField
        fullWidth
        id="email"
        label="Email Address"
        type="email"
        {...formik.getFieldProps('email')}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />
      <TextField
      fullWidth
      id="password"
      label="password"
      type='password'
      {...formik.getFieldProps('password')}
      error={formik.touched.password && Boolean(formik.errors.password)}
      helperText={formik.touched.password && formik.errors.password}
      />
     
      <TextField
        fullWidth
        id="confirmPassword"
        label="Confirm Password"
        type="password"
        {...formik.getFieldProps('confirmPassword')}
        error={
          formik.touched.confirmPassword &&
          Boolean(formik.errors.confirmPassword)
        }
        helperText={
          formik.touched.confirmPassword && formik.errors.confirmPassword
        }
      />

        </Box>
    );
    
}