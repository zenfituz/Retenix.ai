import { ProfilePage } from '@/components/shared/profile-page'

export default function SuperadminProfile() {
  return <ProfilePage role="superadmin" fullName="Admin" email="admin@retenix.ai" stats={[{label: "Platformalar", value: "412"}, {label: "Faol foydalanuvchilar", value: "24.5k"}]} />
}
