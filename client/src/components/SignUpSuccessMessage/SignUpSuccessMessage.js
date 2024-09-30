import styles from './SignUpSuccessMessage.module.css';
import NavButton from '../common/NavButton/NavButton';
import { useNavigate } from 'react-router-dom';

const SignUpSuccessMessage = ({ name }) => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className={styles.successMessage}>
      <h1>Thank you for signing up, {name}!</h1>
      <p>Your account has been created successfully.</p>
      <NavButton onClick={handleGoHome}>Go to Home</NavButton>
    </div>
  );
};

export default SignUpSuccessMessage;
