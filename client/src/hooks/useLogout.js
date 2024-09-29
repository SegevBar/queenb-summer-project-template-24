import { useAuthContext } from './useAuthContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()

  const logout = () => {
    localStorage.removeItem('user'); //remove user from storage

    dispatch({ type: 'LOGOUT' }); //dispatch logout action
  }
  return { logout };
}