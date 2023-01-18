import { GroupCard } from '@components/GroupCard';
import { Header } from '@components/Header';
import { Highlitghs } from '@components/Highlights';

import { Container } from './styles';



export function Groups() {
  return (
    <Container>
      <Header />
      <Highlitghs title='Turmas' subtitle='Jogue com suas turmas'/>

      <GroupCard title='Galera do Ignite'/>
    </Container>
  );
}
