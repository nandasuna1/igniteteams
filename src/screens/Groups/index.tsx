import { useState } from 'react';
import { GroupCard } from '@components/GroupCard';
import { Header } from '@components/Header';
import { Highlitghs } from '@components/Highlights';

import { Container } from './styles';
import { FlatList } from 'react-native';
import { ListEmpty } from '@components/EmptyList';
import { Button } from '@components/Button';



export function Groups() {
  const [groups, setGroups] = useState([]);


  return (
    <Container>
      <Header />
      <Highlitghs title='Turmas' subtitle='Jogue com suas turmas'/>
      
      <FlatList
        data={groups}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <GroupCard
          title={item}
          />
        )}
        contentContainerStyle={groups.length === 0 && {flex: 1}}
        ListEmptyComponent={() => (
          <ListEmpty 
            message='Que tal cadastrar a primeira turma?'
          />
        )}
      />
      <Button title='Criar nova turma'/>
    </Container>
  );
}
