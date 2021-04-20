import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  Alert,
  Pressable,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useQuery, gql} from '@apollo/client';
import styled from 'styled-components/native';

import NewsCard from '../components/NewsCard';
import CapitalizeFirstLetter from '../utils/capitalizeFirstLetter';

const categories = [
  'business',
  'entertainment',
  'general',
  'health',
  'science',
  'sports',
  'technology',
];
const countries = [
  {
    country: 'us',
    path: require('../assets/images/us.jpg'),
  },
  {
    country: 'br',
    path: require('../assets/images/br.jpg'),
  },
  {
    country: 'pt',
    path: require('../assets/images/pt.jpg'),
  },
  {
    country: 'fr',
    path: require('../assets/images/fr.png'),
  },
  {
    country: 'gb',
    path: require('../assets/images/uk.jpg'),
  },
];

const HomeView = styled.View`
  background-color: #13141c;
  width: 100%;
  flex: 1;
  padding: 4% 0px 0px;
  align-items: center;
  display: flex;
  flex-direction: column;
`;
const HeaderView = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0% 45px;
  margin-top: 20px;
`;
const NewsCategory = styled.Text`
  font-family: 'Poppins-Regular';
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 36px;

  color: #ffffff;
`;

const NewsCountry = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 100px;
  margin: 10px;
`;

const HotNew = styled.View`
  width: 85%;
  display: flex;
  flex-direction: column;
  background: #c31331;
  border-radius: 20px;
  margin-top: 4%;
`;

const HotFirst = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
`;
const HotNewsImage = styled.Image`
  width: 120px;
  min-height: 120px;
  max-height: 120px;
  height: auto;
  margin-left: 5px;
  margin-top: 5px;
  border-radius: 20px;
`;

const HotNewsTitle = styled.Text`
  flex: 1;
  align-self: center;
  font-family: 'Poppins-SemiBold';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  color: #ffffff;
  margin-left: 5px;
  margin-right: 5px;
`;

const HotSecond = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
`;

const HotNewDescription = styled.Text`
  font-family: 'Poppins-Light';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;

  color: #ffffff;

  margin: 5px;
`;

const HotNewDate = styled.Text`
  font-family: 'Poppins-Regular';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;

  color: #ffffff;

  margin-left: 10px;
`;

const LastNews = styled.View`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 5%;
`;

const LastNewsTitle = styled.Text`
  left: 5%;
  font-family: 'Poppins-SemiBold';
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 36px;

  color: #ffffff;
`;

const CategoryView = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: rgba(196, 196, 196, 0.3);
`;

const CategoryModalView = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 24px;
  background: #2b2c39;

  border-radius: 20px;
`;

const CategoryModalText = styled.Text`
  font-family: 'Poppins-SemiBold';
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 27px;
  margin: 10px;

  color: #ffffff;
`;

const CountryView = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: rgba(196, 196, 196, 0.3);
`;

const CountryModalView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 20px 24px;
  background: #2b2c39;

  border-radius: 20px;
`;

const CountryModalImage = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 100px;
  margin: 10px;
`;

const GET_NEWS = gql`
  query Articles($category: String!, $country: String!) {
    articles(category: $category, country: $country) {
      title
      urlToImage
      description
      publishedAt
      url
    }
  }
`;

const GET_NEWS_TEST = gql`
  query {
    articles(category: "business", country: "br") {
      title
      urlToImage
      description
      publishedAt
      url
    }
  }
