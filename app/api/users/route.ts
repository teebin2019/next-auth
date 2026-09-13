import { connect } from "@/lib/mysql_connect";

export async function GET(req: Request) {
  try {
    const [rows] = await connect.query("SELECT * FROM users LIMIT 10");

    return Response.json({
      message: "ดึงข้อมูลผู้ใช้งานสำเร็จ",
      users: rows,
    });
  } catch (error) {
    console.error("Error during users:", error);
    return Response.json(
      {
        message: "เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้งาน",
      },
      { status: 500 },
    );
  }
}
