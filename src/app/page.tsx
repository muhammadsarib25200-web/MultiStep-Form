'use client';    
import { Container, Box } from '@mui/material';
import MultiStepForm from './components/MultiStepForm';
export default function Home() {
  return (
    <Container maxWidth="md">
      <Box sx={{py:5}}>
        <MultiStepForm />
      </Box>
    </Container>
  );
}