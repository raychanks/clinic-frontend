import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import moment from 'moment';

import { ConsultationAPI } from '../../api';
import { FlexCenterSpinner } from '../../components';

export default function ConsultationDetail({ route }) {
  const id = route?.params?.id || 0;

  const [consultation, setConsultation] = useState({});
  const [isFetching, setIsFetching] = useState(true);
  const [hasError, setHasError] = useState(false);

  const sections = [
    { label: 'Doctor Name', content: consultation.doctorName },
    { label: 'Patient Name', content: consultation.patientName },
    { label: 'Diagnosis', content: consultation.diagnosis },
    { label: 'Medication', content: consultation.medication },
    { label: 'Consultation Fee', content: consultation.consultationFee },
    {
      label: 'Date',
      content: moment(consultation.consultedAt).format('DD MMM YYYY'),
    },
    {
      label: 'Time',
      content: moment(consultation.consultedAt).format('hh:mm a'),
    },
    {
      label: 'Has Follow Up Consultation',
      content: consultation.nextConsultationAt ? 'Yes' : 'No',
    },
  ];

  const renderContent = () => {
    if (hasError) {
      return <Text>Something went wrong</Text>;
    }

    if (isFetching) {
      return <FlexCenterSpinner />;
    }

    return (
      <ScrollView style={{ paddingHorizontal: 20 }}>
        {sections.map(section => {
          return (
            <View key={section.label} style={styles.section}>
              <Text style={styles.label}>{section.label}:</Text>
              <Text style={styles.content}>{section.content}</Text>
            </View>
          );
        })}
      </ScrollView>
    );
  };

  useEffect(() => {
    const fetchConsultation = async () => {
      try {
        setIsFetching(true);
        setHasError(false);
        const { data } = await ConsultationAPI.get(id);

        setConsultation(data.data);
        setIsFetching(false);
      } catch (err) {
        console.log(err);
        setConsultation({});
        setIsFetching(false);
        setHasError(true);
      }
    };

    fetchConsultation();
  }, [id]);

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.header}>Consultation Detail</Text>

      {renderContent()}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 32,
    color: '#333',
    margin: 20,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 2,
    color: 'black',
  },
  content: {
    fontSize: 16,
    color: '#333',
  },
});
