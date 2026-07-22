import { ProfilePage } from '@/components/shared/profile-page'

export default function MemberProfile() {
  return <ProfilePage role="member" fullName="Alisher" email="member@fitzone.uz" gymInfo="FitZone Tashkent" stats={[{label: "Daraja", value: "Usta (5)"}, {label: "Mashqlar soni", value: "48"}]} />
}
