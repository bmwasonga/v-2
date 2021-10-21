import React from 'react';
import styled from '@emotion/styled';
import { Spinner, useToast } from '@chakra-ui/react';

export const Loading = ({ loading }) => {
  if (loading) {
    return (
      <SpinnerContainer>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />{' '}
      </SpinnerContainer>
    );
  }
};

export const Failure = ({ error }) => {
  const toast = useToast();
  if (error) {
    return (
      <p>
        The error is: {error.message}
        {toast({
          title: `error toast`,
          status: error,
          isClosable: true,
        })}
      </p>
    );
  }
};

// export const Success = ({ data }) => {
//   if (!data) {
//     return <p>Nothing to show...</p>;
//   }
//   if (data) {
//     return children;
//   }
// };

const SpinnerContainer = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100vh',
});
