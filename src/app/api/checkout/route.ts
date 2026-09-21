import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { stripe } from '@/lib/stripe';
export async function POST() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const stripeSession = await stripe.checkout.sessions.create({
      success_url: `${process.env.NEXTAUTH_URL}/dashboard?success=true`,
      cancel_url: `${process.env.NEXTAUTH_URL}/dashboard?canceled=true`,
      payment_method_types: ['card'],
      mode: 'subscription',
      billing_address_collection: 'auto',
      customer_email: session.user.email ?? undefined,
      line_items: [
        {
          price: 'price_1234567890', // We will need to replace this with a real Stripe Price ID later, for now it's a placeholder
          quantity: 1,
        },
      ],
      metadata: {
        userId: session.user.id,
      },
    });

    return NextResponse.redirect(stripeSession.url as string, 303);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
