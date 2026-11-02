export default function LionelAvatar() {
  return (
    <img
      src={`${import.meta.env.BASE_URL}avatars/lionel.webp`}
      alt="Lionel Ratovo"
      className="av-img"
      width={400}
      height={400}
      decoding="async"
    />
  )
}
