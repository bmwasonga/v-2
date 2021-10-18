import { Button } from '@chakra-ui/button';
import { Link, useHistory } from 'react-router-dom';
import React from 'react';

const LogoutBtn = () => {
  const history = useHistory();
  const handleClick = () => {
    localStorage.removeItem('userData');
    history.push('/');
  };

  return (
    <div>
      <Button colorScheme="teal" variant="solid" onClick={handleClick}>
        <Link to="login">Logout</Link>
      </Button>
    </div>
  );
};

export default LogoutBtn;
