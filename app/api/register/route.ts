import { connect } from "@/lib/mysql_connect";

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, password } = await req.json();

    await connect.query(
      "INSERT INTO users (first_name , last_name , email , password , created_at) VALUES ( ? , ? , ? , ? , ?)",
      [firstName, lastName, email, password, new Date()],
    );

    return Response.json({
      message: "สมัครสมาชิกสำเร็จ",
      res: { firstName, lastName, email, password },
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
