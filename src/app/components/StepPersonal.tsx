'use client';
import { FormikProps } from 'formik';
import React from 'react';
import { FormValues } from '../types/formType';
import { Box, Grid, TextField, Typography } from '@mui/material';


interface StepPersonalProps {
    formik : FormikProps<FormValues>;
}

export default function StepPersonal({formik} : StepPersonalProps){
    return(
        <Box sx={{display:"flex", flexDirection:"column", gap:'3'}}>
       <Typography variant='h6' sx={{fontWeight:'bold'}}>
        Step 2: Personal Information
       </Typography>
       <Grid container spacing={2}>
        <Grid size={{xs : 12, sm : 6}}>
           <TextField
           fullWidth
           id='firstName'
           label='FirstName'
           {...formik.getFieldProps('firstName')}
           error={formik.touched.firstName && Boolean(formik.touched.firstName)}
           helperText={formik.touched.firstName && formik.errors.firstName}
           />
        </Grid>

    <Grid size={{ xs : 12, sm : 6}}>
          <TextField
            fullWidth
            id="lastName"
            label="Last Name"
            {...formik.getFieldProps('lastName')}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
        </Grid>
       </Grid>

       <TextField
        fullWidth
        id="phone"
        label="Phone Number"
        placeholder="03001234567"
        {...formik.getFieldProps('phone')}
        error={formik.touched.phone && Boolean(formik.errors.phone)}
        helperText={formik.touched.phone && formik.errors.phone}
      />
        </Box>
    );
}