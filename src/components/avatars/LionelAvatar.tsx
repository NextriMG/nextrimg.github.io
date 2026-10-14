interface Props { variant: 'col' | 'exp' }

export default function LionelAvatar(_props: Props) {
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
