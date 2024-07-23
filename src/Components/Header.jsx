import { Typography, Box, useTheme } from "@mui/material";
import { token } from '../theme';

const Header = ({title, subtitle}) => {
    const theme = useTheme();
    const colors = token(theme.palette.mode)
    return (
        <Box ml = "20px" mb="30px">
            <Typography 
            variant="h5" 
            color={colors.grey[100]} 
            fontWeight="bold"sx={{mb:"5px"}}
            >
                {title}
            </Typography>

            <Typography variant="h5" color={colors.greenAccent[400]}>
                {subtitle}
            </Typography>
        </Box>
    );
}

export default Header