import { useEffect, useState } from 'react';
import { Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import logoImg from '../../assets/logo-nlw-esports.png'
import { Background } from '../../components/Background';
import { GameCard, GameCardPros } from '../../components/GameCard';
import { Heading } from '../../components/Heading';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native'

export function Home() {
  const [games, setGames] = useState<GameCardPros[]>([])

  useEffect(() => {
    fetch('http://192.168.3.7:3333/games')
      .then(response => response.json())
      .then(data => setGames(data))
  }, [])

  const navigation = useNavigation()
  function handleOpenGame({id,title,bannerUrl}:GameCardPros){
    navigation.navigate('game',{id,title,bannerUrl})
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image
          source={logoImg}
          style={styles.logo}
        />
        <Heading
          title="Encontre seu duo!"
          subTitle="Selecione o game que deseja jogar..."
        />

        <FlatList
          contentContainerStyle={styles.contentList}
          data={games}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <GameCard
              data={item}
              onPress={() => handleOpenGame(item)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />


      </SafeAreaView>
    </Background>
  );
}