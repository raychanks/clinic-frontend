import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';

import { FlexCenterSpinner } from '../../components';
import ConsultationCard from './ConsultationCard';

export default function RecordList({ isLoading, data, hasNext, onEndReached }) {
  const navigation = useNavigation();

  if (isLoading) {
    return <FlexCenterSpinner />;
  }

  return (
    <FlatList
      style={{ marginVertical: 16 }}
      contentContainerStyle={{ paddingHorizontal: 20 }}
      data={data}
      ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
      ListEmptyComponent={() => <Text>No Records</Text>}
      ListFooterComponent={() =>
        hasNext && <ActivityIndicator size="large" color="steelblue" />
      }
      onEndReached={onEndReached}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => {
        return (
          <ConsultationCard
            doctorName={item.doctorName}
            patientName={item.patientName}
            dateTime={moment(item.consultedAt).format('hh:mm a - DD MMM YYYY')}
            onPress={() =>
              navigation.navigate('ConsultationDetail', {
                id: item.id,
              })
            }
          />
        );
      }}
    />
  );
}

const styles = StyleSheet.create({});
