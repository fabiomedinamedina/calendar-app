import { useDispatch, useSelector } from 'react-redux'
import { onCloseDateModal, onOpenDateModal } from '../store/ui';

export const useUiStore = () => {

  const { isDateModalOpen } = useSelector( state => state.ui );
  const dispatch = useDispatch();

  const toggleDateModal = () => {
    ( isDateModalOpen ) 
    ? dispatch( onCloseDateModal() )
    : dispatch( onOpenDateModal() )
  }

  return {
    //* Propiedades
    isDateModalOpen,

    //* Métodos
    toggleDateModal
  }

}