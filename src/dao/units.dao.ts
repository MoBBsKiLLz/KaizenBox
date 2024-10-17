import { OkPacket } from "mysql";
import { execute } from '../services/mysql.connector';
import { Unit } from '../models/units.model';
import { unitQueries } from './queries/units.queries';

export const readUnits = async () => {
    return execute<Unit[]>(unitQueries.readUnits, []);
};

export const readUnitsByUnitNumber = async (unitnumber: string) => {
    return execute<Unit[]>(unitQueries.readUnitsByUnitNumber, [unitnumber]);
};

export const readUnitsByUnitNumberSearch = async (search: string) => {
    console.log('search param', search);
    return execute<Unit[]>(unitQueries.readUnitsByUnitNumberSearch, [search]);
};

export const readUnitsByUnitId = async (unitId: number) => {
    return execute<Unit[]>(unitQueries.readUnitsByUnitId, [unitId]);
};

export const createUnit = async (unit: Unit) => {
    return execute<OkPacket>(unitQueries.createUnit,
        [unit.facilityId, unit.unitGroupId, unit.unitNumber, unit.width, unit.length, unit.height, unit.availabilityDate]);  
};

export const updateUnit = async (unit: Unit) => {
    return execute<OkPacket>(unitQueries.updateUnit,
        [unit.facilityId, unit.unitGroupId, unit.unitNumber, unit.width, unit.length, unit.height, unit.availabilityDate, unit.unitId]);
};

export const deleteUnit = async (unitId: number) => {
    return execute<OkPacket>(unitQueries.deleteUnit, [unitId]);
};