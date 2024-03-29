import { useEffect, useState, useCallback } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { GroupCard } from '@components/GroupCard';
import { Header } from '@components/Header';
import { Highlitghs } from '@components/Highlights';

import { Container } from './styles';
import { FlatList } from 'react-native';
import { ListEmpty } from '@components/EmptyList';
import { Button } from '@components/Button';
import { groupsGetAll } from '@storage/group/groupsGetAll';
import { Loading } from '@components/Loading';



export function Groups() {
  const [groups, setGroups] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  
  function handleNewGroup() {
    navigation.navigate('new');
  }

  async function fetchGroups() {
    try {
      setIsLoading(true)

      const data = await groupsGetAll();

      setGroups(data);
    } catch (error) {
      throw(error);
    } finally {
      setIsLoading(false)
    }
  }
  
  function handleOpenGroup(group: string) {
    navigation.navigate('players', {group})
  }

  useFocusEffect ( useCallback(() => {
    fetchGroups();
  }, []));

  return (
    <Container>
      <Header />
      <Highlitghs title='Turmas' subtitle='Jogue com suas turmas'/>
      
     {isLoading ? <Loading/> :  <FlatList
        data={groups}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <GroupCard
          title={item}
          onPress={() => handleOpenGroup(item)}
          />
        )}
        contentContainerStyle={groups.length === 0 && {flex: 1}}
        ListEmptyComponent={() => (
          <ListEmpty 
            message='Que tal cadastrar a primeira turma?'
          />
        )}
        showsVerticalScrollIndicator={false}
      />}
      <Button 
        title='Criar nova turma' 
        onPress={handleNewGroup}
      />
    </Container>
  );
}
