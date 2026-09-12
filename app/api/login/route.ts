import { connect } from "@/lib/mysql_connect";

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const [results] = (await connect.query(
      "SELECT id , email , first_name , last_name FROM users WHERE email = ? AND password = ?",
      [email, password],
    )) as [User[], any];

    const user = results[0];

    if (!user) {
      return Response.json({
        message: "อีเมลหรือรหัสผ่านไม่ถูกต้อง",
        status: 401,
      });
    }

    return Response.json({
      message: "เข้าสู่ระบบสำเร็จ",
      user: {
        id: user.id,
        email: user.email,
        name: user.first_name + " " + user.last_name,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    return Response.json({
      message: "เกิดข้อผิดพลาดในการเข้าสู่ระบบ",
      status: 500,
    });
  }
}
