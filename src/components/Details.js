import React from 'react';
import {
  Table,
  Text,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Heading,
  Container,
  Stack,
  Button,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { DELETE_USER } from './queries';
import LogoutBtn from './LogoutBtn';

const Details = () => {
  const userData = JSON.parse(localStorage.getItem('userData'));

  const [removeUser] = useMutation(DELETE_USER);

  const handleRemoveUser = () => {
    const userId = userData.loginUser.user.id;

    removeUser({
      variables: { input: { userId } },
      update(cache) {
        const normalizedId = cache.identify({ userId, __typename: 'User' });
        cache.evict({ userId: normalizedId });
        cache.gc();
      },
    });
  };
  return (
    <Container>
      {!userData &&  userData === null (
        <>
          <Heading>No data to display </Heading>
          <Text>Click here to login</Text>

          <Stack direction="row" spacing={4}>
            <Button colorScheme="teal" variant="solid">
              <Link to="signin">SignIn</Link>
            </Button>
            <Button colorScheme="teal" variant="solid">
              <Link to="signup">Signup</Link>
            </Button>
          </Stack>
        </>
      ) : (
        <>
          <Heading>Here are your details </Heading>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>Title</Th>
                <Th>Detail</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Id</Td>
                <Td> {userData.loginUser.user.id}</Td>
              </Tr>
              <Tr>
                <Td>First name</Td>
                <Td>{userData.loginUser.user.firstName}</Td>
              </Tr>
              <Tr>
                <Td>Last Name</Td>
                <Td> {userData.loginUser.user.lastName}</Td>
              </Tr>
              <Tr>
                <Td>Email</Td>
                <Td> {userData.loginUser.user.email}</Td>
              </Tr>
            </Tbody>
          </Table>
          <Stack direction="row" spacing={4}>
            <Button
              colorScheme="red"
              variant="solid"
              onClick={handleRemoveUser}
            >
              Delete
            </Button>
            <LogoutBtn />
          </Stack>
        </>
      )}
    </Container>
  );
};

export default Details;
