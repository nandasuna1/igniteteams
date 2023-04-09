import { useEffect, useRef, useState } from 'react'
import { Filter } from '@components/Filter'
import { PlayerCard } from '@components/PlayerCard'
import { ButtonIcon } from '@components/ButtonIcon'
import { ListEmpty } from '@components/EmptyList'
import { Header } from '@components/Header'
import { Highlitghs } from '@components/Highlights'
import { Input } from '@components/Input'
import { Alert, FlatList, TextInput } from 'react-native'
import { Container, Form, HeaderList, NumberOfPlayers } from './styles'
import { Button } from '@components/Button'
import { useRoute, useNavigation } from '@react-navigation/native'
import { AppError } from '@utils/AppErrors'
import { playeraddByGroup } from '@storage/player/playerAddByGroup'
import { playersGetByGroup } from '@storage/player/playersGetByGroup'
import { playersGetByGroupAndTeam } from '@storage/player/playerGetByGroupAndTeam'
import { PlayerStorageDTO } from '@storage/player/PlayerStorageDTO'
import { playerRemoveByGroup } from '@storage/player/playerRemoveByGroup'
import { groupRemoveByName } from '@storage/group/groupRemoveByName'

type RouteParams = {
    group: string;
}
export function Players() {
    const [team, setTeam] = useState('Time A');
    const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
    const [newPlayerName, setNewPlayerName] = useState('');

    const route = useRoute();
    const navigation = useNavigation()
    const { group } = route.params as RouteParams;

    const newPlayerNameInputRef = useRef<TextInput>(null)


    async function addTeamPlayer() {
        if(newPlayerName.trim().length === 0) {
            return Alert.alert('Nova pessoa', 'Informe um nome válido')
        }

        const newPlayer = {
            name: newPlayerName,
            team
        }        

        try {
            await playeraddByGroup(newPlayer, group);

            newPlayerNameInputRef.current?.blur();

            setNewPlayerName('')
            fetchPlayersByTeam();
            
        } catch(error) {
            if(error instanceof AppError) {
                Alert.alert('Nova Pessoa', error.message);
            }else {
                console.log(error);
                Alert.alert('Nova Pessoa', 'Não foi possivel adicionar o jogador');
            }
        }

    }

    async function fetchPlayersByTeam() {
        try{
            const playersByTeam = await playersGetByGroupAndTeam(group, team);
            setPlayers(playersByTeam);
        } catch (error) {
            console.log(error);
            Alert.alert('Pessoas', 'Não foi possivel carregar o time')
        }
    }

    async function handlePlayerRemove(playerName: string) {
        try {
            await playerRemoveByGroup(playerName, group)
            fetchPlayersByTeam();
        } catch(err) {
            Alert.alert('Remover pessoa', 'não foi possivel remover o jogador')
        }
    }

    async function groupRemove() {
        try{
            await groupRemoveByName(group)

            navigation.navigate('groups');
        } catch(err) {
            Alert.alert('Remover pessoa', 'não foi possivel remover o grupo')
        }
    }

    async function handleGroupRemove() {
        Alert.alert(
            'Remover',
            'Deseja remover o grupo',
            [
                {text: 'Não', style: 'cancel'},
                {text: 'Sim', onPress: () => groupRemove()}
            ]
        )
    }

    useEffect(() => {
        fetchPlayersByTeam();
    }, [team])

    return(
        <Container>
            <Header showBackButton />
            <Highlitghs 
                title={group}
                subtitle='adicione a galera e separe os times'
            />

             <Form>
                <Input
                    inputRef={newPlayerNameInputRef}
                    placeholder='Nome da pessoa'
                    value={newPlayerName}
                    autoCorrect={false}
                    onChangeText={setNewPlayerName}
                    onSubmitEditing={addTeamPlayer}
                    returnKeyType='done'
                />
                <ButtonIcon icon='add' onPress={addTeamPlayer}/>
            </Form>

            <HeaderList>
            <FlatList 
                data={['Time A', 'Time B']}
                keyExtractor={item=>item}
                renderItem={({item}) => (
                    <Filter 
                        title={item}
                        isActive={item === team}
                        onPress={() => setTeam(item)}
                    />
                )}
                horizontal
            />
            <NumberOfPlayers>
                {players.length}
            </NumberOfPlayers>
            </HeaderList>

            <FlatList
                data={players}
                keyExtractor={item => item.name}
                renderItem={({item}) => (
                    <PlayerCard 
                        name={item.name}
                        onRemove={() => handlePlayerRemove(item.name)}
                    />
                )}
                ListEmptyComponent={() => (
                    <ListEmpty
                        message='Não há pessoas nesse time'
                    />
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[
                    {paddingBottom: 100 },
                    players.length === 0 && {flex: 1}
                ]}
            />

            <Button title='Remover Turma' type='SECCONDARY' onPress={handleGroupRemove}/>

            
        </Container>
    )
}