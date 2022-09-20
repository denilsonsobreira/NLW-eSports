import { useEffect,useState } from 'react';
import { TouchableOpacity, View, Image, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Background } from '../../components/Background';
import { useRoute,useNavigation } from '@react-navigation/native'
import { Entypo } from '@expo/vector-icons'
import logoImg from '../../assets/logo-nlw-esports.png'
import { styles } from './styles';
import { GameParams } from '../../@types/navigation';
import { THEME } from '../../theme';
import { Heading } from '../../components/Heading';
import { DuoCard,DuoCardProps } from '../../components/DuoCard';

export function Game() {
    const [duos,setDuos] = useState<DuoCardProps[]>([])
    const route = useRoute()
    const game = route.params as GameParams
    const navigator = useNavigation();
    function handleGoBack(){
        navigator.goBack()
    }

    useEffect(() => {
        fetch(`http://192.168.3.7:3333/games/${game.id}/ads`)
          .then(response => response.json())
          .then(data => setDuos(data))
      }, [])

    return (
        <Background>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleGoBack}>
                        <Entypo
                            name="chevron-thin-left"
                            color={THEME.COLORS.CAPTION_300}
                            size={20}                            
                        />
                    </TouchableOpacity>
                    <Image
                        style={styles.logo}
                        source={logoImg}
                    />
                    <View style={styles.right} />
                </View>

                <Image 
                    style={styles.cover}
                    source={{uri:game.bannerUrl}}
                    resizeMode="cover"
                />

                <Heading
                    title={game.title}
                    subTitle="Conecte-se e comece a jogar!"
                />

                <FlatList 
                    data={duos}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => (
                        <DuoCard 
                            data={item}
                            onConnect={() => {}}
                        />
                    )}
                    horizontal
                    style={styles.containerList}
                    contentContainerStyle={styles.contentList}
                    showsHorizontalScrollIndicator={false}
                />

            </SafeAreaView>
        </Background>
    );
}