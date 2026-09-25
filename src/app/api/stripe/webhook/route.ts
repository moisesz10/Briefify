import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: `Webhook Error: ${msg}` }, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === 'checkout.session.completed') {
    const subscription = await stripe.subscriptions.retrieve(session.subscription as string);

    if (!session?.metadata?.userId) {
      return NextResponse.json({ error: 'Webhook Error: No userId in metadata' }, { status: 400 });
    }

    await prisma.subscription.upsert({
      where: {
        userId: session.metadata.userId,
      },
      create: {
        userId: session.metadata.userId,
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer as string,
        stripePriceId: subscription.items.data[0].price.id,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        stripeCurrentPeriodEnd: new Date((subscription as any).current_period_end * 1000),
        isActive: true,
      },
      update: {
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer as string,
        stripePriceId: subscription.items.data[0].price.id,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        stripeCurrentPeriodEnd: new Date((subscription as any).current_period_end * 1000),
        isActive: true,
      },
    });
  }

  if (event.type === 'invoice.payment_succeeded') {
    const subscription = await stripe.subscriptions.retrieve(session.subscription as string);

    await prisma.subscription.update({
      where: {
        stripeSubscriptionId: subscription.id,
      },
      data: {
        stripePriceId: subscription.items.data[0].price.id,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        stripeCurrentPeriodEnd: new Date((subscription as any).current_period_end * 1000),
        isActive: true,
      },
    });
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
