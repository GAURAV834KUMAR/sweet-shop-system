const { Client } = require("pg");

// Database connection string
const DATABASE_URL =
  process.env.DATABASE_URL ||
  "postgresql://sweet_shop_9p5l_user:LVuhkyc0prG9y9L0JVE4w7cRXGaLPR46@dpg-d4uqujogjchc73cfkkrg-a.singapore-postgres.render.com/sweet_shop_9p5l";

// Email to make admin (pass as argument or edit here)
const emailToMakeAdmin = process.argv[2];

if (!emailToMakeAdmin) {
  console.error("❌ Please provide an email address");
  console.log("Usage: node make-admin.js your-email@example.com");
  process.exit(1);
}

async function makeAdmin() {
  const client = new Client({
    connectionString: DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  try {
    console.log("🔌 Connecting to database...");
    await client.connect();
    console.log("✅ Connected!");

    // Check if user exists
    const checkResult = await client.query(
      'SELECT email, role, "firstName", "lastName" FROM users WHERE email = $1',
      [emailToMakeAdmin]
    );

    if (checkResult.rows.length === 0) {
      console.log(`❌ User with email "${emailToMakeAdmin}" not found!`);
      console.log("\n📋 All users:");
      const allUsers = await client.query("SELECT email, role FROM users");
      console.table(allUsers.rows);
      process.exit(1);
    }

    console.log("\n📋 Current user details:");
    console.table(checkResult.rows);

    // Update to admin
    console.log("\n🔄 Updating user to admin...");
    await client.query("UPDATE users SET role = 'admin' WHERE email = $1", [
      emailToMakeAdmin,
    ]);

    // Verify update
    const verifyResult = await client.query(
      'SELECT email, role, "firstName", "lastName" FROM users WHERE email = $1',
      [emailToMakeAdmin]
    );

    console.log("\n✅ User updated successfully!");
    console.table(verifyResult.rows);
  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    await client.end();
    console.log("\n👋 Disconnected from database");
  }
}

makeAdmin();
