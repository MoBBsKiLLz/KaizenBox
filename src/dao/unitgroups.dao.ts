import { OkPacket } from "mysql";
import { execute } from '../services/mysql.connector';
import { UnitGroup } from '../models/unitgroups.model';
import { unitGroupQueries } from './queries/unitgroups.queries';

export const readUnitGroups = async () => {
    return execute<UnitGroup[]>(unitGroupQueries.readUnitGroups, []);
};

export const readUnitGroupsByName = async (name: string) => {
    return execute<UnitGroup[]>(unitGroupQueries.readUnitGroupsByName, [name]);
};

export const readUnitGroupsByNameSearch = async (search: string) => {
    console.log('search param', search);
    return execute<UnitGroup[]>(unitGroupQueries.readUnitGroupsByNameSearch, [search]);
};

export const readUnitGroupsByUnitGroupId = async (unitGroupId: number) => {
    return execute<UnitGroup[]>(unitGroupQueries.readUnitGroupsByUnitGroupId, [unitGroupId]);
};

export const createUnitGroup = async (unitGroup: UnitGroup) => {
    return execute<OkPacket>(unitGroupQueries.createUnitGroup,
        [unitGroup.facilityId, unitGroup.unitGroupName, unitGroup.numberOfUnits, unitGroup.totalSize]);  
};

export const updateUnitGroup = async (unitGroup: UnitGroup) => {
    return execute<OkPacket>(unitGroupQueries.updateUnitGroup,
        [unitGroup.facilityId, unitGroup.unitGroupName, unitGroup.numberOfUnits, unitGroup.totalSize, unitGroup.unitGroupId]);
};

export const deleteUnitGroup = async (unitGroupId: number) => {
    return execute<OkPacket>(unitGroupQueries.deleteUnitGroup, [unitGroupId]);
};