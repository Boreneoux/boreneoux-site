import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function GET(req: NextRequest) {
  const featured = req.nextUrl.searchParams.get("featured");
  const portfolios = await prisma.portfolio.findMany({
    where: featured === "true" ? { featured: true } : undefined,
    orderBy: { order: "asc" },
  });
  return NextResponse.json(portfolios);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const portfolio = await prisma.portfolio.create({ data: body });
  revalidatePath("/");
  revalidatePath("/work");
  return NextResponse.json(portfolio, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { id, ...data } = body;
  const portfolio = await prisma.portfolio.update({ where: { id }, data });
  revalidatePath("/");
  revalidatePath("/work");
  revalidatePath(`/work/${portfolio.slug}`);
  return NextResponse.json(portfolio);
}

export async function PATCH(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const items: { id: string; order: number }[] = await req.json();
  await Promise.all(
    items.map(({ id, order }) => prisma.portfolio.update({ where: { id }, data: { order } }))
  );
  revalidatePath("/");
  revalidatePath("/work");
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await req.json();
  const portfolio = await prisma.portfolio.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/work");
  revalidatePath(`/work/${portfolio.slug}`);
  return NextResponse.json({ ok: true });
}
