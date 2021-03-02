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

import { Row } from '../../components';

export default function ConsultationRecords({ navigation }) {
  const [consultations, setConsultations] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(true);

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  return (
    <View>
      <Text style={styles.header}>ConsultationRecords</Text>

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
        contentContainerStyle={{ paddingHorizontal: 20 }}
        data={[{ key: 'a' }, { key: 'b' }]}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={{
                borderWidth: 2,
                marginTop: 16,
                paddingHorizontal: 16,
                paddingVertical: 8,
              }}
              onPress={() => navigation.navigate('ConsultationDetail')}
            >
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ width: 100 }}>Doctor:</Text>
                <Text>Name</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ width: 100 }}>Patient:</Text>
                <Text>Name</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ width: 100 }}>Date Time:</Text>
                <Text>03 Mar 01:39</Text>
              </View>
            </TouchableOpacity>
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
