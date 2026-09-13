import { connect } from "@/lib/mysql_connect";

interface User {
  email: string;
  password: string;
}

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const [rows] = (await connect.query(
      "SELECT email FROM users WHERE email = ? AND password = ?",
      [email, password],
    )) as [User[], any];

    const user = rows[0];

    if (!user) {
      return Response.json(
        {
          message: "อีเมลหรือรหัสผ่านไม่ถูกต้อง",
        },
        { status: 401 },
      );
    }

    return Response.json({
      message: "เข้าสู่ระบบสำเร็จ",
      user,
    });
  } catch (error) {
    console.error("Error during login:", error);
    return Response.json(
      {
        message: "เกิดข้อผิดพลาดในการเข้าสู่ระบบ",
      },
      { status: 500 },
    );
  }
}
