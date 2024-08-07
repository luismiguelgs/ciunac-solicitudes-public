import { Box } from '@mui/material'
import { MyAppBar } from '../../core/components/mui'
import { Outlet } from 'react-router-dom'

type Props = {
    title: string
}

export default function Layout({title}:Props) {
    return (
        <>
            <Box sx={{flexGrow:1}}>
                <MyAppBar title={`SOLICITUD: ${title}`}  />
            </Box>
            <Outlet />
        </>
    )
}
