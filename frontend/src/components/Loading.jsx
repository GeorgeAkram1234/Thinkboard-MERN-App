import { Audio } from 'react-loader-spinner'

export function Loading() {
  return (
    <Audio
      height={80}
      width={80}
      radius={9}
      color="green"
      ariaLabel="audio-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  )
}