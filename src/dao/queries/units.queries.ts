export const unitQueries = {
    readUnits: `
        SELECT
            unit_id AS unit_id, facility_id as facility_id, unit_group_id AS unit_group_id, unit_number AS unit_number, 
            width AS width, length AS length, height AS height, available_date AS available_date, created_at AS created_at, 
            updated_at AS updated_at
        FROM kaizenbox.units
    `,
    readUnitsByUnitNumber: `
        SELECT
            unit_id AS unit_id, facility_id as facility_id, unit_group_id AS unit_group_id, unit_number AS unit_number, 
            width AS width, length AS length, height AS height, available_date AS available_date, created_at AS created_at, 
            updated_at AS updated_at
        FROM kaizenbox.units
        WHERE kaizenbox.units.unit_number = ?
    `,
    readUnitsByUnitNumberSearch: `
        SELECT
            unit_id AS unit_id, facility_id as facility_id, unit_group_id AS unit_group_id, unit_number AS unit_number, 
            width AS width, length AS length, height AS height, available_date AS available_date, created_at AS created_at, 
            updated_at AS updated_at
        FROM kaizenbox.units
        WHERE kaizenbox.units.unit_number LIKE ?
    `,
    readUnitsByUnitId: `
        SELECT
            unit_id AS unit_id, facility_id as facility_id, unit_group_id AS unit_group_id, unit_number AS unit_number, 
            width AS width, length AS length, height AS height, available_date AS available_date, created_at AS created_at, 
            updated_at AS updated_at
        FROM kaizenbox.units
        WHERE kaizenbox.units.unit_id LIKE ?
    `,
    createUnit: `
        INSERT INTO units(facility_id, unit_group_id, unit_number, width, length, height, available_date) 
            VALUES(?,?,?,?,?,?,?)
    `,
    updateUnit: `
        UPDATE kaizenbox.units
        SET facility_id = ?, unit_group_id = ?, unit_number = ?, width = ?, length = ?, height = ?, available_date = ?
        WHERE unit_id = ?
    `,
    deleteUnit: `
        DELETE FROM kaizenbox.units
        WHERE unit_id = ?
    `
}