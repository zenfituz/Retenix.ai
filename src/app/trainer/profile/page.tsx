import { ProfilePage } from '@/components/shared/profile-page'

export default function TrainerProfile() {
  return <ProfilePage role="trainer" fullName="Jasur" email="trainer@fitzone.uz" gymInfo="FitZone Tashkent" stats={[{label: "Aktiv Mijozlar", value: "18"}, {label: "O'tkazilgan Mashqlar", value: "142"}]} />
}
