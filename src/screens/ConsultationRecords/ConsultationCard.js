import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { Row } from '../../components';

export default function ConsultationCard({
  doctorName,
  patientName,
  dateTime,
  onPress,
}) {
  return (
    <TouchableOpacity
      style={{
        borderWidth: 1,
        borderColor: '#999',
        borderRadius: 6,
        paddingHorizontal: 20,
        paddingVertical: 12,
        backgroundColor: '#eee',
      }}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <Row style={{ marginVertical: 2 }}>
        <Text style={styles.label}>Doctor:</Text>
        <Text style={styles.text}>{doctorName}</Text>
      </Row>
      <Row style={{ marginVertical: 2 }}>
        <Text style={styles.label}>Patient:</Text>
        <Text style={styles.text}>{patientName}</Text>
      </Row>
      <Row style={{ marginVertical: 2 }}>
        <Text style={styles.label}>Date Time:</Text>
        <Text style={styles.text}>{dateTime}</Text>
      </Row>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  label: {
    width: 100,
    fontWeight: 'bold',
    color: '#333',
  },
  text: {
    color: '#333',
  },
});
