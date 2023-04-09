import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { Highlitghs } from "@components/Highlights";
import { Input } from "@components/Input";
import { Container, Content, Icon } from "./styles";
import { groupCreate } from "@storage/group/groupCreate";
import { AppError } from "@utils/AppErrors";
import { Alert } from "react-native";

export function NewGroup (){

    const navigator = useNavigation();
    const [groupName, setGroupName] = useState('');

    async function handleCreate() {
        try {
            if(groupName.trim().length === 0) return Alert.alert('Digite o nome do seu grupo')
            await groupCreate(groupName);
            navigator.navigate("players", { group: groupName });
        } catch (error) {
            if(error instanceof AppError) {
                Alert.alert('Novo Grupo', error.message)
            } else {
                Alert.alert('Novo Grupo', 'Não foi possivel criar um novo grupo')
                console.log(error);            
            }
        }
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