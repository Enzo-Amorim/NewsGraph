import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import styled from 'styled-components/native';

const Card = styled.View`
  width: 74%;
  max-height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px;
  margin: 1.5% 2%;

  background: #242635;
  border-radius: 20px;
`;
const CardImage = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 100px;
`;

const CardTitle = styled.Text`
  flex: 1;
  font-family: 'Poppins-Regular';
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;

  color: #dfdfdf;
  margin-left: 2%;
`;

export default function NewsCard({imageUri, title, url, index, navigation}) {
  function newsDetail() {
    navigation.navigate('NewDetail', {url});
  }

  if (index % 2 === 0) {
    return (
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}>
        <TouchableWithoutFeedback onPress={() => newsDetail()}>
          <Card>
            <CardTitle>{title}</CardTitle>
            <CardImage
              source={{
                uri: imageUri,
              }}
            />
          </Card>
        </TouchableWithoutFeedback>
      </View>
    );
  } else {
    return (
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
        }}>
        <TouchableWithoutFeedback onPress={() => newsDetail()}>
          <Card>
            <CardImage
              source={{
                uri: imageUri,
              }}
            />
            <CardTitle>{title}</CardTitle>
          </Card>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}
