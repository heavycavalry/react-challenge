import { Box, Typography } from '@mui/material';
import { Text } from './common.styled';
import Image from '../../assets/unknown_error.png';
export const Error = ({ error }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      {error?.message?.includes('Network Error') ? (
        <Typography>Uruchom Server!</Typography>
      ) : (
        <>
          <img
            src={Image}
            alt="grafika przedstawiająca dwie osoby w kombinezonach kosmicznych unoszące się między planetami"
          />
          <Text>Wystąpił nieoczekiwany błąd</Text>
        </>
      )}
    </Box>
  );
};
