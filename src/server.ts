import app from "./app";
import prisma from "./config/database";

// =============================================
// Server Entry Point
// =============================================

const PORT = process.env.PORT ?? 3000;

async function bootstrap() {
  try {
    // Test database connection
    await prisma.$connect();
    console.log("✅ Database connected successfully");

    app.listen(PORT, () => {
      console.log("─────────────────────────────────────");
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📌 Environment: ${process.env.NODE_ENV ?? "development"}`);
      console.log(`🔗 Base URL   : http://localhost:${PORT}`);
      console.log(`📋 Todos API  : http://localhost:${PORT}/api/todos`);
      console.log("─────────────────────────────────────");
    });
  } catch (error) {
    console.error("❌ Failed to connect to database:", error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("\n🛑 Shutting down server...");
  await prisma.$disconnect();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("\n🛑 Shutting down server...");
  await prisma.$disconnect();
  process.exit(0);
});

bootstrap();
