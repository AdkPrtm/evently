import { useEffect } from 'react'
import { Button } from '../ui/button'
import { IEvent } from '@/lib/database/models/event.model'
import { loadStripe } from '@stripe/stripe-js';
import { checkoutOrder } from '@/lib/actions/order.action';
import { CheckoutOrderParams } from '@/types';

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

function Checkout({ event, userId }: { event: IEvent, userId: string }) {
    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        if (query.get('success')) {
            console.log('Order placed! You will receive an email confirmation.');
        }

        if (query.get('canceled')) {
            console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
        }
    }, []);

    const onCheckout = async () => {
        const order: CheckoutOrderParams = {
            eventTitle: event.title,
            eventId: event._id,
            price: event.price!,
            isFree: event.isFree!,
            buyerId: userId,
        }

        await checkoutOrder(order)
     }

    return (
        <form action={onCheckout} method='post'>
            <Button type='submit' role='link' size={'lg'} className='button sm:w-fit'>
                {event.isFree ? 'Get Tickets' : 'Buy Tickets'}
            </Button>
        </form>
    )
}

export default Checkout