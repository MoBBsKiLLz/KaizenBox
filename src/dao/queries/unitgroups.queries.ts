export const unitGroupQueries = {
    readUnitGroups: `
        SELECT
            unit_group_id AS unit_group_id, facility_id as facility_id, group_name AS group_name, number_of_units AS number_of_units, 
            total_size AS total_size, created_at AS created_at, updated_at AS updated_at
        FROM kaizenbox.unit_groups
    `,
    readUnitGroupsByName: `
        SELECT
            unit_group_id AS unit_group_id, facility_id as facility_id, group_name AS group_name, number_of_units AS number_of_units, 
            total_size AS total_size, created_at AS created_at, updated_at AS updated_at
        FROM kaizenbox.unit_groups
        WHERE kaizenbox.unit_groups.group_name = ?
    `,
    readUnitGroupsByNameSearch: `
        SELECT
            unit_group_id AS unit_group_id, facility_id as facility_id, group_name AS group_name, number_of_units AS number_of_units, 
            total_size AS total_size, created_at AS created_at, updated_at AS updated_at
        FROM kaizenbox.unit_groups
        WHERE kaizenbox.unit_groups.group_name LIKE ?
    `,
    readUnitGroupsByUnitGroupId: `
        SELECT
            unit_group_id AS unit_group_id, facility_id as facility_id, group_name AS group_name, number_of_units AS number_of_units, 
            total_size AS total_size, created_at AS created_at, updated_at AS updated_at
        FROM kaizenbox.unit_groups
        WHERE kaizenbox.unit_groups.unit_group_id LIKE ?
    `,
    createUnitGroup: `
        INSERT INTO unit_groups(facility_id, group_name, number_of_units, total_size) 
            VALUES(?,?,?,?)
    `,
    updateUnitGroup: `
        UPDATE kaizenbox.unit_groups
        SET facility_id = ?, group_name = ?, number_of_units = ?, total_size = ?
        WHERE unit_group_id = ?
    `,
    deleteUnitGroup: `
        DELETE FROM kaizenbox.unit_groups
        WHERE unit_group_id = ?
    `
}