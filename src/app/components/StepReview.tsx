'use client';
import { Box, Paper, Typography, Divider, FormControlLabel, FormHelperText, Checkbox } from "@mui/material";
import { FormikProps } from "formik";
import { FormValues } from "../types/formType";



interface StepReviewProps {
    formik: FormikProps<FormValues>;
}
export default function StepReview({ formik }: StepReviewProps) {
    const { values, errors, touched } = formik;
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '3' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Step 3: Review & Submit
            </Typography>
            <Paper elevation={1} sx={{ p: 2.5, bgcolor: '#f9f9f9', borderRadius: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "primary" }} gutterBottom >
                    Account Details
                </Typography>

                <Typography variant="body2">
                    <strong>Email:</strong> {values.email || 'Not provided'}
                </Typography>

                <Divider sx={{ my: 1.5 }} />
                <Typography variant="body2">
                    <strong>Full Name</strong> {values.firstName}{values.lastName}
                </Typography>
                <Typography variant="body2" sx={{ mt: 0.5 }}>
                    <strong>Phone:</strong> {values.phone || 'Not provided'}
                </Typography>
            </Paper>
            <Box>
                <FormControlLabel
                    control={
                        <Checkbox
                            id='acceptTerms'
                            name='acceptTerms'
                            checked={values.acceptTerms}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            color="primary"
                        />
                    }
                    label="I accept the Terms and Conditions"
                />
                {touched.acceptTerms && errors.acceptTerms && (
                    <FormHelperText error>{errors.acceptTerms}</FormHelperText>
                )}
            </Box>
        </Box>
    );
}