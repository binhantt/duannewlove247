import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
     await knex.schema.createTable("dating_goals", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.text("description");
  });
}


export async function down(knex: Knex): Promise<void> {
      await knex.schema.dropTableIfExists("dating_goals");
}

