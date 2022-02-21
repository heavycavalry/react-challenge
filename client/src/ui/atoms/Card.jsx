import { Card as MuiCard } from '@mui/material';

import React from 'react';
import { ActionHeader } from './ActionHeader';

export const Card = ({ title, subheader, children, ...props }) => {
  return (
    <MuiCard variant="outlined" {...props}>
      <ActionHeader
        title={title}
        variant={'h3'}
        subheader={subheader}
        subheaderTypographyProps={{
          variant: 'subtitle1',
        }}
        renderActions={() => null}
      />
      {children}
    </MuiCard>
  );
};
