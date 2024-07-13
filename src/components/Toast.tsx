import React from 'react'
import Snackbar from '@mui/material/Snackbar'
import {
  Alert,
  Box,
  useTheme,
  Stack,
  Typography,
} from '@mui/material'

interface IToastProps {
  open: boolean
  variant: 'success' | 'error'
  title?: string
  autoHideDuration?: number
  text: string | null
  onClose?: () => void
}

interface IVariant {
  bgColor: string
}

const Toast: React.FC<IToastProps> = ({
  open,
  variant,
  autoHideDuration,
  title,
  text,
  onClose,
}) => {
  const { palette } = useTheme()

  const variantMap: Record<'success' | 'error', IVariant> = {
    success: {
      bgColor: '#00FF00'!,
    },
    error: {
      bgColor: palette.error.main,
    },
  }

  const { bgColor } = variantMap[variant]

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      onClose={onClose}
      sx={{ width: '100%' }}
    >
      <Alert
        onClose={onClose}
        action={
          <Box
            sx={{
              display: 'flex',
              height: '100%',
            }}
          >
          </Box>
        }
        icon={false}
        sx={{
          px: 0,
          borderRadius: 0,
          backgroundColor: palette.common.white,
          boxShadow: 1,

          borderLeft: `4px solid ${bgColor}`,
        }}
      >
        <Stack
          sx={{ flex: 1, flexDirection: 'row', gap: 2, minWidth: '200px' }}
        >
          <Box
            sx={{
              backgroundColor: bgColor,
              p: 0.5,
              borderRadius: '0px 16px 16px 0px',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
          </Box>
          <Stack
            sx={{
              justifyContent: 'center',
            }}
          >
            {title && <Typography variant="subtitle1">{title}</Typography>}
            <Typography variant="body2">{text}</Typography>
          </Stack>
        </Stack>
      </Alert>
    </Snackbar>
  )
}

export default Toast