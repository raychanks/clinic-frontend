import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Formik } from 'formik';

import { FormikInput, Button, KeyboardAvoidingView } from '../../components';

export default function Login({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <Text>Login</Text>

      <KeyboardAvoidingView>
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
                <View style={{ flex: 1, paddingHorizontal: 15 }}>
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

const styles = StyleSheet.create({
  input: {
    marginBottom: 20,
  },
});
