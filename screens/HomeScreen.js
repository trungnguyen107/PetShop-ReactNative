// INI CONTOH GIT DALAM MANAJEMEN FILE YANG DIUBAH
// HALOOOOO DUNIA
// TEST TEST TEST

import React, { Component } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  FlatList,
  AsyncStorage
} from "react-native";

import { Col, Row, Grid } from "react-native-easy-grid";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Body,
  Icon,
  Left,
  Right,
  Title,
  Button,
  Item,
  Input,
  Thumbnail
} from "native-base";

import { Dimensions } from "react-native";
const DeviceWidth = Dimensions.get("window").width;

import { MonoText } from "../components/StyledText";
import Swiper from 'react-native-swiper';

import firebase from "../Firebase";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    //header: null
    headerTitle:
          <Grid>
            <Row>
            <Col style={{width:80, marginTop:18}}><Text> LOGO</Text></Col>
            <Col style={{}}>
              <Item rounded style={{marginTop:9, width:195, height:36}}>
                <Input placeholder='Search'/>
              </Item>
            </Col>
            <Col style={{marginTop:13, width: 50}}>
              <Icon name='cart' />
            </Col>
            </Row>
          </Grid>,
  };
  constructor() {
    super();
    this.state = {
       namaFb: ''
    }


    this.ref = firebase.firestore().collection("boards");
    this.unsubscribe = null;
    this.state = {
      isLoading: true,
      foto: null,
      nama: null,
      boards: []
    };
  }

  onCollectionUpdate = querySnapshot => {
    const boards = [];
    querySnapshot.forEach(doc => {
      const { title, description, author } = doc.data();
      boards.push({
        key: doc.id,
        doc, // DocumentSnapshot
        title,
        description,
        author
      });
    });
    this.setState({
      boards,
      isLoading: false
    });
  };

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        AsyncStorage.getItem('userToken', (error, result) => {
            if (result) {
                fetch(`https://graph.facebook.com/me?access_token=${result}`)
                .then(response => response.json())
                .then((response) => {
                  this.setState({
                    namaFb: `${response.name}`
                  });
                })
                .catch(error => console.log(error));
            }
        });
        this.setState({ foto: user.photoURL, nama: 'awe' });
      }
   });
  }

  componentWillUnmount() {
    this.isCancelled = true;
}

  _renderItem = ({item}) => (
    <Content>
    <Card style={{ flex: 0, margin: 5, backgroundColor: '#ddd', height: "auto"}}>
      <CardItem>
        <Left>
          <Thumbnail source={{uri: 'https://www.barnesandnoble.com/blog/sci-fi-fantasy/wp-content/uploads/sites/4/2017/07/onepiece2.jpg'}} />
          <Body>
            <Text>{item.title}</Text>
            <Text note>bl4ckck</Text>
          </Body>
        </Left>
      </CardItem>
      <CardItem cardBody>
        <Image source={{uri: 'https://www.barnesandnoble.com/blog/sci-fi-fantasy/wp-content/uploads/sites/4/2017/07/onepiece2.jpg'}} style={{height: 200, width: null, flex: 1}}/>
      </CardItem>
      <CardItem>
        <Left>
        <Body>
          <Text note>{item.title}</Text>
        </Body>
        </Left>
      </CardItem>
    </Card>
    </Content>
  );

  _showMoreApp = () => {
    this.props.navigation.navigate('Other');
  };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    firebase.auth().signOut();
    this.props.navigation.navigate('AuthLoading');
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }

    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{height:200}}>
            <Swiper showsButtons={true}>
              <View style={styleSlider.slide1}>
              <Image
                  style={{width: 400, height: 300}}
                  source={{uri: 'https://www.barnesandnoble.com/blog/sci-fi-fantasy/wp-content/uploads/sites/4/2017/07/onepiece2.jpg'}}
              />
              </View>
              <View style={styleSlider.slide2}>
                <Text style={styleSlider.text}>Beautiful</Text>
              </View>
              <View style={styleSlider.slide3}>
                <Text style={styleSlider.text}>And simple</Text>
              </View>
            </Swiper>
        </View>

          <Card
            style={{
              flexDirection: "row",
              flex: 0,
              justifyContent: "center",
              alignItems: "center",
              height: "auto"
            }}
          >
            <View style={{marginTop:20}}>
              <View style={styles.viewIcon}>
                <TouchableOpacity style={styles.menuIcon}>
                  <Icon type="FontAwesome" name="home" size={30} color="#01a699" />
                </TouchableOpacity>
              </View>
              <View style={styles.viewIcon}>
                <TouchableOpacity style={styles.menuIcon}>
                  <Icon type="FontAwesome" name="adjust" size={30} color="#01a699" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{marginTop:20}}>
              <View style={styles.viewIcon}>
                <TouchableOpacity style={styles.menuIcon}>
                  <Icon type="FontAwesome" name="anchor" size={30} color="#01a699" />
                </TouchableOpacity>
              </View>
              <View style={styles.viewIcon}>
                <TouchableOpacity style={styles.menuIcon}>
                  <Icon type="FontAwesome" name="archive" size={30} color="#01a699" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{marginTop:20}}>
              <View style={styles.viewIcon}>
                <TouchableOpacity style={styles.menuIcon}>
                  <Icon type="FontAwesome" name="database" size={30} color="#01a699" />
                </TouchableOpacity>
              </View>
              <View style={styles.viewIcon}>
                <TouchableOpacity style={styles.menuIcon}>
                  <Icon type="FontAwesome" name="home" size={30} color="#01a699" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{marginTop:20}}>
              <View style={styles.viewIcon}>
                <TouchableOpacity style={styles.menuIcon}>
                  <Icon type="FontAwesome" name="home" size={30} color="#01a699" />
                </TouchableOpacity>
              </View>
              <View style={styles.viewIcon}>
                <TouchableOpacity style={styles.menuIcon}>
                  <Icon type="FontAwesome" name="gavel" size={30} color="#01a699" />
                </TouchableOpacity>
              </View>
            </View>
          </Card>

          <View>
            <Button primary onPress={this._signOutAsync}><Text> Actually, sign me out :) </Text></Button>
            <Text>{"\n"}Recommended for you{"\n"}</Text>
            <Text>{this.state.namaFb}</Text>
            <Image style={{ width: 50, height: 50 }} source={{ uri: this.state.foto }} />
          </View>

          <FlatList
            data={this.state.boards}
            renderItem={this._renderItem} //method to render the data in the way you want using styling u need
            horizontal={false}
            numColumns={2}
          />

      </ScrollView>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use
          useful development tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync(
      "https://docs.expo.io/versions/latest/guides/development-mode"
    );
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      "https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes"
    );
  };
}

const styles = StyleSheet.create({
  activity: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center"
  },
  iconColor1: {
    backgroundColor: "red"
  },
  menuIcon: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    borderRadius: 100
  },
  viewIcon: {
    width: DeviceWidth * 0.2,
    height: DeviceWidth * 0.2,
    marginBottom: 10,
    marginLeft: 10
  }
});

const styleSlider = StyleSheet.create({
  wrapper: {
    height: 0,
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  thumb: {
    width: 50,
    height: 50
  }
});
