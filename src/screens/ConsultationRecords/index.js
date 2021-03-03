import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import moment from 'moment';

import { DAILY, WEEKLY, MONTHLY } from '../../shared/constants';
import { ConsultationAPI } from '../../api';
import { Row } from '../../components';
import CalendarModalView from './CalendarModalView';
import TimeFramePicker from './TimeFramePicker';
import DateTimeButton from './DateTimeButton';
import RecordList from './RecordList';

const DATE_TIME_FORMAT = 'DD MMM YY';

export default function ConsultationRecords() {
  const [consultations, setConsultations] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedTimeFrame, setSelectedTimeFrame] = useState(DAILY);
  const [selectedDateTime, setSelectedDateTime] = useState(moment());

  const getDateTimeDisplay = () => {
    if (selectedTimeFrame === DAILY) {
      return moment(selectedDateTime).format(DATE_TIME_FORMAT);
    }

    if (selectedTimeFrame === WEEKLY) {
      const weekSunday = moment(selectedDateTime)
        .isoWeekday(0)
        .format(DATE_TIME_FORMAT);
      const weekSaturday = moment(selectedDateTime)
        .isoWeekday(6)
        .format(DATE_TIME_FORMAT);

      return `${weekSunday} - ${weekSaturday}`;
    }

    if (selectedTimeFrame === MONTHLY) {
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

    if (timeframe === WEEKLY) {
      from = moment(dateTime).isoWeekday(0).toISOString();
      to = moment(dateTime).isoWeekday(6).add(1, 'day').toISOString();
    } else if (timeframe === MONTHLY) {
      from = moment(dateTime).startOf('month').toISOString();
      to = moment(dateTime).endOf('month').add(1, 'day').toISOString();
    }

    return { from, to };
  };

  const toggleCalendar = () => {
    setIsCalendarOpen(isOpen => !isOpen);
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
        <TimeFramePicker
          value={selectedTimeFrame}
          onValueChange={handlePickerValueChange}
        />

        <DateTimeButton text={getDateTimeDisplay()} onPress={toggleCalendar} />
      </Row>

      <RecordList
        isLoading={isLoading}
        data={consultations}
        hasNext={hasNext}
        onEndReached={handleEndReached}
      />

      <CalendarModalView
        isOpen={isCalendarOpen}
        current={moment(selectedDateTime).format('YYYY-MM-DD')}
        onClose={() => setIsCalendarOpen(false)}
        onDayPress={day => {
          setSelectedDateTime(moment(day.timestamp));
          setIsCalendarOpen(false);
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
