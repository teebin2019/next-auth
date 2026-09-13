import { connect } from "@/lib/mysql_connect";

interface User {
  id: number;
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: number }> },
) {
  try {
    const { id } = await params;
    const [rows] = (await connect.query("SELECT *  FROM users WHERE id = ?", [
      id,
    ])) as [User[], any];

    const user = rows[0];

    return Response.json({
      message: "ดึงข้อมูลผู้ใช้งานสำเร็จ",
      user: user,
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

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: number }> },
) {
  try {
    const { id } = await params;
    const { first_name, last_name } = await req.json();

    await connect.query(
      "UPDATE users SET first_name = ? , last_name = ? WHERE id = ? ",
      [first_name, last_name, id],
    );

    return Response.json({
      message: "แก้ไขข้อมูลสำเร็จ",
    });
  } catch (error) {
    console.error("Error during users:", error);
    return Response.json(
      {
        message: "เกิดข้อผิดพลาดในการแก้ไขผู้ใช้งาน",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: number }> },
) {
  try {
    const { id } = await params;

    await connect.query("DELETE  FROM users WHERE id = ?", [id]);

    return Response.json({
      message: "ลบข้อมูลสำเร็จ",
    });
  } catch (error) {
    console.error("Error during users:", error);
    return Response.json(
      {
        message: "เกิดข้อผิดพลาดในการลบข้อมูลผู้ใช้งาน",
      },
      { status: 500 },
    );
  }
}
