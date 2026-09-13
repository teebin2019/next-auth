import { connect } from "@/lib/mysql_connect";
import { compare } from "bcrypt-ts";

interface User {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const [rows] = (await connect.query(
      "SELECT first_name , last_name , email , password FROM users WHERE email = ? ",
      [email],
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

    const is_password = await compare(password, user.password);

    if (!is_password) {
      return Response.json(
        {
          message: "อีเมลหรือรหัสผ่านไม่ถูกต้อง",
        },
        { status: 401 },
      );
    }

    return Response.json({
      message: "เข้าสู่ระบบสำเร็จ",
      user: {
        email: user.email,
        name: user.first_name + " " + user.last_name,
      },
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