`;

export default function NewsPage({navigation}) {
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [countryModalVisible, setCountryModalVisible] = useState(false);
  const [category, setCategory] = useState('');
  const [country, setCountry] = useState('');

  const {loading, error, data} = useQuery(GET_NEWS, {
    variables: {
      category,
      country,
    },
  });

  useEffect(() => {
    async function checkCategoryCountry() {
      const categoryData = await AsyncStorage.getItem('@category');
      const countryData = await AsyncStorage.getItem('@country');
      if (categoryData === null) {
        setCategory('technology');
        await AsyncStorage.setItem('@category', 'technology');
      } else {
        setCategory(categoryData);
      }

      if (countryData === null) {
        setCountry('br');
        await AsyncStorage.setItem('@country', 'br');
      } else {
        setCountry(countryData);
      }
    }
    async function resetAll() {
      setCategory('business');
      AsyncStorage.setItem('@category', 'business');
      setCountry('br');
      AsyncStorage.setItem('@country', 'br');
    }
    checkCategoryCountry();
  }, []);

  if (loading)
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#13141C',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{color: '#FFF', fontSize: 36, fontFamily: 'Poppins-SemiBold'}}>
          Carregando...
        </Text>
      </View>
    );
  if (error)
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#13141C',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{color: '#FFF', fontSize: 36, fontFamily: 'Poppins-SemiBold'}}>
          Erro :(
        </Text>
        <Text
          style={{color: '#FFF', fontSize: 36, fontFamily: 'Poppins-SemiBold'}}>
          {error.message}
        </Text>
      </View>
    );

  async function changeCategory(data) {
    setCategory(data);
    await AsyncStorage.setItem('@category', data);
    setCategoryModalVisible(!categoryModalVisible);
  }

  async function changeCountry(data) {
    setCountry(data);
    await AsyncStorage.setItem('@country', data);
    setCountryModalVisible(!countryModalVisible);
  }

  function newsDetail() {
    navigation.navigate('NewDetail', {url: data.articles[0].url});
  }

  var icon;

  if (country === 'br') {
    icon = require('../assets/images/br.jpg');
  }
  if (country === 'us') {
    icon = require('../assets/images/us.jpg');
  }
  if (country === 'pt') {
    icon = require('../assets/images/pt.jpg');
  }
  if (country === 'fr') {
    icon = require('../assets/images/fr.png');
  }
  if (country === 'gb') {
    icon = require('../assets/images/uk.jpg');
  }

  return (
    <HomeView>
      <HeaderView>
        <TouchableOpacity
          onPress={() => setCategoryModalVisible(!categoryModalVisible)}>
          <NewsCategory>{CapitalizeFirstLetter(category)}</NewsCategory>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setCountryModalVisible(!categoryModalVisible)}>
          <NewsCountry source={icon} />
        </TouchableOpacity>
      </HeaderView>
      <TouchableOpacity onPress={() => newsDetail()}>
        <HotNew>
          <HotFirst>
            <HotNewsImage
              source={{
                uri: data.articles[0].urlToImage,
              }}
            />
            <HotNewsTitle>{data.articles[0].title}</HotNewsTitle>
          </HotFirst>
          <HotSecond>
            <HotNewDescription>
              {data.articles[0].description}
            </HotNewDescription>
            <HotNewDate>{data.articles[0].publishedAt}</HotNewDate>
          </HotSecond>
        </HotNew>
      </TouchableOpacity>
      <LastNews>
        <LastNewsTitle>Ultimas Noticias</LastNewsTitle>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data.articles}
          renderItem={({item, index}) => {
            if (index === 0) {
              return null;
            } else {
              return (
                <NewsCard
                  imageUri={item.urlToImage}
                  title={item.title}
                  url={item.url}
                  index={index}
                  navigation={navigation}
                />
              );
            }
          }}
          keyExtractor={(item) => item.title}
        />
      </LastNews>
      <Modal
        animationType="fade"
        transparent={true}
        visible={categoryModalVisible}>
        <CategoryView
          activeOpacity={0}
          onPress={() => setCategoryModalVisible(!categoryModalVisible)}>
          <CategoryModalView>
            {categories.map((data, index) => (
              <Pressable key={index} onPress={() => changeCategory(data)}>
                <CategoryModalText>{data}</CategoryModalText>
              </Pressable>
            ))}
          </CategoryModalView>
        </CategoryView>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={countryModalVisible}>
        <CountryView
          activeOpacity={0}
          onPress={() => setCountryModalVisible(!countryModalVisible)}>
          <CountryModalView>
            {countries.map((data, index) => (
              <Pressable
                key={index}
                onPress={() => changeCountry(data.country)}>
                <CountryModalImage source={data.path} />
              </Pressable>
            ))}
          </CountryModalView>
        </CountryView>
      </Modal>
    </HomeView>
  );
}
