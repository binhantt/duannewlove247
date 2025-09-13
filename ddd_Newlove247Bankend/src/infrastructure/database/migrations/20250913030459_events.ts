import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
      await knex.schema.createTable("events", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.text("description");
    table.enu("type", ["speed_dating", "picnic", "workshop", "party"]);
    table.string("location");
    table.dateTime("start_time");
    table.dateTime("end_time");
    table.integer("created_by").unsigned().references("id").inTable("users");
  });

}


export async function down(knex: Knex): Promise<void> {
     await knex.schema.dropTableIfExists("events");
}

