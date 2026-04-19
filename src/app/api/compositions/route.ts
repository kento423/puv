import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidateTag, revalidatePath } from "next/cache";

const VALID_LANES = ["top", "center", "bottom"];

// ルート制約: 上2 / 中央1 / 下2
const LANE_LIMITS: Record<string, number> = {
  top: 2,
  center: 1,
  bottom: 2,
};

interface SlotInput {
  pokemonId: number;
  lane: string;
}

function validateLaneCounts(slots: SlotInput[]): string | null {
  const laneCounts: Record<string, number> = { top: 0, center: 0, bottom: 0 };
  for (const slot of slots) {
    laneCounts[slot.lane] = (laneCounts[slot.lane] || 0) + 1;
  }
  for (const [lane, limit] of Object.entries(LANE_LIMITS)) {
    if (laneCounts[lane] !== limit) {
      const laneLabels: Record<string, string> = {
        top: "上ルート",
        center: "中央エリア",
        bottom: "下ルート",
      };
      return `${laneLabels[lane]}は${limit}体にしてください（現在: ${laneCounts[lane]}体）`;
    }
  }
  return null;
}

export async function POST(req: Request) {
  try {
    const { title, description, slots, guestId } = await req.json();

    // バリデーション: スロット5体必須
    if (!Array.isArray(slots) || slots.length !== 5) {
      return NextResponse.json(
        { error: "構成には5体のポケモンが必要です" },
        { status: 400 }
      );
    }

    // バリデーション: 各スロットの形式チェック
    for (const slot of slots) {
      if (!slot.pokemonId || !VALID_LANES.includes(slot.lane)) {
        return NextResponse.json(
          { error: "各スロットにポケモンとルートの指定が必要です" },
          { status: 400 }
        );
      }
    }

    // バリデーション: ポケモンの重複チェック
    const pokemonIds = slots.map((s: SlotInput) => s.pokemonId);
    if (new Set(pokemonIds).size !== pokemonIds.length) {
      return NextResponse.json(
        { error: "同じポケモンを複数選択することはできません" },
        { status: 400 }
      );
    }

    // バリデーション: ルート制約 (上2/中1/下2)
    const laneError = validateLaneCounts(slots);
    if (laneError) {
      return NextResponse.json({ error: laneError }, { status: 400 });
    }

    // guestIdチェック
    if (!guestId) {
      return NextResponse.json(
        { error: "ユーザーの識別ができません" },
        { status: 400 }
      );
    }

    const composition = await prisma.composition.create({
      data: {
        title: title || null,
        description: description || null,
        guestId,
        slots: {
          create: slots.map((slot: SlotInput, index: number) => ({
            pokemonId: slot.pokemonId,
            lane: slot.lane,
            sortOrder: index,
          })),
        },
      },
      include: {
        slots: {
          include: { pokemon: true },
          orderBy: { sortOrder: "asc" },
        },
      },
    });

    revalidatePath("/compositions");
    revalidateTag("compositions", "max" as any);

    return NextResponse.json({ success: true, composition });
  } catch (error) {
    console.error("Error creating composition:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const { compositionId, title, description, slots, guestId } =
      await req.json();

    if (!compositionId || !guestId) {
      return NextResponse.json(
        { error: "Invalid request parameters" },
        { status: 400 }
      );
    }

    const composition = await prisma.composition.findUnique({
      where: { id: compositionId },
    });

    if (!composition) {
      return NextResponse.json(
        { error: "構成が見つかりません" },
        { status: 404 }
      );
    }

    if (composition.guestId !== guestId) {
      return NextResponse.json(
        { error: "この構成を編集する権限がありません" },
        { status: 403 }
      );
    }

    // slotsが送信されている場合はバリデーション＆更新
    if (slots) {
      if (!Array.isArray(slots) || slots.length !== 5) {
        return NextResponse.json(
          { error: "構成には5体のポケモンが必要です" },
          { status: 400 }
        );
      }

      for (const slot of slots) {
        if (!slot.pokemonId || !VALID_LANES.includes(slot.lane)) {
          return NextResponse.json(
            { error: "各スロットにポケモンとルートの指定が必要です" },
            { status: 400 }
          );
        }
      }

      const pokemonIds = slots.map((s: SlotInput) => s.pokemonId);
      if (new Set(pokemonIds).size !== pokemonIds.length) {
        return NextResponse.json(
          { error: "同じポケモンを複数選択することはできません" },
          { status: 400 }
        );
      }

      const laneError = validateLaneCounts(slots);
      if (laneError) {
        return NextResponse.json({ error: laneError }, { status: 400 });
      }

      // 既存スロットを削除して再作成
      await prisma.compositionSlot.deleteMany({
        where: { compositionId },
      });

      await prisma.compositionSlot.createMany({
        data: slots.map((slot: SlotInput, index: number) => ({
          compositionId,
          pokemonId: slot.pokemonId,
          lane: slot.lane,
          sortOrder: index,
        })),
      });
    }

    // タイトル・解説の更新
    const updated = await prisma.composition.update({
      where: { id: compositionId },
      data: {
        title: title !== undefined ? title || null : undefined,
        description: description !== undefined ? description || null : undefined,
      },
      include: {
        slots: {
          include: { pokemon: true },
          orderBy: { sortOrder: "asc" },
        },
      },
    });

    revalidatePath("/compositions");
    revalidateTag("compositions", "max" as any);

    return NextResponse.json({ success: true, composition: updated });
  } catch (error) {
    console.error("Error updating composition:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { compositionId, guestId } = await req.json();

    if (!compositionId || !guestId) {
      return NextResponse.json(
        { error: "Invalid request parameters" },
        { status: 400 }
      );
    }

    const composition = await prisma.composition.findUnique({
      where: { id: compositionId },
    });

    if (!composition) {
      return NextResponse.json(
        { error: "構成が見つかりません" },
        { status: 404 }
      );
    }

    if (composition.guestId !== guestId) {
      return NextResponse.json(
        { error: "この構成を削除する権限がありません" },
        { status: 403 }
      );
    }

    await prisma.composition.delete({
      where: { id: compositionId },
    });

    revalidatePath("/compositions");
    revalidateTag("compositions", "max" as any);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting composition:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
