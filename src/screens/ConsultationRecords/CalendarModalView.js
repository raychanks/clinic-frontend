import React from 'react';
import { StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';

export default function CalendarModalView({
  isOpen,
  current,
  onClose,
  onDayPress,
}) {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={isOpen}
      onDismiss={onClose}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={{ backgroundColor: '#0005', flex: 1 }}
        activeOpacity={1}
        onPress={onClose}
      >
        <TouchableOpacity activeOpacity={1}>
          <Calendar
            current={current}
            markedDates={{
              [current]: {
                selected: true,
                selectedColor: 'steelblue',
              },
            }}
            onDayPress={onDayPress}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({});
