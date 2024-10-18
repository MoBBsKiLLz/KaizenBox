export const facilityQueries = {
    readFacilities: `
        SELECT
            facility_id AS facilityId, facility_name AS facility_name, address_1 AS address_1, address_2 AS address_2, city AS city,
            state AS state, postal AS postal, contact_number AS contact_number, email AS email, created_at AS created_at, 
            updated_at AS updated_at
        FROM kaizenbox.facilities
    `,
    readFacilitiesByName: `
        SELECT
            facility_id AS facilityId, facility_name AS facility_name, address_1 AS address_1, address_2 AS address_2, city AS city,
            state AS state, postal AS postal, contact_number AS contact_number, email AS email, created_at AS created_at, 
            updated_at AS updated_at
        FROM kaizenbox.facilities
        WHERE kaizenbox.facilities.facility_name = ?
    `,
    readFacilitiesByNameSearch: `
        SELECT
            facility_id AS facilityId, facility_name AS facility_name, address_1 AS address_1, address_2 AS address_2, city AS city,
            state AS state, postal AS postal, contact_number AS contact_number, email AS email, created_at AS created_at, 
            updated_at AS updated_at
        FROM kaizenbox.facilities
        WHERE kaizenbox.facilities.facility_name LIKE ?
    `,
    readFacilitiesByFacilityId: `
        SELECT
            facility_id AS facilityId, facility_name AS facility_name, address_1 AS address_1, address_2 AS address_2, city AS city,
            state AS state, postal AS postal, contact_number AS contact_number, email AS email, created_at AS created_at, 
            updated_at AS updated_at
        FROM kaizenbox.facilities
        WHERE kaizenbox.facilities.facility_id LIKE ?
    `,
    createFacility: `
        INSERT INTO facilities(facility_name, address_1, address_2, city, state, postal, contact_number, email) 
            VALUES(?,?,?,?,?,?,?,?)
    `,
    updateFacility: `
        UPDATE kaizenbox.facilities
        SET facility_name = ?, address_1 = ?, address_2 = ?, city = ?, state = ?, postal = ?, contact_number = ?, email = ?
        WHERE facility_id = ?
    `,
    deleteFacility: `
        DELETE FROM kaizenbox.facilities
        WHERE facility_id = ?
    `,
    readFacilitiesByUserId: `
        SELECT
            f.facility_id AS facilityId, f.facility_name AS facility_name, f.address_1 AS address_1, f.address_2 AS address_2, 
            f.city AS city, f.state AS state, f.postal AS postal, f.contact_number AS contact_number, f.email AS email, 
            f.created_at AS created_at, f.updated_at AS updated_at
        FROM kaizenbox.facilities f
        JOIN kaizenbox.user_facilities AS uf ON f.facility_id = uf.facility_id
        WHERE uf.user_id = ?
    `,
    checkFacilitiesExist: `
        SELECT facility_id 
        FROM facilities 
        WHERE facility_id IN (?)
    `
}