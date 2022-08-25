import { useEffect} from 'react';
import s from './Modal.module.css';
import PropTypes from 'prop-types';

export default function Modal({ toogleModal, keyCloseModal, children }) {
    
    useEffect(() => {
        window.addEventListener('keydown', keyCloseModal)

        return () => {
            window.removeEventListener('keydown', keyCloseModal);
        }
    }, [keyCloseModal]);

    return (
       <div className={s.Overlay} onClick={toogleModal}>
              <div className={s.Modal}>
                <img className={s.ModalImage} src={children} alt="" width={900} height={ 600} />
          </div>
           </div>
   ) 
}

Modal.propTypes = {
    toogleModal: PropTypes.func,
    children: PropTypes.node,
    keyCloseModal: PropTypes.func,
};