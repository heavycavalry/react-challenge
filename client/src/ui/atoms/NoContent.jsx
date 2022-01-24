import { Box } from '@mui/material';
import { Text } from './common.styled';
import Image from '../../assets/no_content.png';
export const NoContent = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <img src={Image} alt="" />
      <Text>Brak danych do wyświetlenia</Text>
    </Box>
  );
};
