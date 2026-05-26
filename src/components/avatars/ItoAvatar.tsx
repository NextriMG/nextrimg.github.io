interface Props { variant: 'col' | 'exp' }

export default function ItoAvatar(_props: Props) {
  return (
    <img
      src={`${import.meta.env.BASE_URL}avatars/itokiana.png`}
      alt="Itokiana Rajohnson"
      className="av-img"
    />
  )
}
