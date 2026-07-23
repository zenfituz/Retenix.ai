'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    redirect(`/login?message=${encodeURIComponent(error.message)}`)
  }

  // Redirect to root, middleware handles correct role routing
  redirect('/')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const name = (formData.get('name') as string) || ''

  // Only members can self-register. Owners/Trainers are created by admins.
  const role = 'member'

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        role: role,
        full_name: name,
      },
    },
  })

  if (error) {
    redirect(`/login?message=${encodeURIComponent(error.message)}`)
  }

  redirect('/login?message=Muvaffaqiyatli ro\'yxatdan o\'tdingiz! Tizimga kiring.')
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}
