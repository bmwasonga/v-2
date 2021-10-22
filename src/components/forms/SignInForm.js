import React, { useState } from 'react';
import {
  chakra,
  Box,
  Flex,
  Button,
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputGroup,
  Stack,
  InputRightElement,
  useToast,
} from '@chakra-ui/react';

import { Link, useHistory } from 'react-router-dom';
import validator from 'validator';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../queries';
import { Loading, Failure } from '../loadingStates';
import { AUTH_TOKEN } from '../../constants';

const SignInForm = () => {
  const history = useHistory();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [login, { data, error, loading }] = useMutation(LOGIN_USER);

  const onSubmit = async (data) => {
    try {
      await login({
        variables: { input: { ...data } },
      });
    } catch (error) {
      console.log('this is the error message ', error);
    }
  };

  if (loading) return <Loading loading={loading} text={'sign in page'} />;
  if (error) return <Failure error={error.message} />;
  if (data) {
    // console.log('my sign in data is', data);
    localStorage.setItem('userData', JSON.stringify(data));

    localStorage.setItem(AUTH_TOKEN, data.loginUser.token);
    history.push('/');
  }

  return (
    <>
      <Flex minH={'100vh'} align={'center'} justify={'center'} bg={'gray.50'}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Welcome!</Heading>
          </Stack>
          <Box
            rounded={'lg'}
            bg={'white'}
            boxShadow={'lg'}
            p={8}
            w={[400, 500]}
          >
            <chakra.form
              onSubmit={handleSubmit(onSubmit)}
              method="POST"
              rounded={[null, 'md']}
              overflow={{ sm: 'hidden' }}
            >
              <Stack px={4} py={5} p={[null, 6]} spacing={6}>
                <FormControl isInvalid={errors.email}>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    id="email"
                    type="email"
                    variant="flushed"
                    p="2"
                    {...register('email', {
                      required: 'Email address is required',
                      validate: (value) => {
                        if (!validator.isEmail(value))
                          return 'Email is invalid';
                      },
                    })}
                  />

                  <FormErrorMessage>
                    {errors.email && errors.email.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.password}>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <InputGroup size="md">
                    <Input
                      id="password"
                      type={show ? 'text' : 'password'}
                      variant="flushed"
                      p="2"
                      {...register('password', {
                        required: 'Password is required',
                        minLength: {
                          value: 4,
                          message: 'Minimum length should be 6',
                        },
                      })}
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleClick}>
                        {show ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.password && errors.password.message}
                  </FormErrorMessage>
                </FormControl>
                <Button w="full" colorScheme="blue" type="submit">
                  Sign up
                </Button>
                <Stack>
                  <Link to="/signup">Don't have a account?</Link>
                </Stack>
              </Stack>
            </chakra.form>
          </Box>
        </Stack>
      </Flex>
    </>
  );
};

export default SignInForm;
