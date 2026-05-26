interface Props { variant: 'col' | 'exp' }

export default function SitrakaAvatar(_props: Props) {
  return (
    <img
      src={`${import.meta.env.BASE_URL}avatars/sitraka.png`}
      alt="Sitraka Rasatarivony"
      className="av-img"
    />
  )
}
