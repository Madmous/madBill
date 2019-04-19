export const getServerUrl = () => {
  console.log(process.env.NODE_ENV);
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:8080';
  }

  return 'https://mad-bill.herokuapp.com'
}