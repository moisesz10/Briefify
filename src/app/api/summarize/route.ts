import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  // Verificar se é usuário PRO
  const subscription = await prisma.subscription.findUnique({
    where: { userId: session.user.id },
  });

  if (!subscription?.isActive) {
    return NextResponse.json({ error: 'Assinatura PRO necessária para usar a IA' }, { status: 403 });
  }

  try {
    const { text } = await req.json();

    if (!text || typeof text !== 'string') {
      return NextResponse.json({ error: 'Texto inválido' }, { status: 400 });
    }

    const prompt = `Você é um assistente especialista em resumir textos. Resuma o seguinte texto de forma clara, concisa e direta ao ponto, ideal para ser lido em voz alta (em áudio). Evite listas complexas, use um tom conversacional.\n\nTexto:\n${text}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return NextResponse.json({ summary: response.text }, { status: 200 });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: `Erro na IA: ${msg}` }, { status: 500 });
  }
}
