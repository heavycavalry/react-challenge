import { Card as MuiCard, CardHeader } from '@mui/material';
import {Button} from "./Button";
import {IconAdd} from "./button.styled";
import React from "react";
import {ActionHeader} from "./ActionHeader";

export const Card = ({ title, subheader, children, ...props }) => {
  return (
    <MuiCard
        sx={{position: "relative"}}
        variant="outlined" {...props}>
      <ActionHeader
        title={title}
        variant={'h3'}
        subheader={subheader}
        subheaderTypographyProps={{
          variant: 'subtitle1',
        }}
        renderActions={() => <Button variant={"contained"} color={"primary"} startIcon={<IconAdd/>}>Zdefiniuj budżet</Button>
        }
      />
      {children}
    </MuiCard>
  );
};

