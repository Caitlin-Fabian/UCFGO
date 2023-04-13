import React from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  Animated,
} from 'react-native';

const FormSelectorBtn = ({ title, backgroundColor, style, onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Animated.View style={[styles.container, style, { backgroundColor }]}>
        <Text style={styles.title}>{title}</Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 70,
    width: '50%',
    backgroundColor: '#ffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: { color: 'white', fontSize: 30 },
});

export default FormSelectorBtn;