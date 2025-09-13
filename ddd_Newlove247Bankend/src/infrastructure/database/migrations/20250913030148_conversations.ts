import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("conversations", (table) => {
        table.increments("id").primary();
        table.enu("type", ["private", "group", "stranger"]).notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
    })
}


export async function down(knex: Knex): Promise<void> {
      await knex.schema.dropTableIfExists("conversations");
}

