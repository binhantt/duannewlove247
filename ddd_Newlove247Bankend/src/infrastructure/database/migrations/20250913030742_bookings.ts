import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("bookings", (table) => {
    table.increments("id").primary();
    table.integer("user_id").unsigned().notNullable()
      .references("id").inTable("users").onDelete("CASCADE");
    table.integer("venue_id").unsigned().notNullable()
      .references("id").inTable("venues").onDelete("CASCADE");
    table.dateTime("booking_time").notNullable();
    table.enu("status", ["pending", "confirmed", "cancelled"]).defaultTo("pending");
  });
}


export async function down(knex: Knex): Promise<void> {
      await knex.schema.dropTableIfExists("bookings");
}

