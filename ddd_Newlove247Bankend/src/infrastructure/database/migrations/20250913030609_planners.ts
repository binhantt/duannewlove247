import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
      await knex.schema.createTable("planners", (table) => {
    table.increments("id").primary();
    table.integer("user_id").unsigned().notNullable()
      .references("id").inTable("users").onDelete("CASCADE");
    table.decimal("budget", 10, 2).notNullable();
    table.dateTime("available_at");
    table.enu("seriousness", ["casual", "normal", "serious"]);
    table.text("preference"); // JSON stringify
    table.json("suggested_plan"); // gợi ý AI
  });
}


export async function down(knex: Knex): Promise<void> {
      await knex.schema.dropTableIfExists("planners");
}

