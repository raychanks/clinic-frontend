import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import RNPickerSelect from 'react-native-picker-select';
import moment from 'moment';

import { ConsultationAPI } from '../../api';
import { Row } from '../../components';
import ConsultationCard from './ConsultationCard';

export default function ConsultationRecords({ navigation }) {
  const [consultations, setConsultations] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(true);

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await ConsultationAPI.getAll();

        setConsultations(data.data);
        setHasNext(data.totalPages > page);
        setPage(prev => prev + 1);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.header}>Consultation Records</Text>

      <Row style={{ paddingHorizontal: 20 }}>
        <View style={{ flex: 1, borderWidth: 1, marginRight: 8 }}>
          <RNPickerSelect
            onValueChange={value => console.log(value)}
            style={pickerSelectStyles}
            items={[
              { label: 'Football', value: 'football' },
              { label: 'Baseball', value: 'baseball' },
              { label: 'Hockey', value: 'hockey' },
            ]}
          />
        </View>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            flex: 1,
            marginLeft: 8,
            alignSelf: 'stretch',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            setIsCalendarOpen(isOpen => !isOpen);
          }}
        >
          <Text>January</Text>
        </TouchableOpacity>
      </Row>

      {isCalendarOpen && <Calendar />}

      <FlatList
        style={{ marginVertical: 16 }}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        data={consultations}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <ConsultationCard
              doctorName={item.doctorName}
              patientName={item.patientName}
              dateTime={moment(item.consultedAt).format(
                'hh:mm a - DD MMM YYYY',
              )}
              onPress={() =>
                navigation.navigate('ConsultationDetail', {
                  id: item.id,
                })
              }
            />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 32,
    color: '#333',
    margin: 20,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    color: 'black',
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: 'black',
  },
});
