import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
      await knex.schema.createTable("mini_games", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.enu("type", ["quiz", "speed_date", "other"]);
    table.text("rules");
  });
}


export async function down(knex: Knex): Promise<void> {
      await knex.schema.dropTableIfExists("mini_games");
}

