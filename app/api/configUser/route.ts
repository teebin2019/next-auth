import { connect } from "@/lib/mysql_connect";

interface User {
  email: string;
}

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    const [rows] = (await connect.query(
      "SELECT email FROM users WHERE email = ?",
      [email],
    )) as [User[], any];

    const user = rows[0];
    if (!user) {
      return Response.json({
        message: "Email นี้ยังไม่ถูกใช้งาน",
      });
    }
    return Response.json(
      {
        message: "Email นี้ยังถูกใช้งาน",
        status: "duplicate",
      },
      { status: 409 },
    );
  } catch (error) {
    console.error("Error during registration:", error);
    return Response.json(
      {
        message: "เกิดข้อผิดพลาดในการสมัครสมาชิก",
      },
      { status: 500 },
    );
  }
}
