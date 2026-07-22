import { ProfilePage } from '@/components/shared/profile-page'

export default function OwnerProfile() {
  return <ProfilePage role="owner" fullName="Aziz Rahimov" email="owner@fitzone.uz" gymInfo="FitZone Tashkent" stats={[{label: "Aktiv A'zolar", value: "412"}, {label: "Oylik Daromad", value: "$4.2K"}]} />
}
