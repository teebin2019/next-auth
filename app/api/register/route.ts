import { connect } from "@/lib/mysql_connect";
import { hash } from "bcrypt-ts";

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, password } = await req.json();
    const hash_password = await hash(password, 10);

    await connect.query(
      "INSERT INTO users (first_name , last_name , email , password , created_at) VALUES ( ? , ? , ? , ? , ?)",
      [firstName, lastName, email, hash_password, new Date()],
    );

    return Response.json({
      message: "สมัครสมาชิกสำเร็จ",
    });
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
