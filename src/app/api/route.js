import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  console.log("API is called"); // เช็กว่า API ถูกเรียกไหม
  try {
    const data = await prisma.dth.findMany();
    console.log("Data fetched:", data); // ดูว่ามีข้อมูลจากฐานข้อมูลไหม
    return Response.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    return Response.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

