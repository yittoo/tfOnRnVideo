/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import * as mobilenet from '@tensorflow-models/mobilenet';
import {fetch, decodeJpeg} from '@tensorflow/tfjs-react-native';
import '@tensorflow/tfjs-react-native';
import * as tf from '@tensorflow/tfjs';
import {Constants} from 'react-native-unimodules';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const fetchData = async (setState) => {
  // Load mobilenet.
  await tf.ready();

  console.log('tf ready');
  const model = await mobilenet.load();
  console.log(model);
  // Get a reference to the bundled asset and convert it to a tensor
  const image = require('./src/assets/images/cat_1.jpg');
  console.log(image);
  const imageAssetPath = Image.resolveAssetSource(image);
  console.log(imageAssetPath);
  const response = await fetch(imageAssetPath.uri, {}, {isBinary: true});
  const imageData = await response.arrayBuffer();
  console.log(imageData);

  const imageTensor = decodeJpeg(imageData);

  const prediction = await model.classify(imageTensor);

  // Use prediction in app.
  console.log('prediction on fetchData', prediction);
  setState(prediction);
};

const App = () => {
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    console.log('use effect running');
    fetchData(setPrediction);
  }, []);

  let content = prediction ? (
    <Text>Predicted</Text>
  ) : (
    <Text>Not Predicted</Text>
  );

  return <View>{content}</View>;
};

// export class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isTfReady: false,
//     };
//   }

//   async componentDidMount() {
//     // Wait for tf to be ready.
//     await tf.ready();
//     // Signal to the app that tensorflow.js can now be used.
//     this.setState({
//       isTfReady: true,
//     });
//   }

//   render() {
//     return (
//       <View>
//         {this.state.isTfReady ? <Text>Ready</Text> : <Text>Not ready</Text>}
//       </View>
//     );
//   }
// }

// const App = () => {
//   console.log('testing', Constants.systemFonts);

//   return (
//     <>
//       <StatusBar barStyle="dark-content" />
//       <SafeAreaView>
//         <ScrollView
//           contentInsetAdjustmentBehavior="automatic"
//           style={styles.scrollView}>
//           <Header />
//           {global.HermesInternal == null ? null : (
//             <View style={styles.engine}>
//               <Text style={styles.footer}>Engine: Hermes</Text>
//             </View>
//           )}
//           <View style={styles.body}>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Step One</Text>
//               <Text style={styles.sectionDescription}>
//                 Edit <Text style={styles.highlight}>App.js</Text> to change this
//                 screen and then come back to see your edits.
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>See Your Changes</Text>
//               <Text style={styles.sectionDescription}>
//                 <ReloadInstructions />
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Debug</Text>
//               <Text style={styles.sectionDescription}>
//                 <DebugInstructions />
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Learn More</Text>
//               <Text style={styles.sectionDescription}>
//                 Read the docs to discover what to do next:
//               </Text>
//             </View>
//             <LearnMoreLinks />
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   scrollView: {
//     backgroundColor: Colors.lighter,
//   },
//   engine: {
//     position: 'absolute',
//     right: 0,
//   },
//   body: {
//     backgroundColor: Colors.white,
//   },
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//     color: Colors.black,
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//     color: Colors.dark,
//   },
//   highlight: {
//     fontWeight: '700',
//   },
//   footer: {
//     color: Colors.dark,
//     fontSize: 12,
//     fontWeight: '600',
//     padding: 4,
//     paddingRight: 12,
//     textAlign: 'right',
//   },
// });

export default App;
