import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Formik } from 'formik';

import { FormikInput, Button, KeyboardAvoidingView } from '../../components';
import { AuthAPI } from '../../api';

export default function Login({ navigation }) {
  const [apiError, setApiError] = useState('');

  const handleFormikSubmit = async values => {
    try {
      const { data } = await AuthAPI.login(values.email, values.password);
      navigation.navigate('ConsultationRecords');
      console.log({ token: data.token });
      // TODO: setToken
    } catch (err) {
      setApiError(err?.response?.data?.message);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Text>Login</Text>

      <KeyboardAvoidingView>
        <ScrollView style={{ flex: 1, borderWidth: 2 }}>
          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={handleFormikSubmit}
          >
            {props => {
              const { handleSubmit, isSubmitting } = props;

              return (
                <View style={{ flex: 1, paddingHorizontal: 20 }}>
                  <FormikInput
                    style={styles.input}
                    label="Email"
                    name="email"
                    keyboardType="email-address"
                    formikProps={props}
                  />
                  <FormikInput
                    style={styles.input}
                    label="Password"
                    name="password"
                    formikProps={props}
                    secureTextEntry
                  />

                  <View>
                    <Button
                      text="LOGIN"
                      disabled={isSubmitting}
                      onPress={handleSubmit}
                    />
                    {apiError ? (
                      <Text style={{ color: 'crimson' }}>{apiError}</Text>
                    ) : null}
                  </View>
                </View>
              );
            }}
          </Formik>

          <TouchableOpacity
            style={{
              margin: 20,
              paddingVertical: 12,
              alignItems: 'center',
            }}
            onPress={() => navigation.navigate('Register')}
          >
            <Text
              style={{ textDecorationLine: 'underline', color: '#333' }}
            >{`Don't have an account yet?`}</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 20,
  },
});
