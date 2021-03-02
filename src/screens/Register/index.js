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

export default function Register({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <Text>Register</Text>

      <KeyboardAvoidingView>
        <ScrollView style={{ flex: 1, borderWidth: 2 }}>
          <Formik
            initialValues={{
              email: '',
              password: '',
              passwordRepeat: '',
              name: '',
              phoneNumber: '',
              address: '',
            }}
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
                  <FormikInput
                    style={styles.input}
                    label="Password Repeat"
                    name="passwordRepeat"
                    formikProps={props}
                    secureTextEntry
                  />
                  <FormikInput
                    style={styles.input}
                    label="Clinic Name"
                    name="name"
                    formikProps={props}
                  />
                  <FormikInput
                    style={styles.input}
                    label="Phone Number"
                    name="phoneNumber"
                    keyboardType="phone-pad"
                    formikProps={props}
                  />
                  <FormikInput
                    style={styles.input}
                    label="Address"
                    name="address"
                    formikProps={props}
                  />

                  <Button
                    style={{ width: '70%', marginLeft: '15%' }}
                    text="REGISTER"
                    disabled={isSubmitting}
                    onPress={handleSubmit}
                  />
                </View>
              );
            }}
          </Formik>

          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text>Already have an account?</Text>
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
