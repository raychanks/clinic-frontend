import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import RNPickerSelect from 'react-native-picker-select';
import moment from 'moment';

import { ConsultationAPI } from '../../api';
import { FlexCenterSpinner, Row } from '../../components';
import ConsultationCard from './ConsultationCard';

const DATE_TIME_FORMAT = 'DD MMM YY';

export default function ConsultationRecords({ navigation }) {
  const [consultations, setConsultations] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedTimeFrame, setSelectedTimeFrame] = useState('daily');
  const [selectedDateTime, setSelectedDateTime] = useState(moment());

  const getDateTimeDisplay = () => {
    if (selectedTimeFrame === 'daily') {
      return moment(selectedDateTime).format(DATE_TIME_FORMAT);
    }
    if (selectedTimeFrame === 'weekly') {
      const weekSunday = moment(selectedDateTime)
        .isoWeekday(0)
        .format(DATE_TIME_FORMAT);
      const weekSaturday = moment(selectedDateTime)
        .isoWeekday(6)
        .format(DATE_TIME_FORMAT);

      return `${weekSunday} - ${weekSaturday}`;
    }
    if (selectedTimeFrame === 'monthly') {
      return moment(selectedDateTime).format('MMMM');
    }

    return moment(selectedDateTime).format(DATE_TIME_FORMAT);
  };

  const fetchData = useCallback(async ({ from, to, page } = {}) => {
    try {
      const { data } = await ConsultationAPI.getAll({ from, to, page });

      setConsultations(prev => [...prev, ...data.data]);
      setHasNext(data.totalPages > data.page);
      setPage(data.page + 1);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const getTimeInterval = (timeframe, dateTime) => {
    let from = moment(dateTime).toISOString();
    let to = moment(dateTime).add(1, 'day').toISOString();

    if (timeframe === 'weekly') {
      from = moment(dateTime).isoWeekday(0).toISOString();
      to = moment(dateTime).isoWeekday(6).add(1, 'day').toISOString();
    } else if (timeframe === 'monthly') {
      from = moment(dateTime).startOf('month').toISOString();
      to = moment(dateTime).endOf('month').add(1, 'day').toISOString();
    }

    return { from, to };
  };

  const handlePickerValueChange = value => {
    setSelectedTimeFrame(value);
  };

  const handleEndReached = () => {
    if (!hasNext) {
      return;
    }

    fetchData({
      ...getTimeInterval(selectedTimeFrame, selectedDateTime),
      page,
    });
  };

  useEffect(() => {
    (async () => {
      setConsultations([]);
      setIsLoading(true);
      await fetchData(getTimeInterval(selectedTimeFrame, selectedDateTime));
      setIsLoading(false);
    })();
  }, [fetchData, selectedDateTime, selectedTimeFrame]);

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.header}>Consultation Records</Text>

      <Row style={{ paddingHorizontal: 20, flexGrow: 0 }}>
        <View
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: '#999',
            marginRight: 8,
          }}
        >
          <View style={{ paddingHorizontal: 12 }}>
            <RNPickerSelect
              onValueChange={handlePickerValueChange}
              style={pickerSelectStyles}
              value={selectedTimeFrame}
              placeholder={{}}
              items={[
                { label: 'Daily', value: 'daily' },
                { label: 'Weekly', value: 'weekly' },
                { label: 'Monthly', value: 'monthly' },
              ]}
            />
          </View>
        </View>

        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: '#999',
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
          <Text>{getDateTimeDisplay()}</Text>
        </TouchableOpacity>
      </Row>

      {isLoading ? (
        <FlexCenterSpinner />
      ) : (
        <FlatList
          style={{ marginVertical: 16 }}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          data={consultations}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
          ListEmptyComponent={() => <Text>No Records</Text>}
          ListFooterComponent={() =>
            hasNext && <ActivityIndicator size="large" color="steelblue" />
          }
          onEndReached={handleEndReached}
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
      )}

      <Modal
        animationType="fade"
        transparent
        visible={isCalendarOpen}
        onDismiss={() => {
          setIsCalendarOpen(false);
        }}
        onRequestClose={() => {
          setIsCalendarOpen(false);
        }}
      >
        <TouchableOpacity
          style={{ backgroundColor: '#0005', flex: 1 }}
          activeOpacity={1}
          onPress={() => setIsCalendarOpen(false)}
        >
          <TouchableOpacity activeOpacity={1}>
            <Calendar
              current={moment(selectedDateTime).format('YYYY-MM-DD')}
              markedDates={{
                [moment(selectedDateTime).format('YYYY-MM-DD')]: {
                  selected: true,
                  selectedColor: 'steelblue',
                },
              }}
              onDayPress={day => {
                setSelectedDateTime(moment(day.timestamp));
                setIsCalendarOpen(false);
              }}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
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
    paddingHorizontal: 10,
    paddingVertical: 12,
    color: 'black',
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: 'black',
  },
});
