import { Box, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
const NotFound404 = () => {
    const navigate = useNavigate()
    return (
        <>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center',
                border: '50px solid greeen',
                height: '90vh'
            }}>

                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', rowGap: 2 }}>

                    <Typography variant="h5" color="#0f172a">404</Typography>
                    <Typography variant="h3" letterSpacing={'-1.2px'} color="#000000">Page not found</Typography>
                    <Typography variant="body1" fontSize={'16px'} color="#4b5563">{`Sorry, we could not find the page you're looking for.`}
                    </Typography>

                    <Button onClick={() => navigate('/')} variant="outlined" sx={{ backgroundColor: 'black', color: 'white', ":hover": { color: "black", backgroundColor: 'white' } }}>
                        Back To Home Page
                    </Button>

                </Box>

            </Box>
        </>
    )
}

export default NotFound404