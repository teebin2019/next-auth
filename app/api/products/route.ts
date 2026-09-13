import { connect } from "@/lib/mysql_connect";

export async function GET(req: Request) {
  try {
    const [rows] = await connect.query("SELECT * FROM products LIMIT 10");

    return Response.json({
      message: "ดึงข้อมูลสินค้าสำเร็จ",
      products: rows,
    });
  } catch (error) {
    console.error("Error during users:", error);
    return Response.json(
      {
        message: "เกิดข้อผิดพลาดในการดึงข้อมูลสินค้า",
      },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const { name } = await req.json();

    await connect.query(
      "INSERT INTO products (product_name , created_at) VALUES (? , ?)",
      [name, new Date()],
    );

    return Response.json({
      message: "เพิ่มข้อมูลสินค้าสำเร็จ",
    });
  } catch (error) {
    console.error("Error during users:", error);
    return Response.json(
      {
        message: "เกิดข้อผิดพลาดในการดึงข้อมูลสินค้า",
      },
      { status: 500 },
    );
  }
}
