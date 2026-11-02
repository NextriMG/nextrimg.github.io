export default function ItoAvatar() {
  return (
    <img
      src={`${import.meta.env.BASE_URL}avatars/itokiana.webp`}
      alt="Itokiana Rajohnson"
      className="av-img"
      width={400}
      height={400}
      decoding="async"
    />
  )
}
