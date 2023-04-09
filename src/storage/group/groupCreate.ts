import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "@storage/storageConfig";
import { AppError } from "@utils/AppErrors";
import { groupsGetAll } from "./groupsGetAll";

export async function groupCreate(newGroupName: string) {
    try {
        const storagedGroups = await groupsGetAll();

        const groupAlreadyExists = storagedGroups.includes(newGroupName)

        if (groupAlreadyExists) {
            throw new AppError('Já existe um grupo com esse nome');
        }

        const stored = JSON.stringify( [...storagedGroups, newGroupName]);

        await AsyncStorage.setItem(GROUP_COLLECTION, stored);

    } catch(error) {
        throw(error);
    }
}