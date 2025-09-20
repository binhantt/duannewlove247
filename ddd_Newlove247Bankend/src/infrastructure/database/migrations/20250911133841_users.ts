import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("email").notNullable().unique().defaultTo("");
    table.string("password_hash");
    table.string("google_id");
    table.string("facebook_id");
    table.enum("provider", ["local", "google", "facebook", "apple"])
      .notNullable()
      .defaultTo("local");
    table.enum("gender", ["male", "female", "other"]);
    table.integer("age");
    table.string("location");
    table.text("bio");
    table.specificType("interests_tags", "json");
    table.string("avatar_url");
    table.specificType("photos", "json");
    table.enum("looking_for", ["friendship", "relationship", "marriage", "casual"]);
    table.string("occupation");
    table.string("education");
    table.boolean("is_verified").notNullable().defaultTo(false);
    table.integer("violation_count").notNullable().defaultTo(0);
    table.dateTime("chat_ban_until");
    table.boolean("is_chat_locked").notNullable().defaultTo(false);
    table.boolean("is_active").notNullable().defaultTo(true);
    table.enum("role", ["user", "admin", "moderator"])
      .notNullable()
      .defaultTo("user");
    table.enum("subscription_plan", ["free", "premium", "vip"])
      .notNullable()
      .defaultTo("free");
    table.dateTime("subscription_expires");
    table.boolean("email_verified").notNullable().defaultTo(false);
    table.string("verification_token");
    table.dateTime("verification_expires");

    // --- THÊM ACCESS TOKEN & REFRESH TOKEN ---
    table.text("access_token");      // lưu token truy cập OAuth
    table.text("refresh_token");     // lưu token refresh nếu có

    table.dateTime("last_login_at");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("users");
}
