import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function Welcome() {
  return (
    <View style={styles.container}>
      <View style={styles.containerImage}>
        <Image
          source={require('../assets/avatar.webp')}
          style={styles.avatar}
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Tarefas Escolares</Text>
        <Text style={styles.text}>
          Monte sua lista de tarefas e não tenha mais desculpas para fazê-las!!!
        </Text>
        <Link style={styles.button} href={"/home"}>
          <Text style={styles.buttonText}>Acessar</Text>
        </Link>
      </View>
      <StatusBar style="light" backgroundColor='#000' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#226b0e',
  },
  containerImage: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 230,
    height: 230,
    resizeMode: 'cover',
    borderRadius: 115,
  },
  content: {
    flex: 1,
    backgroundColor: '#84d16f',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: '5%',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 28,
    marginBottom: 20,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center'
  },
  button: {
    position: 'absolute',
    backgroundColor: '#000',
    bottom: '10%',
    alignSelf: 'center',
    borderRadius: 50,
    paddingVertical: 15,
    width: '60%',
    textAlign: 'center',
  },
  buttonText: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold'
  }
});