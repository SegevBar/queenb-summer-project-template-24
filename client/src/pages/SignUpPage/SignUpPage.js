import { useState, useContext, useEffect } from 'react';
import styles from './SignUpPage.module.css';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import SignUpSuccessMessage from '../../components/SignUpSuccessMessage/SignUpSuccessMessage';
import { AuthContext } from '../../context/AuthContext';

const SignUp = () => {
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [name, setName] = useState('');
  const { user, login } = useContext(AuthContext);

  // Handle successful sign-up
  const handleSignUpSuccess = (userData) => {
    setIsSignedUp(true);
    const { newUser, authToken } = userData;
    setName(newUser.name);
    login(newUser, authToken); // Automatically log in the user
  };

  useEffect(() => {
    if (user && user.name) {
      setName(user.name); // Set name from the logged-in user data
    }
  }, [user]);

  return (
    <div className={styles.signUp}>
      {isSignedUp || user ?  (
        <SignUpSuccessMessage name={name} />
      ) : (
        <SignUpForm onSignUpSuccess={handleSignUpSuccess} />
      )}
    </div>
  );
};

export default SignUp;

