import {
  Button, TableContainer, Stack, TableHead, Table, TableRow,
  TableCell, TableBody, Paper, Container, Grid, Box
} from '@mui/material'
import { useInventoryList } from './useInventoryList'
import Loader from '@src/components/Loader'
import FormProvider from '@src/components/FormProvider'
import Toast from '@src/components/Toast'
import Input from '@src/components/Input'

export const InventoryList = () => {

  const {
    inventoryList,
    loading,
    methods,
    handleSubmit,
    handleAddInventoryItem,
    toast,
    handleCloseAlert
  } = useInventoryList()

  return (
    <Container maxWidth="sm">
      {loading
        ? <Loader />
        :
        <Stack spacing={6}>
          <FormProvider methods={methods}>
            <Grid container spacing={2}>
              <Grid item xs={4}><Input name="name" label="Product Name" placeholder="Product Name" /></Grid>
              <Grid item xs={4}><Input name="quantity" label="Quantity" placeholder="Quantity" /></Grid>
              <Box sx={{ margin: 'auto' }}>
                <Button variant="contained" onClick={handleSubmit(handleAddInventoryItem)}> Add </Button>
              </Box>
            </Grid>
          </FormProvider>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Product Name</TableCell>
                  <TableCell>Quantity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {inventoryList.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell>{row.quantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      }
      {toast && (
        <Toast
          onClose={handleCloseAlert}
          open={!!toast}
          autoHideDuration={3000}
          variant={toast.type}
          text={toast.message}
        />
      )}
    </Container>
  )
}
