import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("users", (table) => {
    table.increments("id").primary(); // id tự tăng
    table.string("name").notNullable();              // tên
    table.string("email").notNullable().unique();    // email
    table.string("password_hash");                   // mật khẩu (nullable nếu login Google)
    table.string("google_id");                       // id Google OAuth
    table.enum("provider", ["local", "google", "facebook", "apple"])
      .notNullable()
      .defaultTo("local");                        // loại đăng nhập
    table.enum("gender", ["male", "female", "other"]); // giới tính
    table.integer("age");                            // tuổi
    table.string("location");                        // vị trí
    table.text("bio");                               // mô tả cá nhân
    table.specificType("interests_tags", "json");    // sở thích dạng list tag
    table.string("avatar_url");                      // avatar
    table.specificType("photos", "json");            // danh sách ảnh
    table.enum("looking_for", ["friendship", "relationship", "marriage", "casual"]); // nhu cầu
    table.string("occupation");                      // nghề nghiệp
    table.string("education");                       // học vấn
    table.boolean("is_verified").notNullable().defaultTo(false); // xác minh
    table.integer("violation_count").notNullable().defaultTo(0); // số lần vi phạm
    table.dateTime("chat_ban_until");                // hết hạn cấm chat
    table.boolean("is_chat_locked").notNullable().defaultTo(false); // khóa chat
    table.boolean("is_active").notNullable().defaultTo(true); // active/deactive
    table.enum("role", ["user", "admin", "moderator"])
      .notNullable()
      .defaultTo("user");                         // phân quyền
    table.enum("subscription_plan", ["free", "premium", "vip"])
      .notNullable()
      .defaultTo("free");                         // gói dịch vụ
    table.dateTime("subscription_expires");          // hết hạn gói
    table.boolean("email_verified").notNullable().defaultTo(false); // xác minh email
    table.string("verification_token");              // token xác minh
    table.dateTime("verification_expires");          // hạn token

    table.dateTime("last_login_at");                 // lần login gần nhất
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("users");
}
