'use client'

import { IEvent } from '@/lib/database/models/event.model'
import { SignedOut } from '@clerk/clerk-react'
import { SignedIn, useUser } from '@clerk/nextjs'
import { Button } from '../ui/button'
import Link from 'next/link'
import Checkout from './Checkout'

function CheckoutButton({ event }: { event: IEvent }) {
  const { user } = useUser()
  const userId = user?.publicMetadata.userId as string

  const hasEventFinished = new Date(event.endDateTime!) < new Date()

  return (
    <div className='flex items-center gap-3'>
      {/* Cannot buy Pas Event */}
      {hasEventFinished ? (
        <p className='p-2 text-red-500'>Sorry, Tickets are no longer available</p>
      ) : (
        <>
          <SignedOut>
            <Button asChild className='button rounded-full' size={'lg'}>
              <Link href={'/sign-in'}>
                Get Tickets
              </Link>
            </Button>
          </SignedOut>
          <SignedIn>
            <Checkout event={event} userId={userId} />
          </SignedIn>
        </>
      )}

    </div>
  )
}

export default CheckoutButton