export const formatRequestError = (error: any): string => {
  if (error?.message && Array.isArray(error.message)) {
    return error.message.join('\n')
  }

  return error?.message ? error.message.toString() : 'Something go wrong'
}