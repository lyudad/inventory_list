import {
    Box,
    BoxProps,
    FormHelperText,
    InputLabel,
    OutlinedInput,
    OutlinedInputProps,
    Stack,
    useTheme,
  } from '@mui/material'
  import { useFormContext, Controller } from 'react-hook-form'
  
  type Props = OutlinedInputProps & {
    name: string
    errorBoxProps?: BoxProps
  }
  
  export default function Input({
    name,
    inputProps,
    errorBoxProps,
    ...rest
  }: Props) {
    const { palette } = useTheme()
    const { control } = useFormContext()
  
    return (
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Box sx={{ position: 'relative' }}>
            {rest.label && (
              <InputLabel
                sx={{
                  mb: 1.2,
                  fontSize: '14px',
                  fontWeight: 500,
                }}
              >
                {rest.label}
              </InputLabel>
            )}
            <OutlinedInput
              {...field}
              value={
                typeof field.value === 'number' && field.value === 0
                  ? ''
                  : field.value
              }
              onChange={(event) => {
                let newValue = event.target.value
                if (inputProps?.type === 'phone') {
                  newValue = newValue.replace(/[^0-9]/g, '')
                  if (newValue.split('.').length > 2) {
                    newValue = newValue.slice(0, -1)
                  }
                }
  
                if (inputProps?.type === 'number') {
                  newValue = newValue.replace(/[^0-9]/g, '')
                  if (newValue.startsWith('0') && newValue.length > 1) {
                    newValue = newValue.replace(/^0+/, '')
                  }
                  if (newValue.split('.').length > 2) {
                    newValue = newValue.slice(0, -1)
                  }
                }
                field.onChange(newValue)
              }}
              fullWidth
              error={!!error}
              {...rest}
              label={null}
            />
            <Box mt={0.5} sx={{ minHeight: '1.5em' }} {...errorBoxProps}>
              {!!error && (
                <Stack flexDirection="row" alignItems="center" gap={0.5}>
                  <FormHelperText
                    sx={{
                      marginTop: '-0.3px',
                    }}
                    error
                  >
                    {error.message}
                  </FormHelperText>
                </Stack>
              )}
            </Box>
          </Box>
        )}
      />
    )
  }