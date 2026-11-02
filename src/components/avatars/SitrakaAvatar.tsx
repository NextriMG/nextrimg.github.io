export default function SitrakaAvatar() {
  return (
    <img
      src={`${import.meta.env.BASE_URL}avatars/sitraka.webp`}
      alt="Sitraka Rasatarivony"
      className="av-img"
      width={400}
      height={400}
      decoding="async"
    />
  )
}
