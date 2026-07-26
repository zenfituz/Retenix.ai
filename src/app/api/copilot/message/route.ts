import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message, role, gym_id } = await req.json();

    let aiReply = "Retenix AI Copilot xizmati faol. Zal a'zolarini saqlab qolish bo'yicha tavsiyalar:";

    const lowerMsg = (message || '').toLowerCase();

    if (lowerMsg.includes("risk") || lowerMsg.includes("xavf") || lowerMsg.includes("churn")) {
      aiReply = "FitZone zalida hozirda 9 ta a'zoda yuqori churn xavfi aniqlandi. Eng nozik a'zo: Jasur Toshmatov (85% risk score, 14 kundan beri check-in yo'q). Tavsiya: Unga 15% chegirmali va bepul trener seansi promo xabarini yuborish.";
    } else if (lowerMsg.includes("daromad") || lowerMsg.includes("mrr") || lowerMsg.includes("pul")) {
      aiReply = "Joriy oy uchun MRR daromadi $18,400. Retention darajasi 88.4%. Xavf ostidagi 9 mijoz saqlab qolinsa, oyiga $495 sof daromad saqlanadi.";
    } else if (lowerMsg.includes("trener") || lowerMsg.includes("murabbiy")) {
      aiReply = "Eng yuqori natijadorlik ko'rsatkichiga ega trener: Bekzod Muvaffaqiyatov (98/100 ball, 24 ta biriktirilgan mijoz).";
    } else {
      aiReply = `Tushundim (${role || 'Owner'} rejimi). Retenix 5-faktorli churn signal platformasi sizning so'rovingizga ko'ra zal ma'lumotlarini tahlil qilmoqda. A'zolar davomadini oshirish va churn'ni kamaytirish uchun qaysi segmentni tekshiraylik?`;
    }

    return NextResponse.json({
      success: true,
      reply: aiReply,
      tokensUsed: 142,
      costUsd: 0.002
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
