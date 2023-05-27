export const initialState = {
  status: 'checking',
  user: {},
  errorMessage: undefined,
}

export const authenticatedState = {
  status: 'authenticated',
  user: {
    uid: '646fe147be0e77fb266bc1ee',
    name: 'Test Pruebas'
  },
  errorMessage: undefined,
}

export const notAuthenticatedState = {
  status: 'not-authenticated',
  user: {},
  errorMessage: undefined,
}