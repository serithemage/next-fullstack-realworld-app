import { NextRequest } from 'next/server'
import { ApiResponse } from '@/app/api/response'
import { prisma } from '@/libs/prisma'
import { userMapper } from '@/app/api/mapper'
import { userUpdateSchema } from '@/validation/schema'
import getCurrentUser from '@/actions/getCurrentUser'
import bcrypt from 'bcrypt'

export async function PUT(req: NextRequest) {
  const currentUser = await getCurrentUser()
  if (!currentUser) {
    return ApiResponse.unauthorized()
  }

  const body = await req.json()
  const validated = userUpdateSchema.safeParse(body)
  if (!validated.success) {
    return ApiResponse.badRequest(validated.error)
  }

  let data: Record<string, string> = {}
  for (let key of ['username', 'email', 'bio', 'image']) {
    if (validated.data.user[key as keyof typeof validated.data.user]) {
      data[key] = validated.data.user[
        key as keyof typeof validated.data.user
      ] as string
    }
  }

  if (validated.data.user.password) {
    const hashPassword = await bcrypt.hash(validated.data.user.password, 10)
    data['password'] = hashPassword
  }

  try {
    const user = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data,
    })
    return ApiResponse.ok({ user: userMapper(user) })
  } catch (e) {
    return ApiResponse.badRequest('Update user fail')
  }
}
