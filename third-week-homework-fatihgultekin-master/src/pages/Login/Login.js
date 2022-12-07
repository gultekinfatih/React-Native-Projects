import React from 'react';
import {Alert, Image, View} from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import styles from './Login.styles';
import {Formik} from 'formik';
import usePost from '../../hooks/usePost/usePost';
import Config from 'react-native-config';
import {useDispatch, useSelector} from 'react-redux';
const Login = ({navigation}) => {
  const user = useSelector(state => state.user);
  const {data, loading, error, post} = usePost();

  const dispatch = useDispatch();

  const handleLogin = values => {
    post(Config.API_AUTH_URL + '/login', values);
  };

  if (error) {
    Alert.alert('Shopping', 'Something went wrong');
  }
  if (data) {
    if (data.status === 'Error') {
      Alert.alert('Shopping', 'User not found');
    } else {
      dispatch({type: 'SET_USER', payload: {user: JSON.stringify(user)}});
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.logo_container}>
        <Image
          style={styles.logo}
          source={require('../../assets/shopping_logo.png')}
        />
      </View>
      <Formik
        initialValues={{username: '', password: ''}}
        onSubmit={handleLogin}>
        {({handleChange, handleSubmit, values}) => (
          <View style={styles.body_container}>
            <Input
              placeholder="Enter your username..."
              value={values.username}
              onType={handleChange('username')}
              iconName="account"
            />
            <Input
              placeholder="Enter your password..."
              value={values.password}
              onType={handleChange('password')}
              iconName="key"
              isSecure
            />

            <Button text="LOGIN" onPress={handleSubmit} loading={loading} />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default Login;
