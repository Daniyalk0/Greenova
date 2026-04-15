import OrdersPage from '@/components/Orders-client'
import { prisma } from '@/lib/prisma'
import { authConfig } from '../../api/auth/[...nextauth]/auth.config'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async () => {
  const session = await getServerSession(authConfig)

  if (!session?.user?.id) {
    redirect('/login')
  }

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  })

  const normalizedOrders = orders.map((order) => ({
    id: order.id,
    date: order.createdAt.toISOString(),
    status: order.status,
    total: order.total,
    items: order.items.map((item) => ({
      id: item.id.toString(),
      name: item.product?.name ?? 'Unknown product',
      imageUrl: item.product?.imageUrl ?? '',
    })),
  }))

  return <OrdersPage orders={normalizedOrders} />
}

export default page