import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { Highlitghs } from "@components/Highlights";
import { Input } from "@components/Input";
import { Container, Content, Icon } from "./styles";

export function NewGroup (){

    const navigator = useNavigation();
    const [groupName, setGroupName] = useState('');

    function handleCreate() {
        navigator.navigate("players", { group: groupName })
    }

    return(
        <Container>
            <Header showBackButton/>
            <Content>
                <Icon />
                <Highlitghs 
                    title='Nova Turma'
                    subtitle="Crie a turma para adicionar as pessoas"
                />
                <Input placeholder="Nome da turma" onChangeText={setGroupName}/>
                <Button title="Criar" style={{marginTop: 20}} onPress={handleCreate}/>
            </Content>
        </Container>
    )
}