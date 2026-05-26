interface Props { variant: 'col' | 'exp' }

export default function LionelAvatar(_props: Props) {
  return (
    <img
      src={`${import.meta.env.BASE_URL}avatars/lionel.png`}
      alt="Lionel Ratovo"
      className="av-img"
    />
  )
}
