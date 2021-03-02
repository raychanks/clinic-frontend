import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Formik } from 'formik';

import { FormikInput, Button } from '../../components';

export default function Login({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <Text>Login</Text>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
      >
        <ScrollView style={{ flex: 1, borderWidth: 2 }}>
          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={async (values, actions) => {
              return new Promise(resolve => {
                console.log(values);
                setTimeout(resolve, 5000);
              });
            }}
          >
            {props => {
              const { handleSubmit, isSubmitting } = props;

              return (
                <View style={{ flex: 1 }}>
                  <FormikInput label="Email" name="email" formikProps={props} />
                  <FormikInput
                    label="Password"
                    name="password"
                    formikProps={props}
                    secureTextEntry
                  />

                  <Button
                    style={{ width: '70%', marginLeft: '15%' }}
                    text="LOGIN"
                    disabled={isSubmitting}
                    onPress={handleSubmit}
                  />
                </View>
              );
            }}
          </Formik>

          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text>{`Don't have an account yet?`}</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({});
