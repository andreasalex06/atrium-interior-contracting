import {
  Clock3,
  House,
  ShieldCheck,
  Sparkles,
  WalletCards,
} from "lucide-react";

export const navigation = [
  { label: "Beranda", id: "home" },
  { label: "Tentang kami", id: "about-us" },
  { label: "Layanan", id: "services" },
  { label: "Portofolio", id: "gallery" },
  { label: "Kontak", id: "contact" },
];

export const projects = [
  {
    title: "Dapur Modern",
    type: "Dapur",
    location: "Jakarta",
    photo: "photo-1600607687920-4e2a09cf159d",
  },
  {
    title: "Kamar Mandi Mewah",
    type: "Kamar Mandi",
    location: "Bandung",
    photo: "photo-1600566753086-00f18fb6b3ea",
  },
  {
    title: "Kabinet Custom",
    type: "Kabinet",
    location: "Surabaya",
    photo: "photo-1600585154340-be6161a56a0c",
  },
  {
    title: "Kamar Mandi Spa",
    type: "Kamar Mandi",
    location: "Tangerang",
    photo: "photo-1604709177225-055f99402ea3",
  },
  {
    title: "Oak & Stone",
    type: "Kabinet",
    location: "Semarang",
    photo: "photo-1600607688969-a5bfcd646154",
  },
  {
    title: "Kantor Harbour",
    type: "Komersial",
    location: "Bali",
    photo: "photo-1497366811353-6870744d04b2",
  },
];

export function photoUrl(photo: string, width = 900) {
  return `https://images.unsplash.com/${photo}?auto=format&fit=crop&w=${width}&q=85`;
}

export const services = [
  {
    title: "Renovasi Dapur",
    description: "Dapur modern untuk kehidupan sehari-hari.",
    photo: projects[0].photo,
    icon: House,
    layout: "sm:col-span-2 sm:row-span-2",
  },
  {
    title: "Renovasi Kamar Mandi",
    description: "Ruang relaksasi dengan hasil yang indah.",
    photo: projects[1].photo,
    icon: Sparkles,
    layout: "sm:col-span-2",
  },
  {
    title: "Kabinet Custom",
    description: "Lebih rapi, lebih personal.",
    photo: projects[2].photo,
    icon: House,
    layout: "",
  },
  {
    title: "Top Table & Lantai",
    description: "Material premium, tahan lama.",
    photo: projects[3].photo,
    icon: Sparkles,
    layout: "",
  },
];

export const benefits = [
  {
    title: "Berizin & terpercaya",
    description: "Ketenangan Anda adalah prioritas kami.",
    icon: ShieldCheck,
  },
  {
    title: "Pengerjaan berkualitas",
    description: "Dibuat untuk bertahan lama.",
    icon: Sparkles,
  },
  {
    title: "Selesai tepat waktu",
    description: "Kami menghargai waktu Anda.",
    icon: Clock3,
  },
  {
    title: "Pembiayaan fleksibel",
    description: "Wujudkan ruang impian Anda.",
    icon: WalletCards,
  },
];

export const statistics = [
  { value: "15+", label: "Tahun pengalaman", icon: ShieldCheck },
  { value: "500+", label: "Klien puas", icon: House },
  { value: "2K+", label: "Proyek selesai", icon: Sparkles },
];
