import AsyncStorage from "@react-native-async-storage/async-storage";
import { PLAYERS_COLLECTION } from "@storage/storageConfig";
import { AppError } from "@utils/AppErrors";
import { playersGetByGroup } from "./playersGetByGroup";
import { PlayerStorageDTO } from "./PlayerStorageDTO";

export async function playeraddByGroup(newPlayer: PlayerStorageDTO, group: string) {
    try {
        const storedPlayers = await playersGetByGroup(group);

        const playerAlreadyExists = storedPlayers.filter(player => player.name === newPlayer.name)

        console.log('playerAlreadyExists', playerAlreadyExists);
        
        
        if(playerAlreadyExists.length > 0) throw new AppError('Esse username já foi cadastrado aqui');
        
        const storage = JSON.stringify([...storedPlayers, newPlayer]);

        await AsyncStorage.setItem(`${PLAYERS_COLLECTION}-${group}`, storage);

    } catch(error) {
        throw(error);
    }
}