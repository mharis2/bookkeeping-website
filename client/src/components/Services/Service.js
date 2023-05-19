import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const Service = ({ service }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {service.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {service.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Service;
