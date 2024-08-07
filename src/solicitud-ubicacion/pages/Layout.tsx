import { Box } from '@mui/material'
import { MyAppBar } from '../../core/components/mui'
import { Outlet } from 'react-router-dom'

export default function Layout() {
    return (
        <>
            <Box sx={{flexGrow:1}}>
                <MyAppBar title='SOLICITUD - EXAMEN DE UBICACIÓN' />
                
            </Box>
            <Outlet />
        </>
    )
}
