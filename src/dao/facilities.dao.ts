import { OkPacket } from "mysql";
import { execute } from '../services/mysql.connector';
import { Facility } from '../models/facilities.model';
import { facilityQueries } from './queries/facilities.queries';

export const readFacilities = async () => {
    return execute<Facility[]>(facilityQueries.readFacilities, []);
};

export const readFacilitiesByName = async (name: string) => {
    return execute<Facility[]>(facilityQueries.readFacilitiesByName, [name]);
};

export const readFacilitiesByNameSearch = async (search: string) => {
    console.log('search param', search);
    return execute<Facility[]>(facilityQueries.readFacilitiesByNameSearch, [search]);
};

export const readFacilitiesByFacilityId = async (facilityId: number) => {
    return execute<Facility[]>(facilityQueries.readFacilitiesByFacilityId, [facilityId]);
};

export const createFacility = async (facility: Facility) => {
    return execute<OkPacket>(facilityQueries.createFacility,
        [facility.facilityName, facility.address1, facility.address2, facility.city, facility.state, facility.postal, 
            facility.contactNumber, facility.email]);  
};

export const updateFacility = async (facility: Facility) => {
    return execute<OkPacket>(facilityQueries.updateFacility,
        [facility.facilityName, facility.address1, facility.address2, facility.city, facility.state, facility.postal, 
            facility.contactNumber, facility.email, facility.facilityId]);
};

export const deleteFacility = async (facilityId: number) => {
    return execute<OkPacket>(facilityQueries.deleteFacility, [facilityId]);
};

export const readFacilitiesByUserId = async (userId: number): Promise<Facility[]> => {
    return execute<Facility[]>(facilityQueries.readFacilitiesByUserId, [userId]);
};

export const checkFacilitiesExist = async (facilityIds: number[]) => {
    const results = await execute<Facility[]>(facilityQueries.checkFacilitiesExist, [facilityIds]);
    return results.map(facility => facility.facilityId);
};
